from django.shortcuts import render, redirect, get_object_or_404
from django.db import models
from .models import User
from django.contrib.auth import login
from django.contrib.auth.decorators import login_required
from .forms import CustomUserCreationForm, ProfileForm, CustomAuthenticationForm
from .models import Profile
from django.contrib import messages
from django.http import JsonResponse

def register(request):
    if request.method == 'POST':
        form = CustomUserCreationForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user)
            messages.success(request, f"Ro'yxatdan o'tish muvaffaqiyatli! 🚀")
            return redirect('home')
        # On error, redirect back to home with a flag to open modal
        return redirect('home')
    # GET: just redirect to home where the modal can be opened
    return redirect('home')

@login_required
def profile(request, username=None):
    if username:
        user = get_object_or_404(User, username=username)
    else:
        user = request.user
        
    profile = user.profile
    is_owner = (user == request.user)
    
    if request.method == 'POST' and is_owner:
        form = ProfileForm(request.POST, instance=profile)
        if form.is_valid():
            form.save()
            messages.success(request, 'Profil muvaffaqiyatli yangilandi! ✅')
        return redirect('profile')

    # 1. Fetch Data
    from core.models import Team, TournamentRegistration, Post
    
    # Teams
    user_teams = Team.objects.filter(models.Q(leader=user) | models.Q(members=user)).distinct().select_related('game')
    
    # Tournaments
    user_regs = TournamentRegistration.objects.filter(user=user).select_related('tournament', 'tournament__game')

    # Activity (All Posts)
    user_posts = Post.objects.filter(author=user).order_by('-created_at').select_related('game').prefetch_related('likes', 'comments')

    # 4. Context Preparation
    context = {
        'profile_user': user, 
        'profile': profile,
        'user_teams': user_teams,
        'user_regs': user_regs,
        'user_posts': user_posts,
        'is_owner': is_owner,
        'skill_label': profile.skill_level.replace('_', ' ').title(),
        'form': ProfileForm(instance=profile) if is_owner else None,
    }
    return render(request, 'users/profile.html', context)

def check_availability(request):
    field = request.GET.get('field')
    value = request.GET.get('value')
    
    if field == 'username':
        exists = User.objects.filter(username__iexact=value).exists()
    elif field == 'email':
        exists = User.objects.filter(email__iexact=value).exists()
    else:
        return JsonResponse({'error': 'Invalid field'}, status=400)
        
    return JsonResponse({'available': not exists})
