from django.urls import path

from . import views

urlpatterns = [
    path('api/', views.getCategories, name='categories_list')
]
