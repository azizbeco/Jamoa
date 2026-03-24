from django.urls import path
from django.contrib.auth import views as auth_views
from . import views

urlpatterns = [
    path('register/', views.register, name='register'),
    path('api/register/', register_user, name='api_register'),
    path('api/check-availability/', views.check_availability, name='check_availability'),
]
