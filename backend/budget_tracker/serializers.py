from rest_framework import serializers
from .models import Campaign


class CampaignSerializer(serializers.ModelSerializer):
    """
        Serialises Campaign model instances into JSON and validates input data.
        """

    status = serializers.ReadOnlyField()

    class Meta:
        model = Campaign
        fields = ["id", "name", "budget", "spend", "status"]
