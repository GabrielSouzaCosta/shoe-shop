from django.urls import path
from .views import ProductsListView

urlpatterns = [
    path('shoes/', ProductsListView.as_view())
]

