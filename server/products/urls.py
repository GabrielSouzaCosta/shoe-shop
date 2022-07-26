from email.mime import base
from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import ProductsListView, GetShippingInfoView

router = DefaultRouter()
router.register('shoes', ProductsListView, basename='shoes')

urlpatterns = [
    path('shipping-details/', GetShippingInfoView.as_view())
]

urlpatterns += router.urls
