from django.shortcuts import render
from rest_framework import generics
from .models import Transaction
from .serializers import TransactionSerializer

# Create your views here.
#!need to learn more about generics and ListCreateAPIView
class TransactionList(generics.ListCreateAPIView):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer

class TransactionDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset =Transaction.objects.all()
    serializer_class= TransactionSerializer