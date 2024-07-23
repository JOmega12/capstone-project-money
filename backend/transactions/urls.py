from django.urls import path
from .views import TransactionList, TransactionDetail



#as_view is for showing the information as a GET request 
urlpatterns = [
    path('api/', TransactionList.as_view(), name='transaction_list'),
    path('api/<int:pk>', TransactionDetail.as_view(), name='transaction_detail')
]
