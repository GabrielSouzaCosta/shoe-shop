from django.conf import settings
from django.conf.urls.static import static 
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('api/v1/', include('rest_framework.urls')),
    path('api/v1/', include('users.urls')),
    path('api/v1/', include('products.urls')),
    path('api/v1/', include('orders.urls')),
    path('admin/', admin.site.urls),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT) + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
