from django.db import models
from django.contrib.auth.models import User
# Create your models here.


class Budget_categories(models.Model):
    name = models.CharField(max_length=100)
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    is_custom = models.BooleanField(default=False)
    
    def __str__(self): 
        return f'{self.name} by {self.user}'