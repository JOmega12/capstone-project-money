from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Budget_categories
from .serializers import Budget_categoriesSerializers
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404

# Create your views here.

class Budget_categories_List(APIView):
    pass

class Budget_categories_Detail(APIView):
    pass