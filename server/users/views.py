from .models import User
from .serializers import UserSerializer
from rest_framework import viewsets
from django.shortcuts import get_object_or_404
from rest_framework.views import Response

class UserViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer