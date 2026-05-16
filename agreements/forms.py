from django import forms
from .models import CarrierAgreement


class CarrierInfoForm(forms.ModelForm):
    class Meta:
        model = CarrierAgreement
        fields = [
            'carrier_name',
            'carrier_usdot_number',
        
            'carrier_phone',
            'agreement_date'
        ]
        widgets = {
            'carrier_name': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Enter Carrier Name'}),
            'carrier_usdot_number': forms.NumberInput(attrs={'class': 'form-control', 'placeholder': 'USDOT Number'}),
            'carrier_phone': forms.NumberInput(attrs={'class': 'form-control', 'placeholder': 'Carrier Phone Number'}),
            'agreement_date': forms.DateInput(attrs={'type': 'date', 'class': 'form-control'}),
        }

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        for field in self.fields.values():
            field.required = True


class BankingForm(forms.ModelForm):
    ACCOUNT_CHOICES = [
        ('Checking', 'Checking'),
        ('Savings', 'Savings'),
        ('Business', 'Business'),
    ]
    account_type = forms.ChoiceField(
        choices=ACCOUNT_CHOICES,
        required=True,  # ✅ make required
        widget=forms.Select(attrs={'class': 'form-select'})
    )

    class Meta:
        model = CarrierAgreement
        fields = ['bank_name', 'account_number', 'account_type']
        widgets = {
            'bank_name': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Bank Name'}),
            'account_number': forms.NumberInput(attrs={'class': 'form-control', 'placeholder': 'Account Number'}),
        }

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        for field in self.fields.values():
            field.required = True


class TermsForm(forms.ModelForm):
    accepted_terms = forms.BooleanField(
        required=True,
        widget=forms.CheckboxInput(attrs={'class': 'form-check-input'})
    )

    class Meta:
        model = CarrierAgreement
        fields = ['accepted_terms']


class SignForm(forms.ModelForm):
    deposit_method = forms.ChoiceField(
        choices=[
            ('Zelle', 'Zelle'),
            ('CashApp', 'CashApp'),
            ('PayPal', 'PayPal'),
            ('Venmo', 'Venmo'),
            ('Chime', 'Chime')
        ],
        required=True,  # ✅ make required
        widget=forms.Select(attrs={'class': 'form-select'})
    )

    class Meta:
        model = CarrierAgreement
        fields = [
            'signer_full_name',
            'signer_title',
            'signer_email',
            'signature_text',
            'deposit_method', 
             
        ]
        widgets = {
            'signer_full_name': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Full Name'}),
            'signer_title': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Your Title or Position'}),
            'signer_email': forms.EmailInput(attrs={'class': 'form-control', 'placeholder': 'Email Address'}),
            'signature_text': forms.TextInput(attrs={
                'class': 'form-control',
                'placeholder': 'Type your full name as signature'
            }),
        }

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        for field in self.fields.values():
            field.required = True
