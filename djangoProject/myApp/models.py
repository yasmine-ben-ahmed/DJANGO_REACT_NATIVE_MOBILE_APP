from django.contrib.auth.models import User
from django.db import models

class supervisor(models.Model):
    firstName = models.CharField(max_length=100, null=True, blank=True)
    lastName = models.CharField(max_length=100, null=True, blank=True)
    phone = models.CharField(max_length=100, null=True)
    pseudo = models.CharField(max_length=100, null=True)
    email = models.EmailField(max_length=100, null=True)
    password = models.CharField(max_length=100, null=True)
    image = models.FileField(null=True)

    user = models.OneToOneField(User, on_delete=models.CASCADE, null=True,blank=True)

    def __str__(self):
        return f"{self.firstName} {self.lastName}"
    
    def save(self, *args, **kwargs):
        if not self.user:
            self.user = User.objects.create_user(self.pseudo, self.email, self.password)
        
        super().save(*args, **kwargs)


class client(models.Model):
    firstName = models.CharField(max_length=100, null=True, blank=True)
    lastName = models.CharField(max_length=100, null=True, blank=True)
    phone = models.CharField(max_length=100, null=True)
    pseudo = models.CharField(max_length=100, null=True)
    email = models.EmailField(max_length=100, null=True)
    password = models.CharField(max_length=100, null=True)
    image = models.FileField(null=True)

    supervisor = models.ForeignKey(supervisor, on_delete=models.CASCADE, null=True, related_name='clients')

    #user = models.OneToOneField(User, on_delete=models.CASCADE, null=True,blank=True)

    def __str__(self):
        return f"{self.firstName} {self.lastName}"
    
"""     def save(self, *args, **kwargs):
        if not self.user:
            self.user = User.objects.create_user(self.firstName, self.email, self.password)
        
        super().save(*args, **kwargs)
 """