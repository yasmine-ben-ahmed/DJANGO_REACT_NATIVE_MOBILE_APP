# Generated by Django 4.2.14 on 2024-07-29 17:32

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('myApp', '0009_alter_client_user'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='client',
            name='password',
        ),
        migrations.RemoveField(
            model_name='client',
            name='user',
        ),
    ]
