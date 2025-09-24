from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter

# TODO make sure import works when packaging with Docker
from budget_tracker.views import CampaignViewSet

router = DefaultRouter()
router.register(prefix='campaigns', viewset=CampaignViewSet, basename='campaign')

urlpatterns = [
    path('admin/', admin.site.urls, name='admin'),
    path('api/', include(router.urls)),
]
