from rest_framework import fields, serializers
from .models import Account, SQLi


class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = '__all__'


class SQLiSerializer(serializers.ModelSerializer):
    class Meta:
        model = SQLi
        fields = '__all__'
