import json
from django.db.models import query
from django.http.response import HttpResponse, JsonResponse
from rest_framework import generics
import rest_framework
from rest_framework.views import APIView
from .models import Account, Policies, SQLi
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


class Quarantine(APIView):
    def post(self, request, format=None):
        object1 = SQLi.objects.get(pk=request.data["id"])
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
