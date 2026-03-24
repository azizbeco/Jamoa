from rest_framework import serializers
from .models import Game, Post, Team, Tournament
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

class PostSerializer(serializers.ModelSerializer):
    author = UserSerializer(read_only=True)
    game = GameSerializer(read_only=True)
    created_at_fmt = serializers.SerializerMethodField()

    class Meta:
        model = Post
        fields = ['id', 'author', 'game', 'content', 'post_type', 'created_at', 'created_at_fmt']

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
        fields = ['id', 'name', 'game', 'image', 'description', 'prize_pool', 'status', 'date']
