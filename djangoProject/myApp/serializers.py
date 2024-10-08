from rest_framework import serializers
from .models import supervisor, client
from userAPI.serializers import UserSerializer
from django.contrib.auth.models import User

class SupervisorSerializer(serializers.ModelSerializer):
    class Meta:
        model = supervisor
        fields = ['id', 'firstName', 'lastName', 'phone', 'pseudo', 'email', 'image', 'user']

class ClientSerializer(serializers.ModelSerializer):
    #user = UserSerializer()

    class Meta:
        model = client
        fields = ['id', 'firstName', 'lastName', 'phone', 'pseudo', 'email','image','password', 'supervisor']
