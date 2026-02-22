from django.contrib import admin
from .models import Post, Team, Tournament, Game, Comment, Notification

@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    list_display = ('author', 'post', 'text_preview', 'created_at')
    search_fields = ('text', 'author__username')
    def text_preview(self, obj):
        return obj.text[:50]
    text_preview.short_description = 'Text'

@admin.register(Notification)
class NotificationAdmin(admin.ModelAdmin):
    list_display = ('recipient', 'actor', 'notif_type', 'is_read', 'created_at')
    list_filter = ('notif_type', 'is_read')

@admin.register(Game)
class GameAdmin(admin.ModelAdmin):
    list_display = ('name', 'icon', 'color', 'created_at')
    search_fields = ('name',)

@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ('author', 'game', 'post_type', 'created_at')
    list_filter = ('game', 'post_type', 'created_at')
    search_fields = ('content', 'author__username')

@admin.register(Team)
class TeamAdmin(admin.ModelAdmin):
    list_display = ('name', 'game', 'leader', 'created_at')
    list_filter = ('game', 'created_at')
    search_fields = ('name', 'leader__username', 'game__name')

@admin.register(Tournament)
class TournamentAdmin(admin.ModelAdmin):
    list_display = ('name', 'date', 'status')
    list_filter = ('date', 'status')
    search_fields = ('name', 'description')
    date_hierarchy = 'date'
    ordering = ('-date',)
