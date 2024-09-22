from django.shortcuts import render

from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status

# from .models import Budget_categories


from .serializers import Budget_categoriesSerializers
from rest_framework.permissions import IsAuthenticated

# Create your views here.

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getCategories(request):
    user = request.user
    categories = user.budget_categories_set.all()
    serializer = Budget_categoriesSerializers(categories, many =True)
    return Response(serializer.data)

