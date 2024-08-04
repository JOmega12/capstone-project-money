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
    permission_classes = [IsAuthenticated]
    
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
        userBudgetCategoriesJunction = get_object_or_404(UserBudgetCategoryJunction, pk = pk, userId= self.request.user)
        self.check_object_permissions(self.request, userBudgetCategoriesJunction)
        return userBudgetCategoriesJunction
    
    def get(self, request, pk):
        userBudgetCategoriesJunction = self.get_object(pk)
        serializer = UserBudgetCategoryJunctionSerializer(userBudgetCategoriesJunction)
        return Response(serializer.data)
    
    def put(self, request, pk):
        userBudgetCategoryJunction = self.get_object(pk)
        serializer = UserBudgetCategoryJunctionSerializer(userBudgetCategoryJunction, data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, pk):
        userBudgetCategoryJunction = self.get_object(pk)
        userBudgetCategoryJunction.delete()
        return Response(status = status.HTTP_204_NO_CONTENT)