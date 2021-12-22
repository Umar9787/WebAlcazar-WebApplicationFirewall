from django.contrib import admin

from api.models import Account, Policies, SQLi

# Register your models here.
admin.site.register(Account)
admin.site.register(SQLi)
admin.site.register(Policies)
