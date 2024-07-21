from django.urls import path
from .views import UserLoginView, UserRegistrationView, UserViewAPI ,UserLogoutViewAPI

urlpatterns = [
    path('api/register/', UserRegistrationView.as_view()),
    path('api/login/', UserLoginView.as_view()),
    path('api/', UserViewAPI.as_view()),
    path('api/logout/', UserLogoutViewAPI.as_view()),
]