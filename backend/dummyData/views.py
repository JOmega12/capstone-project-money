from django.shortcuts import render
from rest_framework.views import APIView
from .models import ExampleModel
from .serializers import ExampleModelSerializer
from rest_framework.response import Response
from rest_framework import status

# Create your views here.

class ExampleModelList(APIView):
    
    permission_classes= []
    
    def get(self, request):
        exampleModel = ExampleModel.objects.all()
        serializer = ExampleModelSerializer(exampleModel, many=True)
        return Response(serializer.data)
    
    def post(self, request):
        print(request.content_type)  # Logs the content type
        print(request.data)  # Logs the incoming data
        serializer = ExampleModelSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save() 
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)