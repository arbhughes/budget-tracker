from rest_framework import serializers
from .models import Campaign


# TODO could I have some form of HiddenField with created_by or similar?
class CampaignSerializer(serializers.ModelSerializer):
    """
        Serialises Campaign model instances into JSON and validates input data.
        """

    status = serializers.ReadOnlyField()

    class Meta:
        model = Campaign
        fields = ["id", "name", "budget", "spend", "status"]
