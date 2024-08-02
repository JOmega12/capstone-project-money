from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from .models import UserBudgetCategoryJunction
from .serializers import UserBudgetCategoryJunctionSerializer
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
# Create your views here.


class UserBudgetCategoriesJunctionList(APIView):
    permission_classes = []
    
    def get(self, request):
        userBudgetCatJunction = UserBudgetCategoryJunction.objects.filter(userId = request.user)
        serializer = UserBudgetCategoryJunctionSerializer(userBudgetCatJunction, many=True)
        return Response(serializer.data)
    
    def post(self, request):
        serializer = UserBudgetCategoryJunctionSerializer(data= request.data)
        
        if serializer.is_valid():
            serializer.save(userId= request.user)
            return Response(serializer.data, status = status.HTTP_201_CREATED)
        return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)
        

class UserBudgetCategoriesJunctionDetail(APIView):
    permission_classes = [IsAuthenticated]
    
    def get_object(self, pk):
        pass
    
    def get(self, request, pk):
        pass
    
    def put(self, request, pk):
        pass
    
    def delete(self, request, pk):
        pass