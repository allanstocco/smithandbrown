from django.contrib import admin
from .models import *
 

admin.site.register(Comments)
admin.site.register(Users)
admin.site.register(Orders)

class ProductImageAdmin(admin.StackedInline):
    model = ProductsImage
 
@admin.register(Products)
class ProductAdmin(admin.ModelAdmin):
    inlines = [ProductImageAdmin]
 
    class Meta:
       model = Products
 
@admin.register(ProductsImage)
class ProductImageAdmin(admin.ModelAdmin):
    pass

