from django.urls import path
from .views import BlackListIP, CreateAccount, GetBlackListIP, CreatePolicies, GetPolicies, GetXSS, PostSQLi, GetSQLi, PostXSS, Quarantine, QuarantineXSS, RemoveBlackListIP, SavePolicies
urlpatterns = [
    path('register/', CreateAccount.as_view()),
    path('sqli/', PostSQLi.as_view()),
    path('getsqli/', GetSQLi.as_view()),
    path('xss/', PostXSS.as_view()),
    path('getxss/', GetXSS.as_view()),
    path('quarantine/', Quarantine.as_view()),
    path('quarantinexss/', QuarantineXSS.as_view()),
    path('getpolicies/', GetPolicies.as_view()),
    path('createpolicies/', CreatePolicies.as_view()),
    path('updatepolicies/', SavePolicies.as_view()),
    path('blacklistip/', BlackListIP.as_view()),
    path('getblacklistip/', GetBlackListIP.as_view()),
    path('removeblacklistip/', RemoveBlackListIP.as_view())
]
