# Generated by Django 4.2.14 on 2024-07-28 11:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myApp', '0004_rename_e_mail_client_email_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='client',
            name='password',
            field=models.CharField(max_length=100, null=True),
        ),
        migrations.AddField(
            model_name='supervisor',
            name='password',
            field=models.CharField(max_length=100, null=True),
        ),
    ]
