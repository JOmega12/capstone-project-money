from rest_framework import serializers
from .models import Budget_categories


class Budget_categoriesSerializers(serializers.Serializer):
    
    class Meta:
        model: Budget_categories
        fields = ['id', 'user', 'name']
