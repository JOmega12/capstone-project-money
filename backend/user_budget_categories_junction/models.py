from django.db import models
from django.contrib.auth.models import User
from budget_categories.models import Budget_categories

# Create your models here.

class UserBudgetCategoryJunction(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    budget_category_id = models.ForeignKey(Budget_categories, on_delete=models.CASCADE)
    
    def __str__(self):
        return f"{self.userId} - {self.budget_category_id}"