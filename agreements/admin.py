from django.contrib import admin
from .models import CarrierAgreement

@admin.register(CarrierAgreement)
class CarrierAgreementAdmin(admin.ModelAdmin):
    list_display = ('carrier_name','carrier_usdot_mc','agreement_date','created_at')
    search_fields = ('carrier_name','carrier_usdot_mc','signer_full_name')
