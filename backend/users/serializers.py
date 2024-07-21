from rest_framework import serializers
from .models import CustomUser
from django.contrib.auth import get_user_model


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'name', 'username']
        
        
class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(max_length=100, min_length=6, style={'input_type': 'password'})
    class Meta:
        model = get_user_model()
        fields= ['name', 'username', 'password']
        
    def create(self, validated_data):
        user_password = validated_data.get('password', None)
        db_instance = self.Meta.model(username = validated_data.get('username'))
        db_instance.set_password(user_password)
        db_instance.save()
        return db_instance
    
class UserLoginSerializer(serializers.ModelSerializer):
    
    username = serializers.CharField(max_length= 100)
    password = serializers.CharField(max_length= 100, min_length=6, style={'input_type': 'password'})
    token = serializers.CharField(max_length = 255, read_only= True)
    
    class Meta:
        model = CustomUser
        fields = ['username', 'password', 'token']
        
        