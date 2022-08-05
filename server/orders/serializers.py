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

class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = ( 
            'product',
            'quantity',
            'get_final_price',
            )

class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True)

    class Meta:
        model = Order
        fields = (
            'id',
            'payment',
            'shipping_address',
            'being_delivered',
            'received',
            'items',
        )
    
    def create(request, validated_data):
        items_data = validated_data.pop('items')
        order = Order.objects.create(**validated_data)

        for item_data in items_data:
            OrderItem.objects.create(order=order, **item_data)

        return order