# Import the Group and User models from Django's built-in authentication system
from django.contrib.auth.models import Group, User
from .models import Supervisor, Client
# Import the serializers module from Django REST framework
from rest_framework import serializers

# Define a serializer for the User model
class UserSerializerapp(serializers.HyperlinkedModelSerializer):
    # Meta class to specify the model and fields to be included in the serialized output
    class Meta:
        # Specify that this serializer is for the User model
        model = User
        # List the fields to be included in the serialized representation
        fields = ['url', 'username', 'email', 'groups']

# Define a serializer for the Group model
class GroupSerializerapp(serializers.HyperlinkedModelSerializer):
    # Meta class to specify the model and fields to be included in the serialized output
    class Meta:
        # Specify that this serializer is for the Group model
        model = Group
        # List the fields to be included in the serialized representation
        fields = ['url', 'name']

class SupervisorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Supervisor
        fields = ['id', 'nom', 'prenom', 'NB_GSM', 'pseudo', 'e_mail', 'password', 'image', 'user']

class ClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Client
        fields = ['id', 'nom', 'prenom', 'NB_GSM', 'pseudo', 'e_mail', 'image', 'supervisor']
