from tkinter import image_names
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
  images = ImagesSerializer(many=True, read_only=True)

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

  def create(self, validated_data):
      images_data = self.context.get('request').FILES.getlist('file')
      product = Product.objects.create(**validated_data)
      for i, image_data in enumerate(images_data):
        Images.objects.create(title=validated_data['name'], image=image_data, product=product)
      return product

    