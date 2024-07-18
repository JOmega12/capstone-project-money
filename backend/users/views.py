from django.shortcuts import render
from .models import CustomUser
from .serializers import UserLoginSerializer, UserRegistrationSerializer
from rest_framework.views import APIView
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import AuthenticationFailed
from django.contrib.auth import authenticate
from django.conf import settings
from django.contrib.auth import get_user_model
from .utils import generate_access_token
import jwt
# Create your views here.

#need to add UserList View views


class UserRegistrationView(APIView):
    serializer_class = UserRegistrationSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (AllowAny,)
    
    def get(self, request):
        content = {'Message': "Oh Hi Mark!"}
        return Response(content)
    
    def post(self, request):
        serializer = self.serializer_class(data = request.data)
        if serializer.is_valid(raise_exception=True):
            new_user = serializer.save()
            if new_user:
                access_token = generate_access_token(new_user)
                data = {'access_token': access_token}
                response = Response(data, status=status.HTTP_201_CREATED)
                response.set_cookie(key = 'access_token', value=access_token, httponly=True)
                return response
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserLoginView(APIView):
    serializer_class = UserLoginSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (AllowAny,)
    
    def post(self, request):
        username = request.data.get('username', None)
        user_password = request.data.get('password', None)
        
        if not user_password:
            raise AuthenticationFailed('A User password is needed')
        
        if not username:
            raise AuthenticationFailed('A Username is required')
        
        user_instance = authenticate(username=username, password = user_password)
        
        if user_instance.is_active:
            user_access_token = generate_access_token(user_instance)
            response = Response()
            response.set_cookie(key='access_token', value= user_access_token, httponly=True)
            response.data = {
                'access_token': user_access_token
            }
            return response
        
        return Response({
            'Message': "Something Went Wrong"
        })
        

class UserViewAPI(APIView):
    authentication_classes = (TokenAuthentication,)