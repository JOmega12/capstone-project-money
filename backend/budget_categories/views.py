from django.shortcuts import render

from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status

# from .models import Budget_categories


from .serializers import Budget_categoriesSerializers
from .models import Budget_categories

from rest_framework.permissions import IsAuthenticated

# Create your views here.

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getCategories(request):
    user = request.user
    categories = user.budget_categories_set.all()
    serializer = Budget_categoriesSerializers(categories, many =True)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createCategory(request):
    user = request.user
    data = request.data
    
    data['is_custom']= True
    
    serializer = Budget_categoriesSerializers(data = data)
    if serializer.is_valid():
        serializer.save(user = user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)


@api_view(['PATCH'])
@permission_classes([IsAuthenticated])
def updateCategory(request, pk):
    try:
        budget_category = Budget_categories.get(pk = pk, user=request.user)
    except Budget_categories.DoesNotExist:
        Response({"Error": "Budget is not found or no Permission"})
        
    serializer = Budget_categoriesSerializers(budget_category, data = request.data, partial= True)
    
    if(serializer.is_valid()):
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def deleteCategory(request, pk):
    try:
        budget_category = Budget_categories.objects.get(pk=pk, user=request.user)
    except Budget_categories.DoesNotExist:
        return Response({"error": "Item is not found or no permission"}, status=status.HTTP_404_NOT_FOUND)
    
    budget_category.delete()
    return Response({"Message": "Item Deleted Successfully"}, status= status.HTTP_200_OK)