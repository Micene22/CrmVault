from django.urls import path
from .views import ResourceList

urlpatterns = [
    path('resources/', ResourceList.as_view(), name='resource-list'),
]