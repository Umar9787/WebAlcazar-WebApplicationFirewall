from django.urls import path
from .views import CreateAccount, CreatePolicies, GetPolicies, PostSQLi, GetSQLi, Quarantine, SavePolicies
urlpatterns = [
    path('register/', CreateAccount.as_view()),
    path('sqli/', PostSQLi.as_view()),
    path('getsqli/', GetSQLi.as_view()),
    path('quarantine/', Quarantine.as_view()),
    path('getpolicies/', GetPolicies.as_view()),
    path('createpolicies/', CreatePolicies.as_view()),
    path('updatepolicies/', SavePolicies.as_view())
]
