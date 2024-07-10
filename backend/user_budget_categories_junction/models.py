from django.db import models
from users.models import CustomUser
from budget_categories.models import Budget_categories

# Create your models here.

class UserBudgetCategoryJunction(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    budget_category = models.ForeignKey(Budget_categories, on_delete=models.CASCADE)
    
    def __str__(self):
        return f"{self.user} - {self.budget_category}"