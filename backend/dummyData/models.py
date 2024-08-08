from django.db import models



# Create your models here.

class ExampleModel(models.Model):
    user_id= models.AutoField(primary_key=True)
    name = models.CharField(max_length=50)