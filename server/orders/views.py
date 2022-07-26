from django.conf import settings
from django.http import HttpResponse, HttpResponseBadRequest
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from django.views.generic import View
from django.shortcuts import get_object_or_404
from rest_framework import viewsets, status
from rest_framework.views import Response
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.authentication import TokenAuthentication, SessionAuthentication
from rest_framework.permissions import IsAuthenticated, IsAdminUser, AllowAny
from django.core.mail import send_mail
from .serializers import CouponSerializer, OrderSerializer, MyOrderSerializer
from .models import Coupon, Order

from paypalrestsdk import notifications 
import json
from pprint import pprint
from .scripts import pagseguro_credit_card_request, pagseguro_boleto_payment

class OrdersListViewSet(viewsets.ReadOnlyModelViewSet):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    serializer_class = MyOrderSerializer

    def get_queryset(self):
        queryset = Order.objects.filter(user=self.request.user)
        return queryset

    def list(self, request):
        queryset = self.get_queryset()
        serializer = MyOrderSerializer(queryset, many=True)
        print(serializer.data)
        return Response(serializer.data)

    def retrieve(self, request, *args, **kwargs):
        return super().retrieve(request, *args, **kwargs)
    


class CouponViewSet(viewsets.ViewSet):
    serializer_class = CouponSerializer
    permission_classes = [IsAdminUser]

    def get_permissions(self):
        if self.request.method == 'POST':
            return [permission() for permission in self.permission_classes]
        return [AllowAny()]

    def get_queryset(self):
        queryset = [coupon for coupon in Coupon.objects.all() if not coupon.expired]
        return queryset 
        
    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = CouponSerializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk):
        queryset = Coupon.objects.all()
        coupon = get_object_or_404(queryset, pk=pk)
        serializer = CouponSerializer(coupon)
        return Response(serializer.data)

    def create(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(data=serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def perform_create(self, serializer):
        serializer.save(coupon=self.request.data)

    def put(self, request, pk):
        instance = self.get_object(pk)
        instance.code = request.data['code']
        instance.amount = request.data['amount']
        instance.valid_days = request.data['valid_days']
        instance.save()

        serializer = self.serializer_class(instance, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data, status=status.HTTP_200_OK)

    def get_object(self, pk):
        coupon = Coupon.objects.get(pk=pk)
        return coupon

    def destroy(self, request, pk):
        product = self.get_object(pk)
        product.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

# Payment Handlers Views
@api_view(['POST'])
@authentication_classes([TokenAuthentication,])
@permission_classes([IsAuthenticated,])
def credit_card_payment(request):
    serializer = OrderSerializer(data=request.data)
    shipping_info = request.data['shippingInfo']
    print(shipping_info)

    if serializer.is_valid():
        response = pagseguro_credit_card_request(2000, request.data['name'], request.data['month'], request.data['year'], request.data['ccv'])
        pprint(response)
        serializer.save(user=request.user, amount=response['amount']['value']/100, payment_id=response['id'])
        send_mail(
            'Order Successfully Approved',
            f'Your order has been successfully approved.',
            settings.DEFAULT_FROM_EMAIL,
            ['gabrielxs727@gmail.com']
        )
        return Response(response, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@authentication_classes([TokenAuthentication,])
@permission_classes([IsAuthenticated,])
def boleto_payment(request):
    serializer = OrderSerializer(data=request.data)
    shipping_info = request.data['shippingInfo']
    
    if serializer.is_valid():
        response = pagseguro_boleto_payment("nike shock", 2000, shipping_info)
        pprint(response)
        serializer.save(user=request.user, amount=response['amount']['value']/100, payment_id=response['id'])
        send_mail(
            'Order Successfully Processed',
            f'Your order has been successfully processed. Barcode: {response["payment_method"]["boleto"]["barcode"]}',
            settings.DEFAULT_FROM_EMAIL,
            ['gabrielxs727@gmail.com']
        )
        return Response(response, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@method_decorator(csrf_exempt, name="dispatch")
class ProcessWebhookView(View):
    def post(self, request):
        if "HTTP_PAYPAL_TRANSMISSION_ID" not in request.META:
            return HttpResponseBadRequest()
        
        auth_algo = request.META['HTTP_PAYPAL_AUTH_ALGO']
        cert_url = request.META['HTTP_PAYPAL_CERT_URL']
        transmission_id = request.META['HTTP_PAYPAL_TRANSMISSION_ID']
        transmission_sig = request.META['HTTP_PAYPAL_TRANSMISSION_SIG']
        transmission_time = request.META['HTTP_PAYPAL_TRANSMISSION_TIME']
        webhook_id = settings.PAYPAL_WEBHOOK_ID
        event_body = request.body.decode(request.encoding or "utf-8")

        valid = notifications.WebhookEvent.verify(
            transmission_id=transmission_id,
            timestamp=transmission_time,
            webhook_id=webhook_id,
            event_body=event_body,
            cert_url=cert_url,
            actual_sig=transmission_sig,
            auth_algo=auth_algo,
        )

        if not valid:
            return HttpResponseBadRequest

        webhook_event = json.loads(event_body)
        event_type = webhook_event['event_type']
              
        pprint(webhook_event)

        CHECKOUT_ORDER_APPROVED = "CHECKOUT.ORDER.APPROVED"

        if event_type == CHECKOUT_ORDER_APPROVED:
            customer_email = webhook_event["resource"]["payer"]["email_address"]
            product_link = 'http://127.0.0.1:5173/shoes'
            send_mail(
            subject="Order Success",
            from_email=settings.DEFAULT_FROM_EMAIL,
            message=f"Thank you for purchasing our product. Here is the link: {product_link}",
            recipient_list=[customer_email]
            )


        return HttpResponse()
