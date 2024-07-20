# views.py
from django.contrib.auth.models import User, Group
from rest_framework import viewsets
from rest_framework import permissions
from .serializers import UserSerializerapp, GroupSerializerapp, SupervisorSerializer, ClientSerializer
from .models import Supervisor, Client

from rest_framework.views import APIView
from rest_framework.response import Response

#from rest_framework.views import APIView
#from rest_framework.response import Response

class TestView(APIView):
    def get(self, request, format=None):
        print("API Was Called from myapp")
        return Response("You Made It from myapp", status=200)

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializerapp
    permission_classes = [permissions.IsAuthenticated]

class GroupViewSet(viewsets.ModelViewSet):
    queryset = Group.objects.all()
    serializer_class = GroupSerializerapp
    permission_classes = [permissions.IsAuthenticated]

class SupervisorViewSet(viewsets.ModelViewSet):
    queryset = Supervisor.objects.all()
    serializer_class = SupervisorSerializer
    permission_classes = [permissions.IsAuthenticated]

class ClientViewSet(viewsets.ModelViewSet):
    queryset = Client.objects.all()
    serializer_class = ClientSerializer
    permission_classes = [permissions.IsAuthenticated]
