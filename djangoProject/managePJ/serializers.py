from rest_framework import serializers
from .models import myProject, parcelle, node, Data

class myProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = myProject
        fields = '__all__'


class ParcelleSerializer(serializers.ModelSerializer):
    class Meta:
        model = parcelle
        fields = ['id', 'namep', 'poly', 'project']

    def to_representation(self, instance):
        """Customize the representation of the parcelle model"""
        representation = super().to_representation(instance)
        representation['project'] = instance.project.nomp if instance.project else None
        return representation


class NodeSerializer(serializers.ModelSerializer):
    class Meta:
        model = node
        fields = ['Idnode', 'nom', 'position', 'latitude', 'longitude', 'reference',
                  'node_range', 'Sensors', 'RSSI', 'Battery_value', 'status', 'FWI', 
                  'polyg', 'parc']

    def to_representation(self, instance):
        """Customize the representation of the node model"""
        representation = super().to_representation(instance)
        representation['parcelle'] = instance.parc.namep if instance.parc else None
        representation['project'] = instance.polyg.nomp if instance.polyg else None
        return representation


class DataSerializer(serializers.ModelSerializer):
    class Meta:
        model = Data
        fields = ['IdData', 'temperature', 'humidity', 'wind', 'rain', 'node', 'Data_date']

    def to_representation(self, instance):
        """Customize the representation of the Data model"""
        representation = super().to_representation(instance)
        representation['node'] = instance.node.nom if instance.node else None
        return representation
