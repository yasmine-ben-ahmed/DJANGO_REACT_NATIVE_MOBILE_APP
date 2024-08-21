from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth.models import User
from .serializers import UserSerializer 
from managePJ.serializers import myProjectSerializer, ParcelleSerializer, NodeSerializer, DataSerializer

from myApp.serializers import ClientSerializer, SupervisorSerializer 
from myApp.models import client 
from managePJ.models import  myProject, parcelle, node, Data 
from rest_framework import status
from django.contrib.auth.hashers import check_password

from django.core.mail import send_mail
from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from django.views.decorators.csrf import csrf_exempt
import json
import random

from django.core.mail import send_mail
from django.template.loader import render_to_string
from django.utils.html import strip_tags

from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from django.views.decorators.csrf import csrf_exempt
import json

class TestView(APIView):
    def get(self, request, format=None):
        print("API Was Called")
        return Response("You Made It", status=200)

class ClientView(APIView):
    def get(self, request, format=None):
        # Retrieve all Client objects
        clients = client.objects.all()
        client_serializer = ClientSerializer(clients, many=True)
        return Response(client_serializer.data, status=status.HTTP_200_OK)
    
    def post(self, request, format=None):
        print("Login Class")
        print(request.data)

        email = request.data.get('username')
        password = request.data.get('password')

        print(email, password)

        client_obj = client.objects.filter(email=email).first()

        if client_obj is not None:
            # Check if the password is correct
            if check_password(password, client_obj.password):
                client_serializer = ClientSerializer(client_obj)
                return Response(client_serializer.data, status=status.HTTP_200_OK)
        
        return Response({"error": "Invalid Credentials"}, status=status.HTTP_403_FORBIDDEN)

    
class UserView(APIView):
    def get(self, request, format=None):
        users = User.objects.all()
        user_serializer = UserSerializer(users, many=True)
        return Response(user_serializer.data, status=status.HTTP_200_OK)
    

    def post(self, request, format=None):
        print("Creating new client!")

        client_serializer = ClientSerializer(data=request.data)
        print(request.data)
        if client_serializer.is_valid():
            client_serializer.save()
            return Response(client_serializer.data, status=status.HTTP_201_CREATED)
        return Response(client_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    


class UserLoginView(APIView):
    def get(self, request, format=None):
        if not request.user.is_authenticated or not request.user.is_active:
            return Response("Invalid Credentials", status=status.HTTP_403_FORBIDDEN)

        user = ClientSerializer(request.user)
        return Response(user.data, status=status.HTTP_200_OK)

    def post(self, request, format=None):
        print("Login Class")

        email = request.data.get('username')
        password = request.data.get('password')

        if not email or not password:
            return Response({"error": "Username and password are required"}, status=status.HTTP_400_BAD_REQUEST)
        
        # Fetch the client by email
        client_obj = client.objects.filter(email=email).first()
        client_proj = myProject.objects.filter(clientp=client_obj)
        supervisor_obj = client_obj.supervisor if client_obj.supervisor else None

        # Fetch parcelle, node, and data related to the client
        parcelles = parcelle.objects.filter(project__in=client_proj)
        nodes = node.objects.filter(parc__in=parcelles)
        data_entries = Data.objects.filter(node__in=nodes)


        # Serialize the client data
        client_serializer = ClientSerializer(client_obj)
        project_serializer = myProjectSerializer(client_proj, many=True)
        supervisor_serializer = SupervisorSerializer(supervisor_obj) if supervisor_obj else None

        # Serialize parcelle, node, and data
        parcelle_serializer = ParcelleSerializer(parcelles, many=True)
        node_serializer = NodeSerializer(nodes, many=True)
        data_serializer = DataSerializer(data_entries, many=True)

        #print("***client_serializer.data",client_serializer.data)


        # Combine the client data and projects data into a single response
        response_data = {
            'client': client_serializer.data,
            'projects': project_serializer.data,
            'supervisor': supervisor_serializer.data if supervisor_serializer else None,
            'parcelles': parcelle_serializer.data,
            'nodes': node_serializer.data,
            'data_entries': data_serializer.data,
        }

        return Response(response_data, status=status.HTTP_200_OK)
    
#-----------------------------#
class EmailAlertView(APIView):
    def post(self, request, format=None):
        client_id = request.data.get('client_id')
        if not client_id:
            return Response({"error": "Client ID is required"}, status=status.HTTP_400_BAD_REQUEST)
        
        # Fetch the client and related data
        client_obj = client.objects.get(id=client_id)
        client_proj = myProject.objects.filter(clientp=client_obj)
        supervisor_obj = client_obj.supervisor if client_obj.supervisor else None
        nodes = node.objects.filter(parc__project__in=client_proj)

        # Check each project and node for 'EXTREME' status and send an email alert
        for project in client_proj:
            for node_item in nodes:
                if node_item.status == 'EXTREME':
                    subject = 'Alert'
                    context = {
                        'client_name': client_obj.firstName,
                        'client_id': client_obj.id,
                        'node_status': node_item.status,
                        'node_name': node_item.nom,
                        'project_name': project.nomp,
                        'supervisor': supervisor_obj.firstName if supervisor_obj else 'N/A',
                        'sup_phone': supervisor_obj.phone if supervisor_obj else 'N/A',
                    }
                    html_message = render_to_string('alert_email_template.html', context)
                    plain_message = strip_tags(html_message)

                    # Send the email
                    send_mail(
                        subject,
                        plain_message,
                        'benahmedyasmin@gmail.com',  # Sender email address
                        [client_obj.email],  # Recipient email address
                        html_message=html_message
                    )

        return Response({"message": "Email alert sent if necessary."}, status=status.HTTP_200_OK)


@csrf_exempt
@api_view(['POST'])
@permission_classes([AllowAny])
def reset_password(request):
    try:
        data = json.loads(request.body)
        email = data.get('email')
        
        if not email:
            return JsonResponse({"error": "Email is required"}, status=400)
        
        # Generate a 4-digit code
        code = f"{random.randint(1000, 9999)}"
        print(code)
                
        subject = 'Password Reset Request'
        html_message = render_to_string('password_reset_react.html', {'code': code})
        plain_message = strip_tags(html_message)  # Fallback to plain text email
        send_mail(subject, plain_message, 'benahmedyasmin@gmail.com', [email], html_message=html_message)
                
        request.session['reset_code'] = code
        
        return JsonResponse({"message": "Password reset code sent"}, status=200)
    
    except json.JSONDecodeError:
        return JsonResponse({"error": "Invalid JSON"}, status=400)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)
    


@csrf_exempt
@api_view(['POST'])
@permission_classes([AllowAny])
def verify_code_and_reset_password(request):
    try:
        data = json.loads(request.body)
        email = data.get('email')
        code = data.get('code')
        new_password = data.get('new_password')
        
        # Debugging logs
        print(f"Received email: {email}")
        print(f"Received code: {code}")
        print(f"Received new_password: {new_password}")

        if not email or not code or not new_password:
            print("Missing required fields")
            return JsonResponse({"error": "Email, code, and new password are required"}, status=400)
        
        # Verify the code
        session_code = request.session.get('reset_code')
        print(f"Session code: {session_code}")
        
        if code != session_code:
            print("Invalid code")
            return JsonResponse({"error": "Invalid code"}, status=400)
        
        # Get the user and update the password
        try:
            user = client.objects.get(email=email)
            #user.password = make_password(new_password)   hashed password secure
            user.password = new_password
            user.save()
            
            print("Password updated successfully")
            return JsonResponse({"message": "Password updated successfully"}, status=200)
        except User.DoesNotExist:
            print("User not found")
            return JsonResponse({"error": "User not found"}, status=404)
        
    except json.JSONDecodeError:
        print("Invalid JSON received")
        return JsonResponse({"error": "Invalid JSON"}, status=400)
    except Exception as e:
        print(f"Exception occurred: {str(e)}")
        return JsonResponse({"error": str(e)}, status=500)
    

@api_view(['POST'])
def update_profile(request, pk):
    try:
        data = json.loads(request.body)
        email = data.get('email')
        firstName = data.get('firstName')
        lastName = data.get('lastName')
        phone = data.get('phone')
        pseudo = data.get('pseudo')
        
        # Debugging logs
        """ print(f"Received email: {email}")
        print(f"Received firstname: {firstName}") """
        
        # Get the user and update the password
        try:
            user = client.objects.get(pk=pk)
            user.email = email
            user.firstName = firstName  
            user.lastName = lastName
            user.phone = phone
            user.pseudo = pseudo
            user.save()
            
            print("Data updated successfully")
            return JsonResponse({"message": "Data updated successfully"}, status=200)
        except User.DoesNotExist:
            print("User not found")
            return JsonResponse({"error": "User not found"}, status=404)
        
    except json.JSONDecodeError:
        print("Invalid JSON received")
        return JsonResponse({"error": "Invalid JSON"}, status=400)
    except Exception as e:
        print(f"Exception occurred: {str(e)}")
        return JsonResponse({"error": str(e)}, status=500)
    

    





