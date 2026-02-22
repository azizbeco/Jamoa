from django.db import models
from django.conf import settings

class Game(models.Model):
    name = models.CharField(max_length=100, unique=True)
    icon = models.CharField(max_length=10, help_text="Emoji icon", default="🎮")
    color = models.CharField(max_length=20, help_text="CSS color", default="#3b82f6")
    team_size = models.PositiveIntegerField(default=1, help_text="Number of players per team for this game")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

class Post(models.Model):
    POST_TYPES = [
        ('team_seeking', 'Looking for Team'),
        ('player_seeking', 'Looking for Player'),
        ('general', 'General'),
    ]

    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='posts')
    game = models.ForeignKey(Game, on_delete=models.SET_NULL, null=True, blank=True, related_name='posts')
    content = models.TextField()
    post_type = models.CharField(max_length=20, choices=POST_TYPES, default='general')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.author.username}: {self.content[:30]}..."

    @property
    def likes_count(self):
        return self.likes.count()

    @property
    def comments_count(self):
        return self.comments.count()

class Like(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='likes')
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='likes')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'post')

class Comment(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='comments')
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='comments')
    parent = models.ForeignKey('self', on_delete=models.CASCADE, null=True, blank=True, related_name='replies')
    text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Comment by {self.author.username} on {self.post.id}"

class Notification(models.Model):
    NOTIFICATION_TYPES = [
        ('like', 'Like'),
        ('comment', 'Comment'),
    ]

    recipient = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='notifications')
    actor = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE, null=True, blank=True)
    comment = models.ForeignKey(Comment, on_delete=models.CASCADE, null=True, blank=True)
    notif_type = models.CharField(max_length=20, choices=NOTIFICATION_TYPES)
    is_read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

class Team(models.Model):
    name = models.CharField(max_length=100)
    slug = models.SlugField(unique=True, null=True, blank=True, help_text="Unique team username (e.g. @og_team)")
    image = models.ImageField(upload_to='team_logos/', null=True, blank=True)
    game = models.ForeignKey(Game, on_delete=models.CASCADE, related_name='teams')
    leader = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='led_teams')
    members = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='teams', blank=True)
    description = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

class Tournament(models.Model):
    STATUS_CHOICES = [
        ('upcoming', 'Upcoming'),
        ('ongoing', 'Ongoing'),
        ('finished', 'Finished'),
    ]

    name = models.CharField(max_length=200)
    game = models.ForeignKey(Game, on_delete=models.CASCADE, related_name='tournaments', null=True, blank=True)
    image = models.ImageField(upload_to='tournament_banners/', null=True, blank=True)
    description = models.TextField()
    prize_pool = models.CharField(max_length=100, blank=True, help_text="e.g. $1000 or Gaming Gear")
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='upcoming')
    max_participants = models.PositiveIntegerField(default=0, help_text="0 for unlimited")
    date = models.DateTimeField()

    def __str__(self):
        return self.name

class TournamentRegistration(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('approved', 'Approved'),
        ('cancelled', 'Cancelled'),
    ]

    tournament = models.ForeignKey(Tournament, on_delete=models.CASCADE, related_name='registrations')
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='tournament_registrations')
    team = models.ForeignKey(Team, on_delete=models.SET_NULL, null=True, blank=True, related_name='registrations')
    is_solo = models.BooleanField(default=False)
    virtual_team_id = models.PositiveIntegerField(null=True, blank=True, help_text="Internal ID for grouping solo players")
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='approved')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('tournament', 'user')

    def __str__(self):
        return f"{self.user.username} in {self.tournament.name}"
