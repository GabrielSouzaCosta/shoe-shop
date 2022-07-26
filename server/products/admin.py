from django.contrib import admin
from .models import Product, Category, Images

admin.site.register(Category)

class ImagesInline(admin.TabularInline):
    model = Images

class ProductAdmin(admin.ModelAdmin):
    inlines = [
        ImagesInline,
    ]


admin.site.register(Product, ProductAdmin)
