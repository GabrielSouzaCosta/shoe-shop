from django.urls import path
from .views import ProcessWebhookView

urlpatterns = [
    path('webhooks/paypal/', ProcessWebhookView.as_view())
]
