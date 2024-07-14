from django.db import models
from django.contrib.auth.models import AbstractUser, Group, Permission
# Create your models here.

class CustomUser(AbstractUser):
    name = models.CharField(max_length=55)
    username = models.CharField(max_length=20, unique=True)
    # groups = models.ManyToManyField(Group, related_name='custom_user_set', blank=True)
    # user_permissions = models.ManyToManyField(Permission, related_name='custom_user_set', blank=True)

    def __str__(self):
        return f"{self.username}"