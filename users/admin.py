from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import User, Profile

class UserAdmin(BaseUserAdmin):
    list_display = ('username', 'email', 'is_staff', 'is_active', 'date_joined')
    list_filter = ('is_staff', 'is_active', 'date_joined')
    search_fields = ('username', 'email')
    ordering = ('-date_joined',)
    fieldsets = BaseUserAdmin.fieldsets
    add_fieldsets = BaseUserAdmin.add_fieldsets

class ProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'nickname', 'game_role', 'skill_level', 'contact_info')
    list_filter = ('game_role', 'skill_level')
    search_fields = ('user__username', 'nickname', 'bio')
    filter_horizontal = ('favorite_games',)
    
    fieldsets = (
        ('User Info', {
            'fields': ('user', 'nickname', 'bio')
        }),
        ('Gaming Profile', {
            'fields': ('game_role', 'skill_level', 'favorite_games')
        }),
        ('Contact', {
            'fields': ('contact_info',)
        }),
    )

admin.site.register(User, UserAdmin)
admin.site.register(Profile, ProfileAdmin)
