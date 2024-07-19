from django.urls import path
from .views import UserLoginView, UserRegistrationView, UserViewAPI ,UserLogoutViewAPI

urlpatterns = [
    path('user/register/', UserRegistrationView.as_view()),
    path('user/login/', UserLoginView.as_view()),
    path('user/', UserViewAPI.as_view()),
    path('user/logout/', UserLogoutViewAPI.as_view()),
]