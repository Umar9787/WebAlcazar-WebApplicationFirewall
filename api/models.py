from django.db import models
# from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.contrib.auth.models import User


class Account(models.Model):
    name = models.CharField(max_length=30)
    password = models.CharField(max_length=30)
    email = models.EmailField(max_length=254)
    account_type = models.CharField(max_length=10)
    certificate = models.CharField(max_length=500)
    website = models.CharField(max_length=50)


class SQLi(models.Model):
    query = models.CharField(max_length=30)
    sqli = models.BooleanField()
    time = models.DateTimeField(auto_created=True)
    ip = models.CharField(max_length=50)
    quarantine = models.BooleanField(default=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE, default=1)


class XSS(models.Model):
    query = models.CharField(max_length=300)
    xss = models.BooleanField()
    time = models.DateTimeField(auto_created=True)
    ip = models.CharField(max_length=50)
    quarantine = models.BooleanField(default=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE, default=1)


class Policies(models.Model):
    sqli = models.BooleanField(default=False)
    xss = models.BooleanField(default=False)
    xml = models.BooleanField(default=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE, default=1)
