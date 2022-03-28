from django.db import models
from user.models import User
from versatileimagefield.fields import VersatileImageField, PPOIField


class Users(models.Model):

    id = models.AutoField(primary_key=True)
    user = models.OneToOneField(
        User, on_delete=models.CASCADE, related_name='profile')
    first_name = models.CharField(max_length=50, unique=False)
    last_name = models.CharField(max_length=50, unique=False)
    phone_number = models.CharField(
        max_length=10, unique=True, null=True, blank=True)
    profile = VersatileImageField(
        'Image', upload_to='images/', ppoi_field='image_ppoi', null=True, blank=True)
    image_ppoi = PPOIField()

    class Meta:
        verbose_name_plural = "Users"

    def __str__(self):
        return self.first_name


class Products(models.Model):
    title = models.CharField(max_length=100)
    item_code = models.CharField(max_length=50)
    description = models.CharField(max_length=1024, null=True, blank=True)
    category = models.CharField(
        default="None", max_length=30, null=True, blank=True)
    supplier = models.CharField(max_length=30, null=True, blank=True)
    status = models.BooleanField(default=True)
    user_creator = models.ForeignKey(
        Users, on_delete=models.CASCADE, related_name="user_creator", null=True, blank=True)
    created = models.DateField(auto_now_add=True)
    updated = models.DateField(auto_now=True)

    class Meta:
        verbose_name_plural = "Products"

    def __str__(self):
        return self.title


class Orders(models.Model):
    qty = models.CharField(max_length=30, null=True, blank=True)
    job_number = models.CharField(max_length=30, null=True, blank=True)
    description = models.CharField(max_length=300, null=True, blank=True)
    code = models.CharField(max_length=30, null=True, blank=True)
    supplier = models.CharField(max_length=30, null=True, blank=True)
    requested = models.DateField(auto_now_add=True)
    received = models.CharField(max_length=7, null=True, blank=True)

    class Meta:
        verbose_name_plural = "Orders"

    def __str__(self):
        return self.job_number


class Comments(models.Model):
    user = models.ForeignKey(Users, on_delete=models.CASCADE, related_name='comments',
                             related_query_name='comment', null=True, blank=True)
    products = models.ForeignKey(
        Products, on_delete=models.CASCADE, related_name='comments', related_query_name='comment')
    content = models.CharField(max_length=2048)
    created = models.DateField(auto_now_add=True)
    updated = models.DateField(auto_now=True)

    class Meta:
        verbose_name_plural = "Comments"

    def __str__(self):
        return self.products.title


class ProductsImage(models.Model):
    products = models.ForeignKey(Products, on_delete=models.CASCADE, null=True,
                                 related_name='product_media', related_query_name='product_media')
    image = VersatileImageField(
        'Image', upload_to='images/', ppoi_field='image_ppoi', null=True, blank=True)
    image_ppoi = PPOIField()

    def __str__(self):
        return f'{self.id} Media'
