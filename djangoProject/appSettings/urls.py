from django.urls import path

from .views import SettingsView

# localhost:8000/api/v1.0/user/Settings

from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('settings', SettingsView.as_view()),
    path('create-new-setting/', SettingsView.as_view()),
]
