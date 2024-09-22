from rest_framework import serializers
from .models import Budget_categories
from transactions.serializers import TransactionSerializer

class Budget_categoriesSerializers(serializers.ModelSerializer):
    
    transactions = TransactionSerializer(many=True, read_only=True)
    class Meta:
        model= Budget_categories
        fields = fields = ['id', 'name', 'user', 'is_custom', 'transactions']

