from django.db import models
from users.models import CustomUser
# Create your models here.


class Budget_categories(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models. CASCADE)
    name = models.CharField(max_length=100)
    
    def __str__(self): 
        return f'{self.name}'