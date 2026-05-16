from django.urls import path
from . import views
from django.conf import settings
from django.conf.urls.static import static

app_name = 'agreements'

urlpatterns = [
    path('carrier/', views.carrier_info, name='carrier_info'),
    path('conditions/', views.conditions, name='conditions'),
    path('sign/', views.sign, name='sign'),
    path('preview/', views.preview, name='preview'),
    path('done/', views.done, name='done'),
    path('agreement/pdf/<int:pk>/', views.agreement_pdf, name='agreement_pdf'),
    
    path('', views.index, name='home'),
    path('about/', views.about, name='about'),
    path('contact/', views.contact, name='contact'),
    path('service1/', views.service1, name='service1'),
    path('service2/', views.service2, name='service2'),
    path('service3/', views.service3, name='service3'),
    path('service4/', views.service4, name='service4'),
    path('payments/', views.payments, name='payments'),


]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)