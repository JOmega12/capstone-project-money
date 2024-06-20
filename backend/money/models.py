

from django.db import models
from django.contrib.auth.models import AbstractUser

CHOICES = [
    ('girlfriend', 'Girlfriend'),
    ('fun', 'Fun'),
    ('shelter', 'Shelter')
]

class User(AbstractUser):
    pass

class Income (models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    incomeName = models.CharField(max_length=20)
    incomeAmount = models.DecimalField(max_digits=20)
    date = models.DateField()
    
    def __str__(self):
        return self.incomeName
   
class Expense (models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    expenseName = models.CharField(max_length=20)
    expenseAmount = models.DecimalField(max_digits=20, decimal_places=2)
    categoryType = models.CharField(max_length=20, default='no category', choices=CHOICES)
    date = models.DateField()
    
    def __str__(self):
        return self.expenseName