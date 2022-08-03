from django.urls import path
from .views import CouponViewSet, ProcessWebhookView, credit_card_payment, boleto_payment
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('coupons', CouponViewSet, basename='coupons')

urlpatterns = [
    path('webhooks/paypal/', ProcessWebhookView.as_view()),
    path('credit-card/', credit_card_payment),
    path('boleto/', boleto_payment)
]

urlpatterns += router.urls