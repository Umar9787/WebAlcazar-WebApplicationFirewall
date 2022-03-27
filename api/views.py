import json
from django.db.models import query
from django.http.response import HttpResponse, JsonResponse
from rest_framework import generics
import rest_framework
from rest_framework.views import APIView
from .models import Account, Policies, SQLi, XSS
from .serializers import AccountSerializer, SQLiSerializer
from django.contrib.auth.models import User
from rest_framework.response import Response
from django.utils import timezone
from django.core import serializers
import os
from django.shortcuts import get_object_or_404


import pandas as pd
import numpy as np
# import tensorflow_datasets as tfds
import tensorflow as tf


def cal_keyword(eval_string, comparison_s):
    for i in range(0, len(eval_string)):
        if i+len(comparison_s) < len(eval_string):
            if eval_string[i] == comparison_s[0]:

                j = i

                for q in range(0, len(comparison_s)):
                    if eval_string[j] != comparison_s[q]:
                        break

                    j += 1

                if (j-i) == len(comparison_s):
                    return 1.0

    return 0.0


def letter_ratio(eval_s):
    count = 0.0
    for i in range(0, len(eval_s)):
        if ord(eval_s[i].lower()) > 96 and ord(eval_s[i].lower()) < 123:
            count += 1.0
    return count / len(eval_s)


def number_ratio(eval_s):
    count = 0.0
    for i in range(0, len(eval_s)):
        if ord(eval_s[i].lower()) > 47 and ord(eval_s[i].lower()) < 58:
            count += 1.0
    return count / len(eval_s)


def symbol_ratio(eval_s):
    count = 0.0
    for i in range(0, len(eval_s)):
        if ord(eval_s[i].lower()) > 32 and ord(eval_s[i].lower()) < 48:
            count += 1.0
        if ord(eval_s[i].lower()) > 37 and ord(eval_s[i].lower()) < 65:
            count += 1.0
        if ord(eval_s[i].lower()) > 90 and ord(eval_s[i].lower()) < 97:
            count += 1.0
        if ord(eval_s[i].lower()) > 122 and ord(eval_s[i].lower()) < 127:
            count += 1.0
    return count / len(eval_s)


def get_client_ip(request):
    x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
    if x_forwarded_for:
        ip = x_forwarded_for.split(',')[0]
    else:
        ip = request.META.get('REMOTE_ADDR')
    return ip


class CreateAccount(generics.CreateAPIView):
    queryset = Account.objects.all()
    serializer_class = AccountSerializer


class PostSQLi(APIView):
    """
    View to list all users in the system.

    * Requires token authentication.
    * Only admin users are able to access this view.
    """

    def post(self, request, format=None):
        user = User.objects.get(username=request.data["user"])
        object1 = Policies.objects.get(user=user)
        if object1.sqli == False:
            return Response("Sqli not active")
        # print("user is -> ", request.user)
        user = User.objects.get(username=request.data["user"])
        module_dir = os.path.dirname(__file__)  # get current directory
        file_path = os.path.join(module_dir, 'sqli.h5')
        new_model = tf.keras.models.load_model(file_path)
        evaluation_string = request.data["username"]
        payload = {}
        payload['Query'] = evaluation_string
        payload['Length'] = len(evaluation_string)
        payload['Label'] = 1
        payload['Punctuation'] = len([1 for letter in evaluation_string if letter in [
                                     '!', ",", "\'", ";", "\"", ".", "-", "?", "[", "]", ")", "("]])
        payload['Keywords'] = len([1 for keyword in ["select", "update", "insert", "create", "drop", "alter", "rename",
                                  "exec", "order", "group", "sleep", "count", "where"] if keyword.lower() in evaluation_string.lower()])

        payload = pd.DataFrame([payload])
        X = np.array(payload.drop(labels=['Label', 'Query'], axis=1)).reshape(
            len(payload), 1, 3)

        y = np.array(payload['Label'])
        BATCH_SIZE = 64
        test_payload = tf.data.Dataset.from_tensor_slices((X, y))
        test_payload = test_payload.batch(BATCH_SIZE)
        prediction_value = new_model.predict(test_payload)
        cond = False
        if prediction_value[0][0][0] >= 0.50:
            cond = True
        obj = SQLi(
            query=request.data["username"],
            sqli=cond,
            time=timezone.now(),
            ip=get_client_ip(request),
            user=user,
        )
        obj.save()

        return Response()


class GetSQLi(APIView):
    def post(self, request, format=None):
        user = User.objects.get(username=request.data["user"])
        objects = SQLi.objects.filter(user=user).only(
            'pk', 'query', 'sqli', 'time', 'ip', 'quarantine')
        return Response(serializers.serialize(
            'json', objects))


class PostXSS(APIView):
    """
    View to list all users in the system.

    * Requires token authentication.
    * Only admin users are able to access this view.
    """

    def post(self, request, format=None):
        user = User.objects.get(username=request.data["user"])
        object1 = Policies.objects.get(user=user)
        if object1.sqli == False:
            return Response("XSS not active")
        # print("user is -> ", request.user)
        user = User.objects.get(username=request.data["user"])
        module_dir = os.path.dirname(__file__)  # get current directory
        file_path = os.path.join(module_dir, 'xss.h5')
        new_model = tf.keras.models.load_model(file_path)
        evaluation_string = request.data["username"]
        payload = {}
        payload['Contains &lt'] = cal_keyword(evaluation_string, "&lt")
        payload['ScriptTag'] = cal_keyword(evaluation_string, "script")
        payload['Readable'] = 1
        payload['Contains "><'] = cal_keyword(evaluation_string, "\"><")
        payload['Contains \'><'] = cal_keyword(evaluation_string, "\'><")
        payload['Contains And'] = cal_keyword(evaluation_string, "&")
        payload['Contains Percentage'] = cal_keyword(evaluation_string, "%")
        payload['Contains Slash'] = cal_keyword(evaluation_string, "/")
        payload['Contains BackSlash'] = cal_keyword(evaluation_string, "\\")
        payload['Contains Plus'] = cal_keyword(evaluation_string, "+")
        payload['Contains Document'] = cal_keyword(
            evaluation_string, "document")
        payload['Contains Window'] = cal_keyword(evaluation_string, "window")
        payload['Contains Onload'] = cal_keyword(evaluation_string, "onload")
        payload['Contains Onerror'] = cal_keyword(evaluation_string, "onerror")
        payload['Contains DIV'] = cal_keyword(evaluation_string, "div")
        payload['Contains iframe'] = cal_keyword(evaluation_string, "iframe")
        payload['Contains img'] = cal_keyword(evaluation_string, "img")
        payload['Contains SRC'] = cal_keyword(evaluation_string, "src")
        payload['Contains Var'] = cal_keyword(evaluation_string, "var")
        payload['Contains Eval'] = cal_keyword(evaluation_string, "eval")
        payload['Contains href'] = cal_keyword(evaluation_string, "href")
        payload['Contains Cookie'] = cal_keyword(evaluation_string, "cookie")
        payload['Contains StringfromCharCode'] = cal_keyword(
            evaluation_string, "string.fromcharcode")
        payload['Contains Single Quote'] = cal_keyword(evaluation_string, "'")
        payload['Contains Question Mark'] = cal_keyword(evaluation_string, "?")
        payload['Contains Exclamation Mark'] = cal_keyword(
            evaluation_string, "!")
        payload['Contains Semicolon'] = cal_keyword(evaluation_string, ";")
        payload['Contains HTTP'] = cal_keyword(evaluation_string, "http")
        payload['Contains JS'] = cal_keyword(evaluation_string, "jsp")
        payload['Contains Hash'] = cal_keyword(evaluation_string, "#")
        payload['Contains Equal'] = cal_keyword(evaluation_string, "=")
        payload['Contains Open Bracket'] = cal_keyword(evaluation_string, "[")
        payload['Contains Close Bracket'] = cal_keyword(evaluation_string, "]")
        payload['Contains Duble Bracket'] = cal_keyword(
            evaluation_string, "[") * cal_keyword(evaluation_string, "]")
        payload['Contains Dollar'] = cal_keyword(evaluation_string, "$")
        payload['Contains Open Parenthesis'] = cal_keyword(
            evaluation_string, "(")
        payload['Contains Close Parenthesis'] = cal_keyword(
            evaluation_string, "(")
        payload['Contains Asterik'] = cal_keyword(evaluation_string, "*")
        payload['Contains Comma'] = cal_keyword(evaluation_string, ",")
        payload['Contains Hyphen'] = cal_keyword(evaluation_string, "-")
        payload['Contains Less Than'] = cal_keyword(evaluation_string, "<")
        payload['Contains Greater Than'] = cal_keyword(evaluation_string, ">")
        payload['Contains At'] = cal_keyword(evaluation_string, "@")
        payload['Contains Underscore'] = cal_keyword(evaluation_string, "_")
        payload['Contains Location'] = cal_keyword(
            evaluation_string, "location")
        payload['Contains Search'] = cal_keyword(evaluation_string, "search")
        payload['Contains &#'] = cal_keyword(evaluation_string, "&#")
        payload['Contains Colon'] = cal_keyword(evaluation_string, ":")
        payload['Contains Dots'] = cal_keyword(evaluation_string, ".")
        payload['Contains Open Brace'] = cal_keyword(evaluation_string, "{")
        payload['Contains Close Brace'] = cal_keyword(evaluation_string, "}")
        payload['Contains tilde'] = cal_keyword(evaluation_string, "~")
        payload['Contains Spase'] = cal_keyword(evaluation_string, " ")
        payload['Contains Qution'] = cal_keyword(evaluation_string, "\"")
        payload['Contains Grave'] = 0
        payload['Contains Duble Equals'] = cal_keyword(evaluation_string, "==")
        payload['Contains Duble Slash'] = cal_keyword(evaluation_string, "//")
        payload['Contains Vertical Bar'] = cal_keyword(evaluation_string, "|")
        payload['Contains Power'] = cal_keyword(evaluation_string, "^")
        payload['Contains Broken Bar'] = cal_keyword(evaluation_string, "¦")
        payload['Contains Alert'] = cal_keyword(evaluation_string, "alert")
        payload['Contains Break Line'] = cal_keyword(evaluation_string, "br")
        payload['Letters Ratio'] = format_float = "{:.2f}".format(
            letter_ratio(evaluation_string))
        payload['Numbuer Ratio'] = format_float = "{:.2f}".format(
            number_ratio(evaluation_string))
        payload['Symbols Ratio'] = format_float = "{:.2f}".format(
            symbol_ratio(evaluation_string))
        payload['Class'] = 0
        payload = pd.DataFrame([payload])
        X = np.asarray(payload.drop(labels=['Class'], axis=1)).reshape(
            len(payload), 1, 65).astype('float32')

        y = np.asarray(payload['Class']).astype('float32')
        BATCH_SIZE = 64
        test_payload = tf.data.Dataset.from_tensor_slices((X, y))
        test_payload = test_payload.batch(BATCH_SIZE)
        pred = new_model.predict(test_payload)[0][0][0]

        cond = False
        if pred >= 0.50:
            cond = True
            obj = XSS(
                query=request.data["username"],
                xss=cond,
                time=timezone.now(),
                ip=get_client_ip(request),
                user=user,
            )
            obj.save()

        return Response()


class GetXSS(APIView):
    def post(self, request, format=None):
        user = User.objects.get(username=request.data["user"])
        objects = XSS.objects.filter(user=user).only(
            'pk', 'query', 'xss', 'time', 'ip', 'quarantine')
        return Response(serializers.serialize(
            'json', objects))


class Quarantine(APIView):
    def post(self, request, format=None):
        object1 = SQLi.objects.get(pk=request.data["id"])
        object1.quarantine = not object1.quarantine
        object1.save()
        return Response("success")


class QuarantineXSS(APIView):
    def post(self, request, format=None):
        object1 = XSS.objects.get(pk=request.data["id"])
        object1.quarantine = not object1.quarantine
        object1.save()
        return Response("success")


class CreatePolicies(APIView):
    def post(self, request, format=None):
        try:
            user = User.objects.get(username=request.data["user"])
        except:
            return Response("error")
        try:
            object1 = Policies.objects.get(user=user)
        except Policies.DoesNotExist:
            object1 = Policies(
                user=user
            )
            object1.save()
        return Response("success")


class SavePolicies(APIView):
    def post(self, request, format=None):
        user = User.objects.get(username=request.data["user"])
        object1 = Policies.objects.get(user=user)
        object1.sqli = request.data["sqli"]
        object1.xss = request.data["xss"]
        object1.save()
        return Response("success")


class GetPolicies(APIView):
    def post(self, request, format=None):
        user = User.objects.get(username=request.data["user"])
        object1 = Policies.objects.filter(user=user)
        if object1 == None:
            return ("No Record exists")
        return Response(serializers.serialize(
            'json', object1))

# {"query":"123"}
# {"user":"admin"}
# {
# "user":"admin",
# "sql":"true",
# "xml":"true",
# "xss":"true",
# }
