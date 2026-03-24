from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Game, Post, Team, Tournament
from .serializers import GameSerializer, PostSerializer, TeamSerializer, TournamentSerializer

class GameViewSet(viewsets.ModelViewSet):
    queryset = Game.objects.all()
    serializer_class = GameSerializer
    
    def get_permissions(self):
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            return [permissions.IsAdminUser()]
        return [permissions.AllowAny()]

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

    @action(detail=True, methods=['post'], permission_classes=[permissions.IsAuthenticated])
    def join(self, request, pk=None):
        team = self.get_object()
        if team.members.filter(id=request.user.id).exists() or team.leader == request.user:
            return Response({'error': 'Already a member of this squad.'}, status=status.HTTP_400_BAD_REQUEST)
        
        team.members.add(request.user)
        return Response({'detail': 'Squad join protocol successful!'}, status=status.HTTP_200_OK)
from core.models import TournamentRegistration

class TournamentViewSet(viewsets.ModelViewSet):
    queryset = Tournament.objects.all().order_by('-date')
    serializer_class = TournamentSerializer

    def get_permissions(self):
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            return [permissions.IsAdminUser()]
        return [permissions.AllowAny()]

    @action(detail=True, methods=['post'], permission_classes=[permissions.IsAuthenticated])
    def register(self, request, pk=None):
        tournament = self.get_object()
        if TournamentRegistration.objects.filter(tournament=tournament, user=request.user).exists():
            return Response({'detail': 'Already enlisted for this operation.'}, status=status.HTTP_400_BAD_REQUEST)
        
        TournamentRegistration.objects.create(tournament=tournament, user=request.user)
        return Response({'detail': 'Enlistment confirmed!'}, status=status.HTTP_201_CREATED)
