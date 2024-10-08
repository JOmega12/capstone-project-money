from django.db import models
from django.contrib.auth.models import User
from budget_categories.models import Budget_categories


# Create your models here.
class Transaction(models.Model):
    
    TRANSACTION_TYPES = (
        ('income', 'Income'),
        ('expense', 'Expense')
    )
    
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    transactionName = models.CharField(max_length=20)
    transactionAmount = models.DecimalField(max_digits=20, decimal_places=2)
    transactionType = models.CharField(max_length = 10, choices=TRANSACTION_TYPES, null = True, blank=True)
    category = models.ForeignKey(Budget_categories, on_delete=models.CASCADE, related_name='transactions',null = True, blank=True)
    createdAt= models.DateField(auto_now_add=True)

    
    def __str__(self):
        return f"{self.transactionName}, amount: {self.transactionAmount}, date: {self.createdAt}"
    
