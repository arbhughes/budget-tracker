from rest_framework import viewsets
from .models import Campaign
from .serializers import CampaignSerializer


class CampaignViewSet(viewsets.ModelViewSet):
    """
    Provides API actions for Campaign objects:
    - list existing campaigns
    - create new campaigns
    """

    queryset = Campaign.objects.all()
    serializer_class = CampaignSerializer
