from django.urls import path
from . import views

#as_view is for showing the information as a GET request 
urlpatterns = [
    path('api/', views.getTransaction, name='transaction_list'),
    path('api/create/', views.createTransaction, name='create_transaction'),
    path('api/<int:pk>/update/', views.updateTransaction, name='update_transaction'),
    path('api/<int:pk>/delete/', views.deleteTransaction, name='delete_transaction'),
]
