from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager
# Create your models here.


class CustomUserManager(BaseUserManager):
    def create_user(self, username, password=None):
        if not username:
            raise ValueError('Must have username')
        
        if not password:
            raise ValueError('Must have password')
        
        user = self.model(username = username)
        user.set_password(password)
        user.save()
        return user
    
    def create_superuser(self, username, password=None):
        if not username:
            raise ValueError('Must have username')

        if not password:
            raise ValueError('Must have password')

        user = self.create_user(username, password)
        user.is_superuser = True
        user.is_staff = True
        user.save()
        return user
    
class CustomUser(AbstractUser):
    name = models.CharField(max_length=55)
    username = models.CharField(max_length=20, unique=True)
    # groups = models.ManyToManyField(Group, related_name='custom_user_set', blank=True)
    # user_permissions = models.ManyToManyField(Permission, related_name='custom_user_set', blank=True)
    objects = CustomUserManager()
    
    def __str__(self):
        return f"{self.username}"