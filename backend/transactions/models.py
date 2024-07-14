from django.db import models
from users.models import CustomUser


# Create your models here.
class Transaction(models.Model):
    userId = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    transactionName = models.CharField(max_length=20)
    transactionAmount = models.DecimalField(max_digits=20, decimal_places=2)
    createdAt= models.DateField(auto_now_add=True)

    
    def __str__(self):
        return f"{self.transactionName}, amount: {self.transactionAmount}, date: {self.createdAt}"
    
