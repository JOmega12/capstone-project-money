from django.urls import path
from .views import Budget_categories_Detail, Budget_categories_List

urlpatterns = [
    # path('api/', Budget_categories_List.as_view(), name='budgetList'),
    # path('api/<int:pk>', Budget_categories_Detail.as_view(), name='budgetDetail')
]
