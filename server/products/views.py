from rest_framework import generics
from rest_framework.views import Response, APIView
from rest_framework.permissions import IsAdminUser, AllowAny
from .models import Category, Product
from .serializers import ProductsSerializer
from .scripts import get_shipping

class ProductsListView(generics.ListCreateAPIView):
  serializer_class = ProductsSerializer
  permission_classes = [IsAdminUser]

  #filter by category or return all products
  def get_queryset(self):
    category = self.request.query_params.get('category')
    if category:
      queryset = Product.objects.filter(category=category)
      return queryset
    queryset = Product.objects.all()
    return queryset

  def list(self, request):
    queryset = self.get_queryset()
    serializer = ProductsSerializer(queryset, many=True)
    return Response(serializer.data)

  def get_permissions(self):
        if self.request.method == 'POST':
            return [permission() for permission in self.permission_classes]
        return [AllowAny()]

class GetShippingInfoView(APIView):
  def get(self, request):
    zipcode = request.query_params.get('zipcode')
    response = get_shipping(zipcode)  
    return Response({"sedex":response[0], "pac":response[1]})
