from django.contrib import admin
from .models import Category, Resource

# Register your models here.
admin.site.register(Category)
admin.site.register(Resource)