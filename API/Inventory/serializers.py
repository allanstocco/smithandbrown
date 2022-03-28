from rest_framework import serializers
from versatileimagefield.serializers import VersatileImageFieldSerializer
from .models import *


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = '__all__'


class ProductsImageSerializer(serializers.ModelSerializer):
    image = VersatileImageFieldSerializer(sizes='product_headshot')

    class Meta:
        model = ProductsImage
        fields = ('id', 'products', 'image')


class ProductsCommentsSerializer(serializers.ModelSerializer):
    #user = serializers.ReadOnlyField(source="user.first_name")
    #user = serializers.StringRelatedField()
    #user = serializers.SlugRelatedField(slug_field='first_name', read_only=False)

    class Meta:
        model = Comments
        fields = '__all__'


class OrdersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Orders
        fields = '__all__'


class ProductsSerializer(serializers.ModelSerializer):
    #user_creator = serializers.ReadOnlyField(source="user_creator.first_name")
    #user_creator = serializers.StringRelatedField()
    photos = serializers.SerializerMethodField()
    comments = serializers.SerializerMethodField()
    #user_creator = serializers.SlugRelatedField(slug_field='first_name', read_only=True)

    def get_photos(self, obj):
        photos = ProductsImage.objects.filter(products=obj)
        return ProductsImageSerializer(photos, many=True, read_only=False).data

    def get_comments(self, obj):
        comments = Comments.objects.filter(products=obj)
        return ProductsCommentsSerializer(comments, many=True, read_only=False).data

    class Meta:
        model = Products
        fields = '__all__'

    
