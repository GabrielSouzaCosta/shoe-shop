from statistics import mode
from rest_framework import serializers

from .models import Product

class ProductsSerializer(serializers.ModelSerializer):
  class Meta:
    model = Product
    fields = (
      'name', 
      'category', 
      'description', 
      'price', 
      'date_added', 
      'get_image', 
      'get_thumbnail'
    )
