from django import forms
from django.contrib.auth.models import User
from django.contrib.gis.geos import Point
from .models import *
from itertools import chain
from django.contrib.gis import forms as geoforms

from django.core.mail import send_mail
from django.template.loader import render_to_string
from django.utils.html import strip_tags


class Form_project(forms.Form):

    nomp = forms.CharField(required=True,max_length=myProject._meta.get_field(
        'nomp').max_length, widget=forms.TextInput(attrs={'id': "nomp", 'name': "nomp", 'class': "form-control  p-8 mb-4 rounded", 'style': "font-size: 15px; background-color: #e6e5e5;", 'placeholder': 'Project Name'}))
    descp = forms.CharField( required=False, max_length=myProject._meta.get_field(
        'descp').max_length, widget=forms.Textarea(attrs={'id': "descp", 'name': "descp", 'class': "form-control  p-8 mb-4 rounded", 'style': "font-size: 15px; background-color: #e6e5e5; height:70px; width:550px; ", 'placeholder': 'Write description about the project'}))
    
    cityp = forms.CharField(required=True, max_length=myProject._meta.get_field(
        'cityp').max_length, widget=forms.TextInput(attrs={'id': "cityp", 'name': "cityp", 'class': "form-control  p-8 mb-4 rounded", 'style': "font-size: 15px; background-color: #e6e5e5;", 'placeholder': 'Region Name'}))
 
    clientp = forms.ModelChoiceField(queryset=client.objects.all(),required=False,empty_label='None', widget=forms.Select(attrs={'id': "clientp", 'name': "clientp", 'class': "form-control  p-8 mb-4 rounded", 'style': "font-size: 15px; background-color: #e6e5e5; width:170px;", 'placeholder': 'Select Client'}))
    
    piece_joinde = forms.FileField(required=False, widget=forms.ClearableFileInput(attrs={'id': "piece_joinde", 'name': "piece_joinde", 'class': "form-control-file", 'style': "font-size: 15px;"}))
    
    def is_valid(self):
            nomp = self.data['nomp']
            if any(char.isdigit() for char in nomp):
                self.add_error("nomp", "Nom projet est incorrect!")

            

            cityp = self.data['cityp']
            if any(char.isdigit() for char in cityp):
                self.add_error("city", "city est incorrect!")

            value = super(Form_project, self).is_valid()
            return value

 

    def enregistrerProj(self):
        nomp = self.cleaned_data['nomp']
        descp = self.cleaned_data['descp']
        cityp = self.cleaned_data['cityp']
        clientp = self.cleaned_data['clientp']
        


class Form_client(forms.Form):
    lastName = forms.CharField(
        required=True, 
        max_length=client._meta.get_field('lastName').max_length, 
        widget=forms.TextInput(attrs={
            'id': "lastName", 
            'name': "lastName", 
            'class': "form-control p-8 mb-4 rounded", 
            'style': "font-size: 15px; background-color:#e6e5e5;", 
            'placeholder': 'Last Name'
        })
    )

    firstName = forms.CharField(
        required=True, 
        max_length=client._meta.get_field('firstName').max_length, 
        widget=forms.TextInput(attrs={
            'id': 'firstName', 
            'name': 'firstName', 
            'placeholder': 'First Name', 
            'class': "form-control  p-8 mb-4 rounded", 
            'style': "font-size: 15px; background-color: #e6e5e5;"
        })
    )

    phone = forms.CharField(
        required=True, 
        max_length=client._meta.get_field('phone').max_length, 
        widget=forms.TextInput(attrs={
            'id': 'phone', 
            'name': 'phone', 
            'placeholder': 'Phone', 
            'class': "form-control p-8 mb-4 rounded", 
            'style': "font-size: 15px; background-color: #e6e5e5;"
        })
    )

    pseudo = forms.CharField(
        required=True, 
        max_length=client._meta.get_field('pseudo').max_length, 
        widget=forms.TextInput(attrs={
            'id': 'pseudo', 
            'name': 'pseudo', 
            'placeholder': 'Pseudo', 
            'class': "form-control p-8 mb-4 rounded", 
            'style': "font-size: 15px; background-color: #e6e5e5;"
        })
    )

    email = forms.EmailField(
        max_length=client._meta.get_field('email').max_length, 
        required=True, 
        widget=forms.EmailInput(attrs={
            'id': 'email', 
            'name': 'email', 
            'placeholder': 'Mail', 
            'class': "form-control p-8 mb-4 rounded", 
            'style': "font-size: 15px; background-color: #e6e5e5;"
        })
    )

    password = forms.CharField(
        required=True, 
        widget=forms.PasswordInput(attrs={
            'id': 'password', 
            'name': 'password', 
            'placeholder': 'Password', 
            'class': "form-control p-8 mb-4 rounded", 
            'style': "font-size: 15px; background-color: #e6e5e5;"
        })
    )

    confirm_password = forms.CharField(
        required=True, 
        widget=forms.PasswordInput(attrs={
            'id': 'confirm_password', 
            'name': 'confirm_password', 
            'placeholder': 'Re-enter password', 
            'class': "form-control p-8 mb-4 rounded", 
            'style': "font-size: 15px; background-color: #e6e5e5;"
        })
    )

    image = forms.FileField(
        required=False, 
        widget=forms.ClearableFileInput(attrs={
            'id': "image", 
            'name': "image", 
            'class': "form-control-file", 
            'style': "font-size: 15px;"
        })
    )

    def is_valid(self):
        lastName = self.data['lastName']
        if any(char.isdigit() for char in lastName):
            self.add_error("lastName", "Last name is incorrect!")
        
        firstName = self.data['firstName']
        if any(char.isdigit() for char in firstName):
            self.add_error("firstName", "First name is incorrect!")
        
        pseudo = self.data['pseudo']
        if client.objects.filter(pseudo=pseudo).exists():
            self.add_error("pseudo", "Pseudo already exists!")
        
        email = self.data['email']
        if client.objects.filter(email=email).exists():
            self.add_error("email", "Email already exists!")
        
        phone = self.data['phone']
        if not phone.isdigit():
            self.add_error("phone", "Phone number is incorrect!")
        
        password = self.data['password']
        if len(password) < 8:
            self.add_error("password", "Password must be at least 8 characters long.")
        
        confirm_password = self.data['confirm_password']
        if confirm_password != password:
            self.add_error("confirm_password", "Passwords do not match.")
        
        value = super(Form_client, self).is_valid()
        return value

    def enregistrer(self, idd, pseud):
        lastName = self.cleaned_data['lastName']
        firstName = self.cleaned_data['firstName']
        email = self.cleaned_data['email']
        pseudo = self.cleaned_data['pseudo']
        img = self.cleaned_data['image']
        phone = self.cleaned_data['phone']
        confirm_password = self.cleaned_data['confirm_password']
        superviseur = supervisor.objects.get(pseudo=pseud)
        
        new_client = client(
            lastName=lastName, 
            firstName=firstName, 
            pseudo=pseudo, 
            image=img,
            phone=phone, 
            email=email,
            supervisor=superviseur,
            password= confirm_password
        )
        
        new_client.save()
        
        my_project = myProject.objects.get(polygon_id=idd)
        my_project.clientp = new_client
        my_project.save()
        
        user = User.objects.create_user(pseudo, email, confirm_password)
        user.save()
        
        self.new_client = new_client

        subject = 'Client data!'
        context = {
            'client_name': lastName,
            'lastName': lastName,
            'firstName': firstName,
            'email': email,
            'phone': phone,
            'password': confirm_password,
            'supervisor': superviseur,
            'p_id': my_project.polygon_id,
            'supervisor_phone': superviseur.phone,
        }
        html_message = render_to_string('email_template.html', context)
        plain_message = strip_tags(html_message)
        
        send_mail(subject, plain_message, 'benahmedyasmin@gmail.com', [email], html_message=html_message)
