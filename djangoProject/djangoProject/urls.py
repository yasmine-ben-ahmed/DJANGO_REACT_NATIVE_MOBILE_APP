from django.contrib import admin
from django.urls import include, path
from rest_framework import routers
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from myApp import views
from myApp.views import SupervisorViewSet, ClientViewSet 

# Define the router and register the viewsets
router = routers.DefaultRouter()
router.register(r'users', views.UserViewSet, basename='user')
router.register(r'groups', views.GroupViewSet)

# Define the URL patterns
urlpatterns = [
    path('admin/', admin.site.urls),  # Admin site URL

    path('api/v1.0/user/', include('userAPI.urls')),
    path('api/v1.0/app/', include('appSettings.urls')),
    path('', include(router.urls)),  # Redirect root to API endpoints
    path('_', include('myApp.urls')),
    path('project/',include("managePJ.urls")),
]
