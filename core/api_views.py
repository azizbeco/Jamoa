from rest_framework import viewsets, permissions
from .models import Game, Post, Team, Tournament
from .serializers import GameSerializer, PostSerializer, TeamSerializer, TournamentSerializer

class GameViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Game.objects.all()
    serializer_class = GameSerializer
    permission_classes = [permissions.AllowAny]

class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all().order_by('-created_at')
    serializer_class = PostSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

class TeamViewSet(viewsets.ModelViewSet):
    queryset = Team.objects.all().order_by('-created_at')
    serializer_class = TeamSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(leader=self.request.user)
class TournamentViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Tournament.objects.all().order_by('-date')
    serializer_class = TournamentSerializer
    permission_classes = [permissions.AllowAny]
