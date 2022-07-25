from rest_framework import generics
from rest_framework.views import Response
from rest_framework.permissions import IsAdminUser
from .models import Category, Product
from .serializers import ProductsSerializer

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
