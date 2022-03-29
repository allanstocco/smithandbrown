from django.http import JsonResponse
from rest_framework.parsers import JSONParser, MultiPartParser, FormParser
from rest_framework import status, permissions, viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response


from django.shortcuts import get_object_or_404

from user.serializers import *
from .serializers import *
from .models import *


def modify_input_for_multiple_files(products, image):
    dict = {}
    dict['products'] = products
    dict['image'] = image
    return dict


class UserViewSet(viewsets.ModelViewSet):
    queryset = Users.objects.all()
    serializer_class = UserSerializer
    permission_classes = (permissions.AllowAny,)

    def retrieve(self, request, mail):
        obj = User.objects.get(email=mail)
        user = obj.profile

        serializer = UserSerializer(user)
        return JsonResponse(serializer.data, safe=False)


class ProductsViewSet(viewsets.ModelViewSet):
    queryset = Products.objects.order_by('title')
    serializer_class = ProductsSerializer
    parser_classes = (MultiPartParser, FormParser, JSONParser)
    permission_classes = (permissions.AllowAny,)

    def create(self, request, format=None):

        data = request.data
        serializer = ProductsSerializer(data=data)

        if serializer.is_valid():
            serializer.save()
            print(serializer.data)

        images = dict((request.FILES).lists())['image']

        spot = 1
        arr = []
        for img_name in images:
            modified_data = modify_input_for_multiple_files(
                serializer.data['id'], img_name)
            file_serializer = ProductsImageSerializer(data=modified_data)

            if file_serializer.is_valid():
                file_serializer.save()
                arr.append(file_serializer.data)
            else:
                spot = 0

        if spot == 1:
            return JsonResponse(serializer.data, status=200, safe=False)
        else:
            return JsonResponse(serializer.data, status=400, safe=False)


class ProductsImageViewSet(viewsets.ModelViewSet):
    queryset = ProductsImage.objects.all()
    serializer_class = ProductsImageSerializer
    parser_classes = (MultiPartParser, FormParser, JSONParser)
    permission_classes = (permissions.AllowAny,)

    def list(self, request):
        serializer = ProductsImageSerializer(self.queryset, many=True)
        return JsonResponse(serializer.data, safe=False)

    def retrieve(self, request, pk=None):
        item = get_object_or_404(self.queryset, pk=pk)
        serializer = ProductsImageSerializer(item)
        return JsonResponse(serializer.data, safe=False)


class ProductsCommentsViewSet(viewsets.ModelViewSet):
    queryset = Comments.objects.all()
    serializer_class = ProductsCommentsSerializer
    parser_classes = (FormParser, JSONParser)
    permission_classes = (permissions.AllowAny,)


class OrdersViewSet(viewsets.ModelViewSet):
    queryset = Orders.objects.order_by('-requested')
    serializer_class = OrdersSerializer
    parser_classes = (FormParser, JSONParser)
    permission_classes = (permissions.AllowAny,)
