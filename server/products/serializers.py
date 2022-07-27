from rest_framework import serializers

from .models import Product, Images

class ImagesSerializer(serializers.ModelSerializer):
  class Meta:
    model = Images
    fields = (
      'get_image',
      'get_thumbnail',
    )

class ProductsSerializer(serializers.ModelSerializer):
  images = ImagesSerializer(many=True)

  class Meta:
    model = Product
    fields = (
      'id',
      'name',
      'slug',
      'category', 
      'description', 
      'price', 
      'date_added',
      'images'
    )
    lookup_field = 'slug'