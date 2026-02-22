from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from core.models import Post, Team, Tournament
from users.models import Profile
from django.utils import timezone
import random

User = get_user_model()

class Command(BaseCommand):
    help = 'Populates the database with dummy data'

    def handle(self, *args, **kwargs):
        self.stdout.write('Creating data...')
        
        # Create Users
        users = []
        for i in range(5):
            username = f'gamer{i}'
            if not User.objects.filter(username=username).exists():
                user = User.objects.create_user(username=username, password='password123')
                Profile.objects.create(
                    user=user, 
                    nickname=f'ProGamer{i}', 
                    bio='Just a gamer', 
                    game_role=random.choice(['sniper', 'rusher', 'support']),
                    skill_level=random.choice(['beginner', 'semi_pro', 'pro'])
                )
                users.append(user)
                self.stdout.write(f'Created user {username}')
            else:
                users.append(User.objects.get(username=username))

        # Create Posts
        for i in range(10):
            Post.objects.create(
                author=random.choice(users),
                content=f'Looking for a team for tournament #{i}',
                post_type=random.choice(['team_seeking', 'player_seeking', 'general'])
            )
        self.stdout.write('Created posts')

        # Create Teams
        for i in range(3):
            leader = users[i]
            team = Team.objects.create(
                name=f'Team {i}',
                game='CS2',
                leader=leader,
                description='We are the best!'
            )
            team.members.add(leader)
            team.members.add(users[i+1])
        self.stdout.write('Created teams')

        # Create Tournaments
        for i in range(3):
            Tournament.objects.create(
                name=f'Mega Tournament {i}',
                description='Big prize pool!',
                date=timezone.now() + timezone.timedelta(days=i*10)
            )
        self.stdout.write('Created tournaments')
        
        self.stdout.write(self.style.SUCCESS('Successfully populated database'))
