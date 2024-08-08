from django.urls import path
from .views import ExampleModelList



urlpatterns = [
    path('api/', ExampleModelList.as_view(), name='example_list')
]
