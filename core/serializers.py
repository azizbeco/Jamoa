from rest_framework import serializers
from .models import Game, Post, Team, Tournament, Like, Comment
from users.models import User, Profile

class GameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Game
        fields = ['id', 'name', 'icon', 'color']

class UserSerializer(serializers.ModelSerializer):
    avatar_url = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ['id', 'username', 'avatar_url', 'is_staff']

    def get_avatar_url(self, obj):
        # Placeholder for real avatar logic
        return f"https://ui-avatars.com/api/?name={obj.username}&background=1e293b&color=fff"

class CommentSerializer(serializers.ModelSerializer):
    author = UserSerializer(read_only=True)

    class Meta:
        model = Comment
        fields = ['id', 'author', 'text', 'created_at']

class PostSerializer(serializers.ModelSerializer):
    author = UserSerializer(read_only=True)
    game = GameSerializer(read_only=True)
    created_at_fmt = serializers.SerializerMethodField()
    likes_count = serializers.IntegerField(read_only=True)
    comments_count = serializers.IntegerField(read_only=True)
    is_liked = serializers.SerializerMethodField()

    class Meta:
        model = Post
        fields = ['id', 'author', 'game', 'content', 'post_type', 'created_at', 'created_at_fmt', 'likes_count', 'comments_count', 'is_liked']

    def get_is_liked(self, obj):
        user = self.context.get('request').user if self.context.get('request') else None
        if user and user.is_authenticated:
            return obj.likes.filter(user=user).exists()
        return False

    def get_created_at_fmt(self, obj):
        return obj.created_at.strftime("%Y-%m-%d %H:%M")

class TeamSerializer(serializers.ModelSerializer):
    leader = UserSerializer(read_only=True)
    game = GameSerializer(read_only=True)
    members = UserSerializer(many=True, read_only=True)
    members_count = serializers.IntegerField(source='members.count', read_only=True)

    class Meta:
        model = Team
        fields = ['id', 'name', 'slug', 'leader', 'game', 'image', 'description', 'created_at', 'members', 'members_count']
class TournamentSerializer(serializers.ModelSerializer):
    game = GameSerializer(read_only=True)

    class Meta:
        model = Tournament
        fields = ['id', 'name', 'game', 'image', 'description', 'prize_pool', 'status', 'max_participants', 'date']
