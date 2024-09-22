from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Budget_categories

@receiver(post_save, sender= User)
def create_default_categories(sender, instance, created, **kwargs):
    if created:
        predef_categories = ['Food', 'Transport', 'Utilities', 'Entertainment']
        for category in predef_categories:
            Budget_categories.objects.create(name=category, user= instance, is_custom = False)

