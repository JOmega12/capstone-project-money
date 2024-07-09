

from django.db import models
from django.contrib.auth.models import AbstractUser

CHOICES = [
    ('girlfriend', 'Girlfriend'),
    ('fun', 'Fun'),
    ('shelter', 'Shelter')
]

class CustomUser(AbstractUser):
    pass

class Transaction(models.Model):
    userId = models.ForeignKey(User, on_delete=models.CASCADE)
    transactionName = models.CharField(max_length=20)
    transactionAmount = models.DecimalField(max_digits=20, decimal_places=2)
    createdAt= models.DateField()
    categoryType = models.CharField(max_length=20, default ='no_category', choices=CHOICES)
    
    def __str__(self):
        return self.incomeName
    
