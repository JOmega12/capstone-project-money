from django.urls import path

from . import views

urlpatterns = [
    path('api/', views.getCategories, name='categories_list'),
    path('api/create/', views.createCategory, name= 'create_category'),
    path('api/<int:pk>/update/', views.updateCategory, name= 'update_category/'),
    path('api/<int:pk>/delete/', views.deleteCategory, name= 'delete_category'),
]
