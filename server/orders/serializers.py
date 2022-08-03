from rest_framework import serializers
from .models import Coupon, Order, OrderItem, Payment


class CouponSerializer(serializers.ModelSerializer):
    class Meta:
        model = Coupon
        fields = ('id', 'code', 'amount', 'valid_days', 'created_at',)

    def update(self, instance, validated_data):
      return instance

class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = ('payment_id', 'method', 'amount', 'user',)