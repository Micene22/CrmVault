from rest_framework import serializers
from .models import Category, Resource

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class ResourceSerializer(serializers.ModelSerializer):
    # Questo serve per vedere il nome della categoria invece del solo ID
    category_name = serializers.ReadOnlyField(source='category.name')

    class Meta:
        model = Resource
        fields = ['id', 'title', 'url', 'description', 'created_at', 'category', 'category_name']