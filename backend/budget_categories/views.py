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
    
    permission_classes= []
    
    def get(self, request):
        budget_categories = Budget_categories.objects.filter(userId = request.user)
        serializer = Budget_categoriesSerializers(budget_categories, many=True)
        return Response(serializer.data)

class Budget_categories_Detail(APIView):
    
    permission_classes = [IsAuthenticated]
    
    def get_object(self, pk):
        budget_categories = get_object_or_404(Budget_categories, pk =pk, userId= self.request.user)
        self.check_object_permissions(self.request, budget_categories)
        return budget_categories
    
    def get(self, request, pk):    
        budget_categories = self.get_object(pk)
        serializer = Budget_categoriesSerializers(budget_categories)
        return Response(serializer.data)
    
    def put(self, request, pk):
        budget_categories = self.get_object(pk)
        serializer = Budget_categoriesSerializers(budget_categories, data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status= status.HTTP_400_BAD_REQUEST)
        
    def delete(self, request, pk):
        budget_categories = self.get_object(pk)
        budget_categories.delete()
        return Response(f"{'message'}: {'Deleted'} ", status = status.HTTP_200_OK)