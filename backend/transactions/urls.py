from django.urls import path
from .views import TransactionList, TransactionDetail



#! need to learn about the method .asview() and the syntax of the url patterns of path
urlpatterns = [
    path('api/', TransactionList.as_view(), name='transaction_list'),
    path('api/<int:pk>', TransactionDetail.as_view(), name='transaction_detail')
]
