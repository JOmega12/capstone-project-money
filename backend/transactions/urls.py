from django.urls import path
from .views import TransactionList, TransactionDetail



#! need to learn about the method .asview() and the syntax of the url patterns of path

#as_view is for showing the information as a GET request 
urlpatterns = [
    path('money/', TransactionList.as_view(), name='transaction_list'),
    path('money/<int:pk>', TransactionDetail.as_view(), name='transaction_detail')
]
