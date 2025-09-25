from django.db import models
from decimal import Decimal


class Campaign(models.Model):
    """
    Represents a marketing campaign with a set budget and spend.
    Status is computed dynamically based on the spend compared to budget.
    """
    name = models.CharField(max_length=255)
    # Allow budget / spend to be decimals, they will render as integers on the frontend
    budget = models.DecimalField(max_digits=10, decimal_places=2)
    spend = models.DecimalField(max_digits=10, decimal_places=2)

    @property
    def status(self) -> str:
        """
        Derives the campaign status from spend vs budget.
        """
        if self.spend > Decimal("1.1") * self.budget:
            return "Overspending"

        if self.spend < Decimal("0.9") * self.budget:
            return "Underspending"

        return "On track"

    def __str__(self):
        return f'{self.name} (£{self.spend} / £{self.budget})'
