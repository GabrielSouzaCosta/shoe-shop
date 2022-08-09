from multiprocessing import context
from unicodedata import name
from django.shortcuts import get_object_or_404
from rest_framework.views import Response, APIView
from rest_framework.permissions import IsAdminUser, AllowAny
from rest_framework import viewsets, status
from rest_framework.parsers import MultiPartParser, FormParser, FileUploadParser, JSONParser
from .models import Category, Product
from .serializers import ProductsSerializer
from .scripts import get_shipping

class ProductsListView(viewsets.ViewSet):
  serializer_class = ProductsSerializer
  permission_classes = [IsAdminUser]
  parser_classes = (MultiPartParser, FormParser, FileUploadParser, JSONParser)                                                
  lookup_field = 'slug'

  def get_queryset(self):
    search = self.request.query_params.get('product')
    if search:
      print(search)
      queryset = Product.objects.filter(name__startswith=search)
      return queryset
    queryset = Product.objects.all()
    return queryset

  def list(self, request, *args, **kwargs):
    queryset = self.get_queryset()
    serializer = ProductsSerializer(queryset, many=True)
    return Response(serializer.data)

  def retrieve(self, request, slug):
    queryset = Product.objects.all()
    product = get_object_or_404(queryset, slug=slug)
    serializer = ProductsSerializer(product)
    return Response(serializer.data)

  def create(self, request, *args, **kwargs):
    serializer = self.serializer_class(data=request.data, context={'request': request})
    if serializer.is_valid():
      serializer.save()
      return Response(data=serializer.data, status=status.HTTP_201_CREATED)
    else:
      return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)

  def perform_create(self, serializer):
    serializer.save(product=self.request.data)

  def update(self, request, slug):
    instance = self.get_object(slug)
    instance.name = request.data['name']
    instance.category = Category.objects.get(pk=request.data['category'])
    instance.description = request.data['description']
    instance.price = request.data['price']
    instance.save()

    serializer = self.serializer_class(instance, data=request.data, context={'request': request})
    serializer.is_valid(raise_exception=True)
    serializer.save()
    
    return Response(serializer.data, status=status.HTTP_200_OK)

  def get_object(self, slug):
    product = Product.objects.get(slug=slug)
    return product

  def destroy(self, request, slug):
    product = self.get_object(slug)
    product.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)

  def get_permissions(self):
        if self.request.method == 'POST':
            return [permission() for permission in self.permission_classes]
        return [AllowAny()]

class GetShippingInfoView(APIView):
  def get(self, request):
    zipcode = request.query_params.get('zipcode')
    response = get_shipping(zipcode)  
    return Response({"sedex":response[0], "pac":response[1]})
