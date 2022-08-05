from datetime import timedelta
from django.utils import timezone
from django.db import models
from django.conf import settings
from products.models import Product
from users.models import Address

PAYMENT_METHODS = (
    ('CREDIT_CARD', 'Credit Card'),
    ('BOLETO', "Boleto"),
    ('PAYPAL', "Paypal"),
)

class Coupon(models.Model):
    code = models.CharField(max_length=15)
    amount = models.FloatField()
    valid_days = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)

    @property
    def expired(self):
        if (timezone.now() - timedelta(self.valid_days)) > self.created_at:
            return True
        else:
            return False

    def __str__(self):
        return f'{self.code} valid for {self.valid_days} days'


class Payment(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, blank=True, null=True)
    payment_id = models.TextField()
    method = models.CharField(max_length=20, choices=PAYMENT_METHODS)
    amount = models.FloatField()
    paid = models.BooleanField(default=False)

    def __str__(self):
        return f'{self.method}: {self.payment_id}'

class Order(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    payment = models.ForeignKey(Payment, on_delete=models.SET_NULL, blank=True, null=True)
    shipping_address = models.ForeignKey(Address, related_name='shipping_address', on_delete=models.SET_NULL, blank=True, null=True)
    coupon = models.ForeignKey(Coupon, on_delete=models.SET_NULL, blank=True, null=True)
    being_delivered = models.BooleanField(default=False)
    received = models.BooleanField(default=False)
    ordered_date = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-ordered_date',]

    def __str__(self):
        return self.payment.payment_id


class OrderItem(models.Model):
    order = models.ForeignKey(Order, related_name='items', on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.IntegerField(default=1)

    def __str__(self):
        return f"{self.quantity} of {self.product.name}"

    def get_total_item_price(self):
        return self.quantity * self.product.price

    def get_total_discount_item_price(self):
        return self.quantity * self.product.discount_price

    def get_final_price(self):
        if self.product.discount_price:
            return self.get_total_discount_item_price()
        return self.get_total_item_price()