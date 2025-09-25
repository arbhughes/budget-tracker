from django.test import TestCase
from .models import Campaign


class CampaignModelTest(TestCase):
    def test_status_on_track(self):
        """Test that status is 'On track' when spend is between 90% and 110% of budget."""
        on_track_campaign = Campaign.objects.create(name="Test On Track", budget=100, spend=95)
        self.assertEqual(on_track_campaign.status, "On track")

        # Test upper boundary
        upper_bound_campaign = Campaign.objects.create(name="Test Upper Bound", budget=100, spend=110)
        self.assertEqual(upper_bound_campaign.status, "On track")

        # Test lower boundary
        lower_bound_campaign = Campaign.objects.create(name="Test Lower Bound", budget=100, spend=90)
        self.assertEqual(lower_bound_campaign.status, "On track")

    def test_status_overspending(self):
        """Test that status is 'Overspending' when spend is more than 110% of budget."""
        overspending_campaign = Campaign.objects.create(name="Test Overspending", budget=100, spend=110.01)
        self.assertEqual(overspending_campaign.status, "Overspending")

    def test_status_underspending(self):
        """Test that status is 'Underspending' when spend is less than 90% of budget."""
        underspending_campaign = Campaign.objects.create(name="Test Underspending", budget=100, spend=89.99)
        self.assertEqual(underspending_campaign.status, "Underspending")

    def test_string_representation(self):
        """Test the __str__ method of the Campaign model."""
        campaign = Campaign.objects.create(name="Test Campaign", budget=1000.00, spend=500.50)
        self.assertEqual(str(campaign), "Test Campaign (£500.50 / £1000.00)")
