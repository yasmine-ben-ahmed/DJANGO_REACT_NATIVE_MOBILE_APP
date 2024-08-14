from django.urls import path
from .views import   UserLoginView, reset_password, verify_code_and_reset_password, EmailAlertView
from rest_framework_jwt.views import refresh_jwt_token, verify_jwt_token
from userAPI.views import UserView


urlpatterns = [
    path('users/', UserView.as_view()),
    path('reset_password/', reset_password, name='reset_password'),
    path('verify_code_and_reset_password/', verify_code_and_reset_password, name='verify_code_and_reset_password'),
    path('client/', UserLoginView.as_view()),
    path('send-email-alert/', EmailAlertView.as_view(), name='send-email-alert'),
]


