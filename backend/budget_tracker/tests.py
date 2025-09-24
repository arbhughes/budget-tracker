from django.test import TestCase
from .models import Campaign


# TODO Expand test coverage
# TODO Make tests run in github action
class CampaignModelTest(TestCase):
    def test_status_on_track(self):
        c = Campaign.objects.create(name="Test", budget=100, spend=95)
        self.assertEqual(c.status, "On track")
