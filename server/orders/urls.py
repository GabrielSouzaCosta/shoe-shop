from django.urls import path
from .views import ProcessWebhookView, credit_card_payment, boleto_payment

urlpatterns = [
    path('webhooks/paypal/', ProcessWebhookView.as_view()),
    path('credit-card/', credit_card_payment),
    path('boleto/', boleto_payment)
]
