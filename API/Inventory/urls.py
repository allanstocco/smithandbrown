from django.conf.urls import url
from .views import *


UserView = UserViewSet.as_view({'get': 'list'})

UserViewMethods = UserViewSet.as_view({'get': 'retrieve'})

ProductList = ProductsViewSet.as_view({'get': 'list', 'post': 'create'})

ProductMethods = ProductsViewSet.as_view({'get': 'retrieve', 'put': 'update', 'delete': 'destroy'})

OrdersList = OrdersViewSet.as_view({'get': 'list', 'post': 'create'})

OrdersListMethods = OrdersViewSet.as_view({'get': 'retrieve', 'put': 'update'})

ProductImageList = ProductsImageViewSet.as_view({'get': 'list', 'post': 'create'})

ProductImageMethods = ProductsImageViewSet.as_view({'get': 'retrieve', 'put': 'update', 'patch': 'partial_update', 'delete': 'destroy'})

ProductComment = ProductsCommentsViewSet.as_view({'get': 'list', 'post': 'create'})

ProductCommentMethods = ProductsCommentsViewSet.as_view({'get': 'retrieve', 'put': 'update'})

urlpatterns = [
    url(r'^users/$', UserView),
    url(r'^users/(?P<mail>\D+)/$', UserViewMethods),
    url(r'^products/$', ProductList, name="list_prods"),
    url(r'^orders/$', OrdersList),
    url(r'^orders/(?P<pk>[0-9]+)$', OrdersListMethods),
    url(r'^details/(?P<pk>[0-9]+)/$', ProductMethods),
    url(r'^edit/(?P<pk>[0-9]+)$', ProductMethods),
    url(r'^delete/(?P<pk>[0-9]+)$', ProductMethods),
    url(r'^comment/$', ProductComment),
    url(r'^comment/(?P<pk>[0-9]+)$', ProductCommentMethods),
    url(r'^pictures/$', ProductImageList),
    url(r'^pictures/(?P<pk>[0-9]+)/$', ProductImageMethods),
]
