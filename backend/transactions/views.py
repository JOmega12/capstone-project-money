from django.shortcuts import render


from rest_framework.response import Response
from rest_framework import status

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated


from .models import Transaction
from .serializers import TransactionSerializer


# Create your views here.

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getTransaction(request):
    user = request.user
    transactions = user.transaction_set.all()
    serializer = TransactionSerializer(transactions, many=True)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createTransaction(request):
    user = request.user
    data = request.data
    
    serializer = TransactionSerializer(data= data)
    if serializer.is_valid():
        serializer.save(user = user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# !check if works
@api_view(['PATCH'])
@permission_classes([IsAuthenticated])
def updateTransaction(request, pk):
    try: 
        transaction = Transaction.objects.get(pk= pk, user= request.user)
    except Transaction.DoesNotExist:
        Response({"error": "Transaction is not found or no permission"})
    
    serializer = TransactionSerializer(transaction, data = request.data, partial = True)
    
    if(serializer.is_valid()):
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status= status.HTTP_400_BAD_REQUEST)


#! check if works
@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def deleteTransaction(request, pk):
    try: 
        transaction = Transaction.objects.get(pk = pk, user = request.user)
    except Transaction.DoesNotExist:
        return Response({"error": "Item is not found or No permission"}, status= status.HTTP_404_NOT_FOUND)
    
    transaction.delete()
    return Response({"Message": "Item Deleted Successfully"}, status= status.HTTP_200_OK)