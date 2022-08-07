from rest_framework import serializers
from .models import Coupon, Order, OrderItem
from products.serializers import ImagesSerializer, ProductsSerializer

class CouponSerializer(serializers.ModelSerializer):
    class Meta:
        model = Coupon
        fields = ('id', 'code', 'amount', 'valid_days', 'created_at',)

    def update(self, instance):
      return instance


class MyOrderItemSerializer(serializers.ModelSerializer):
    product = ProductsSerializer(read_only=True)

    class Meta:
        model = OrderItem
        fields = (
            'product',
            'quantity',
            'get_final_price',
            )

class MyOrderSerializer(serializers.ModelSerializer):
    items = MyOrderItemSerializer(many=True)

    class Meta:
        model = Order
        fields = (
            'id',
            'payment_id',
            'amount',
            'payment_method',
            'shipping_address',
            'being_delivered',
            'paid',
            'received',
            'items',
            'ordered_date',
        )

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
            'payment_method',
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