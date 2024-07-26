from django.urls import path

from .views import TestView, UserLoginView
from rest_framework_jwt.views import refresh_jwt_token, verify_jwt_token
from userAPI.views import UserView


urlpatterns = [
    path('test', TestView.as_view()),
    path('create-user/', UserView.as_view()),
    path('get-user', UserLoginView.as_view()),
    path('login-user/', UserLoginView.as_view()),
]

