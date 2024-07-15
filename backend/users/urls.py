from django.urls import path
from .views import UserList, UserDetail

urlpatterns = [
    path('api/', UserList.as_view(), name='user_list'),
    path('api/<int:pk>/', UserDetail.as_view(), name='user_dejtail'),
]