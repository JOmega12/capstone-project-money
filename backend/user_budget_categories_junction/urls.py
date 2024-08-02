from django.urls import path
from .views import UserBudgetCategoriesJunctionList, UserBudgetCategoriesJunctionDetail


urlpatterns = [
    path('api/', UserBudgetCategoriesJunctionList.as_view(), name='User_Budget_Categories_Junction_List'),
    path('api/<int:pk>', UserBudgetCategoriesJunctionDetail.as_view(), name='User_Budget_Categories_Junction_Detail')
]