from django.db import models
from django.contrib.auth.models import AbstractUser

from django.db.models.signals import post_save
from django.dispatch import receiver

class User(AbstractUser):
    email = models.EmailField(unique=True)

    def __str__(self):
        return self.username

class Profile(models.Model):
    SKILL_LEVEL_CHOICES = [
        ('beginner', 'Beginner'),
        ('semi_pro', 'Semi-Pro'),
        ('pro', 'Pro'),
    ]

    GAME_ROLE_CHOICES = [
        ('sniper', 'Sniper'),
        ('support', 'Support'),
        ('rusher', 'Rusher'),
        ('igl', 'IGL'), # In-Game Leader
        ('all_rounder', 'All Rounder'),
    ]

    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    nickname = models.CharField(max_length=50, blank=True)
    bio = models.TextField(blank=True)
    game_role = models.CharField(max_length=20, choices=GAME_ROLE_CHOICES, blank=True)
    skill_level = models.CharField(max_length=20, choices=SKILL_LEVEL_CHOICES, default='beginner')
    favorite_games = models.ManyToManyField('core.Game', blank=True, related_name='favorited_by')
    contact_info = models.CharField(max_length=100, blank=True)

    def __str__(self):
        return f"{self.user.username}'s Profile"

@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.get_or_create(user=instance)

@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    if hasattr(instance, 'profile'):
        instance.profile.save()
