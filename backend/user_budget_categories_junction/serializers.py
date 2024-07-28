from rest_framework import serializers
from .models import UserBudgetCategoryJunction


class UserBudgetCategoryJunctionSerializer(serializers.ModelSerializer):
    
    class Meta: 
        model = UserBudgetCategoryJunction
        fields = ['id', 'userId', 'budget_category_id']