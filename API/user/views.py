from rest_framework.generics import CreateAPIView, RetrieveAPIView
from rest_framework import permissions
from rest_framework import views, status
from rest_framework.response import Response
from django.contrib.auth import login
from . import serializers


class UserRegistrationView(CreateAPIView):
    pass


class UserLoginView(RetrieveAPIView):

    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        serializer = serializers.UserLoginSerializer(data=self.request.data,
                                                     context={'request': self.request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        login(request, user)
        return Response(None, status=status.HTTP_202_ACCEPTED)
