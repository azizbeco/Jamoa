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
    list_display = ('author', 'game', 'post_type', 'likes_count_display', 'comments_count_display', 'created_at')
    list_filter = ('game', 'post_type', 'created_at')
    search_fields = ('content', 'author__username')

    def likes_count_display(self, obj):
        return obj.likes_count
    likes_count_display.short_description = 'Likes'

    def comments_count_display(self, obj):
        return obj.comments_count
    comments_count_display.short_description = 'Comments'


@admin.register(Team)
class TeamAdmin(admin.ModelAdmin):
    list_display = ('name', 'game', 'leader', 'member_count', 'created_at')
    list_filter = ('game', 'created_at')
    search_fields = ('name', 'leader__username', 'game__name')

    def member_count(self, obj):
        return obj.members.count()
    member_count.short_description = 'Members'


@admin.register(Tournament)
class TournamentAdmin(admin.ModelAdmin):
    list_display = ('name', 'date', 'description_preview')
    list_filter = ('date',)
    search_fields = ('name', 'description')
    date_hierarchy = 'date'
    ordering = ('-date',)
    
    def description_preview(self, obj):
        return obj.description[:50] + '...' if len(obj.description) > 50 else obj.description
    description_preview.short_description = 'Description'
