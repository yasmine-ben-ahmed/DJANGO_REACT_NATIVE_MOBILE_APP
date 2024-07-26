from django.contrib.auth.models import User
from django.db import models

class supervisor(models.Model):
    nom = models.CharField(max_length=100, null=True)
    prenom = models.CharField(max_length=100, null=True)
    NB_GSM = models.CharField(max_length=100, null=True)
    pseudo = models.CharField(max_length=100, null=True)
    e_mail = models.EmailField(max_length=100, null=True)
    password = models.CharField(max_length=100, null=True)
    image = models.FileField(null=True)
    
    user = models.OneToOneField(User, on_delete=models.CASCADE, null=True, blank=True)

    def __str__(self):
        return f"{self.prenom} {self.nom}"

class client(models.Model):
    nom = models.CharField(max_length=100, null=True, blank=True)
    prenom = models.CharField(max_length=100, null=True, blank=True)
    NB_GSM = models.CharField(max_length=100, null=True)
    pseudo = models.CharField(max_length=100, null=True)
    e_mail = models.EmailField(max_length=100, null=True)
    image = models.FileField(null=True)

    supervisor = models.ForeignKey(supervisor, on_delete=models.CASCADE, null=True, related_name='clients')

    def __str__(self):
        return f"{self.prenom} {self.nom}"
