from django.urls import path
from .views import ProductsListView, GetShippingInfoView

urlpatterns = [
    path('shoes/', ProductsListView.as_view()),
    path('shipping-details/', GetShippingInfoView.as_view())
]

