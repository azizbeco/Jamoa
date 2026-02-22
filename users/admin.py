from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import User, Profile


@admin.register(User)
class UserAdmin(BaseUserAdmin):
    list_display = ('username', 'email', 'is_staff', 'is_active', 'date_joined')
    list_filter = ('is_staff', 'is_active', 'date_joined')
    search_fields = ('username', 'email', 'first_name', 'last_name')
    ordering = ('-date_joined',)


@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'nickname', 'game_role', 'skill_level', 'contact_info')
    list_filter = ('game_role', 'skill_level')
    search_fields = ('user__username', 'nickname', 'bio', 'games_played')
    readonly_fields = ('user',)
    
    fieldsets = (
        ('User Info', {
            'fields': ('user', 'nickname', 'bio')
        }),
        ('Gaming Profile', {
            'fields': ('game_role', 'skill_level', 'games_played')
        }),
        ('Contact', {
            'fields': ('contact_info',)
        }),
    )
