from django.db import models

class CarrierAgreement(models.Model):
    # Carrier Info
    carrier_name = models.CharField(max_length=255)
    carrier_usdot_number = models.CharField(max_length=50, blank=True, null=True)
    carrier_usdot_mc = models.CharField(max_length=50, blank=True, null=True)
    carrier_phone = models.CharField(max_length=20, blank=True, null=True)
    agreement_date = models.DateField()

    # Banking Info
    bank_name = models.CharField(max_length=255, blank=True, null=True)
    account_number = models.CharField(max_length=50, blank=True, null=True)
    account_type = models.CharField(max_length=50, blank=True, null=True)

    # Signatory Info
    signer_full_name = models.CharField(max_length=255, blank=True, null=True)
    signer_title = models.CharField(max_length=255, blank=True, null=True)
    signer_email = models.EmailField(blank=True, null=True)
    signature_text = models.CharField(max_length=1024, blank=True, null=True)

    # Deposit Method
    deposit_method = models.CharField(max_length=100, blank=True, null=True)

    # Terms & Metadata
    accepted_terms = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.carrier_name} ({self.carrier_usdot_mc or 'N/A'})"
