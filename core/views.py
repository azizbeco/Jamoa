from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.decorators import login_required
from django.db.models import Count, Q, Max
from django.contrib.auth import get_user_model
from django.http import JsonResponse
from .models import Post, Team, Tournament, Game, Like, Comment, Notification, TournamentRegistration
from .forms import PostForm, TeamForm

User = get_user_model()

def home(request):
    game_id = request.GET.get('game', None)
    show_all = request.GET.get('all_games', False)
    
    posts = Post.objects.all().prefetch_related('likes', 'comments')
    current_game = None
    
    if game_id:
        try:
            current_game = Game.objects.get(id=game_id)
            posts = posts.filter(game=current_game)
        except (Game.DoesNotExist, ValueError):
            pass
            
    posts = posts.order_by('-created_at')
    
    # Post creation
    if request.method == 'POST' and request.user.is_authenticated:
        form = PostForm(request.POST)
        if form.is_valid():
            post = form.save(commit=False)
            post.author = request.user
            post.save()
            return redirect('home')
    else:
        form = PostForm()
    
    # Sidebar Optimization
    top_games = Game.objects.annotate(post_count=Count('posts')).order_by('-post_count')[:3]
    
    if request.user.is_authenticated:
        if hasattr(request.user, 'profile'):
            fav_games = request.user.profile.favorite_games.all()
            # Combine user games + top games, removing duplicates
            display_games = (fav_games | top_games).distinct()
        else:
            display_games = top_games
    else:
        display_games = top_games

    if show_all:
        display_games = Game.objects.all().order_by('name')

    tournaments = Tournament.objects.all().order_by('date')[:3]
    
    # Notifications for current user
    notifications = []
    unread_count = 0
    if request.user.is_authenticated:
        notifications = Notification.objects.filter(recipient=request.user, is_read=False)[:5]
        unread_count = Notification.objects.filter(recipient=request.user, is_read=False).count()

    context = {
        'posts': posts,
        'form': form,
        'tournaments': tournaments,
        'display_games': display_games,
        'all_games_count': Game.objects.count(),
        'current_game': current_game,
        'show_all': show_all,
        'notifications': notifications,
        'unread_count': unread_count
    }
    return render(request, 'core/home.html', context)

@login_required
def like_post(request, post_id):
    post = get_object_or_404(Post, id=post_id)
    like, created = Like.objects.get_or_create(user=request.user, post=post)
    
    if not created:
        like.delete()
    else:
        # Notify author
        if post.author != request.user:
            Notification.objects.create(
                recipient=post.author,
                actor=request.user,
                post=post,
                notif_type='like'
            )
            
    return redirect(request.META.get('HTTP_REFERER', 'home'))

@login_required
def add_comment(request, post_id):
    if request.method == 'POST':
        post = get_object_or_404(Post, id=post_id)
        text = request.POST.get('text')
        parent_id = request.POST.get('parent_id')
        if text:
            parent = None
            if parent_id:
                try:
                    parent = Comment.objects.get(id=parent_id)
                except Comment.DoesNotExist:
                    pass
            
            comment = Comment.objects.create(post=post, author=request.user, text=text, parent=parent)
            # Notify author
            if post.author != request.user:
                Notification.objects.create(
                    recipient=post.author,
                    actor=request.user,
                    post=post,
                    comment=comment,
                    notif_type='comment'
                )
    return redirect(request.META.get('HTTP_REFERER', 'home'))

@login_required
def mark_read(request, notif_id):
    notif = get_object_or_404(Notification, id=notif_id, recipient=request.user)
    notif.is_read = True
    notif.save()
    if notif.post:
        return redirect('post_detail', post_id=notif.post.id)
    return redirect(request.META.get('HTTP_REFERER', 'home'))

def post_detail(request, post_id):
    post = get_object_or_404(Post.objects.prefetch_related('likes', 'comments'), id=post_id)
    
    # Notifications for header (repeated for now, better as context processor later)
    notifications = []
    unread_count = 0
    if request.user.is_authenticated:
        notifications = Notification.objects.filter(recipient=request.user, is_read=False)[:5]
        unread_count = Notification.objects.filter(recipient=request.user, is_read=False).count()

    context = {
        'post': post,
        'notifications': notifications,
        'unread_count': unread_count,
    }
    return render(request, 'core/post_detail.html', context)

# ... (rest of the views) ...

@login_required
def create_team(request):
    if request.method == 'POST':
        form = TeamForm(request.POST, request.FILES)
        if form.is_valid():
            team = form.save(commit=False)
            team.leader = request.user
            team.save()
            team.members.add(request.user)
            return redirect('team_detail', team_id=team.id)
    else:
        form = TeamForm()
    return render(request, 'core/create_team.html', {'form': form})

def team_list(request):
    teams = Team.objects.all().order_by('-created_at')
    return render(request, 'core/team_list.html', {'teams': teams})

def team_detail(request, team_id):
    team = get_object_or_404(Team, id=team_id)
    return render(request, 'core/team_detail.html', {'team': team})

@login_required
def join_team(request, team_id):
    team = get_object_or_404(Team, id=team_id)
    team.members.add(request.user)
    return redirect('team_detail', team_id=team.id)

def tournament_list(request):
    tournaments = Tournament.objects.all().select_related('game').order_by('date')
    
    # Pre-render Tournament Cards HTML
    cards_html = ""
    for t in tournaments:
        banner_html = f'<img src="{t.image.url}" class="banner-img">' if t.image else f'<div style="width:100%; height:100%; background: linear-gradient(135deg, {t.game.color}33, #000);"></div>'
        status_display = t.get_status_display()
        prize = t.prize_pool or "Glory"
        date_str = t.date.strftime("%b %d")
        detail_url = f"/tournaments/{t.id}/"
        
        cards_html += f"""
        <div class="tournament-card">
            <div class="banner-box">
                <span class="status-badge status-{t.status}">{status_display}</span>
                {banner_html}
            </div>
            <div class="info-area">
                <span class="game-name" style="color: {t.game.color}">{t.game.icon} {t.game.name}</span>
                <h3 class="tourney-name">{t.name}</h3>
                <div class="meta-row">
                    <span class="prize-val">🏆 {prize}</span>
                    <span class="date-val">📅 {date_str}</span>
                </div>
            </div>
            <a href="{detail_url}" class="view-btn">View Tournament</a>
        </div>
        """

    if not tournaments:
        cards_html = """
        <div style="grid-column: 1 / -1; text-align:center; padding: 80px 20px; background:rgba(255,255,255,0.01); border-radius:24px; border: 1px dashed #222;">
            <div style="font-size:48px; margin-bottom:16px;">🏆</div>
            <h2 style="color:#fff; margin-bottom:8px;">No tournaments scheduled</h2>
            <p style="color:#475569;">Check back later for upcoming events!</p>
        </div>
        """

    context = {
        'tournament_cards_html': cards_html,
    }
    return render(request, 'core/tournament_list.html', context)

def tournament_detail(request, tournament_id):
    tournament = get_object_or_404(Tournament, id=tournament_id)
    registrations = tournament.registrations.all().select_related('user', 'team')
    
    # 1. Pre-format Tournament Stats
    stats = {
        'date': tournament.date.strftime("%d %b, %Y"),
        'time': tournament.date.strftime("%H:%M"),
        'prize': tournament.prize_pool or "Shon-sharaf",
        'status': tournament.get_status_display(),
        'game_name': tournament.game.name if tournament.game else "Noma'lum O'yin",
        'game_icon': tournament.game.icon if tournament.game else "🎮",
        'game_color': tournament.game.color if tournament.game and tournament.game.color else "#3b82f6",
        'banner_url': tournament.image.url if tournament.image else None,
    }
    
    # 2. Participants List Pre-rendering
    team_groups = {}
    virtual_groups = {}
    for reg in registrations:
        if reg.team:
            if reg.team.id not in team_groups:
                team_groups[reg.team.id] = {'team': reg.team, 'members': []}
            team_groups[reg.team.id]['members'].append(reg.user.username)
        elif reg.virtual_team_id:
            if reg.virtual_team_id not in virtual_groups: virtual_groups[reg.virtual_team_id] = []
            virtual_groups[reg.virtual_team_id].append(reg.user.username)
        else:
            if 0 not in virtual_groups: virtual_groups[0] = []
            virtual_groups[0].append(reg.user.username)

    participants_html = ""
    for t_data in team_groups.values():
        team = t_data['team']
        img_html = f'<img src="{team.image.url}" style="width:100%;height:100%;object-fit:cover;">' if team.image else team.name[0]
        m_names = ", ".join(t_data['members'])
        participants_html += f"""
        <div class="p-item">
            <div class="p-icon">{img_html}</div>
            <div style="flex:1;"><div class="p-name">{team.name}</div><div class="p-meta">{m_names}</div></div>
            <span class="p-badge" style="color: {stats['game_color']};">TEAM</span>
        </div>"""

    team_size = tournament.game.team_size if tournament.game else 1
    for v_id, players in virtual_groups.items():
        if v_id == 0: continue
        p_names = ", ".join(players)
        needed = team_size - len(players)
        display_text = p_names + (f" (Yana {needed} kishi kerak)" if needed > 0 else "")
        participants_html += f"""
        <div class="p-item">
            <div class="p-icon" style="background: rgba(255,255,255,0.05);">V{v_id}</div>
            <div style="flex:1;"><div class="p-name">Solo Squad #{v_id}</div><div class="p-meta">{display_text}</div></div>
            <span class="p-badge" style="color: #34d399;">SOLO</span>
        </div>"""

    if not participants_html:
        participants_html = """<div style="text-align:center; padding:40px; color:#475569;"><i class="fas fa-users-slash" style="font-size:32px; margin-bottom:16px; display:block;"></i>Hozircha hech kim yo'q.</div>"""

    # 3. Registration Widget & Modal Rendering
    user_reg = registrations.filter(user=request.user).first() if request.user.is_authenticated else None
    user_led_teams = Team.objects.filter(leader=request.user, game=tournament.game) if request.user.is_authenticated else []
    
    if user_reg:
        reg_widget_html = """<div style="padding:18px; border-radius:16px; background:rgba(52,211,153,0.1); color:#34d399; font-weight:900; border:1px solid rgba(52,211,153,0.2);">✓ TASDIQLANGAN</div>"""
    else:
        reg_widget_html = """<button class="reg-btn reg-btn-primary" onclick="document.getElementById('reg-modal').classList.add('active-modal')">QO'SHILISH</button>"""

    # Modal Select Pre-rendering
    team_select_html = ""
    if user_led_teams:
        options = "".join([f'<option value="{t.id}">{t.name}</option>' for t in user_led_teams])
        team_select_html = f"""
        <div style="margin-bottom:24px;">
            <label class="modal-label">Jamoaviy</label>
            <select name="team_id" class="custom-select">{options}</select>
            <button type="submit" name="reg_type" value="team" class="reg-btn reg-btn-primary" style="margin-top:10px;">Jamoa bilan qo'shilish</button>
        </div>"""
    else:
        team_select_html = """<div style="margin-bottom:24px;"><label class="modal-label">Jamoaviy</label><div class="none-box">Sizda jamoa yo'q.</div></div>"""

    # 1. Pre-render Hero & Stats Row
    banner_html = f'<img src="{tournament.image.url}" class="arena-banner">' if tournament.image else ""
    
    stats_row_html = f"""
    <div class="arena-badge-row">
        <span class="arena-badge" style="color: {stats['game_color']};"><i class="fas fa-gamepad"></i> {stats['game_name']}</span>
        <span class="arena-badge" style="color: #fbbf24;"><i class="fas fa-trophy"></i> {stats['prize']}</span>
        <span class="arena-badge" style="color: #34d399;"><i class="fas fa-circle"></i> {stats['status']}</span>
    </div>"""

    sidebar_stats_html = f"""
    <div class="stat-item"><span class="stat-label">Sana</span><span class="stat-value">{stats['date']}</span></div>
    <div class="stat-item"><span class="stat-label">Vaqt</span><span class="stat-value">{stats['time']} UTC</span></div>
    <div class="stat-item"><span class="stat-label">Ishtirokchilar</span><span class="stat-value">{tournament.max_participants or "Cheksiz"}</span></div>
    <div class="stat-item" style="margin-bottom:0;"><span class="stat-label">Mukofot Jamg'armasi</span><span class="stat-value" style="color:#fbbf24;">{stats['prize']}</span></div>"""

    context = {
        'game_color': stats['game_color'],
        'tournament_name': tournament.name,
        'tournament_description': tournament.description,
        'banner_html': banner_html,
        'stats_row_html': stats_row_html,
        'sidebar_stats_html': sidebar_stats_html,
        'participants_list_html': participants_html,
        'reg_widget_html': reg_widget_html,
        'team_select_html': team_select_html,
        'reg_message': "✅ Siz ro'yxatdan o'tgansiz!" if user_reg else "Hozir ro'yxatdan o'ting!",
        'tournament_id': tournament.id,
    }
    return render(request, 'core/tournament_detail.html', context)

@login_required
def register_tournament(request, tournament_id):
    tournament = get_object_or_404(Tournament, id=tournament_id)
    reg_type = request.POST.get('reg_type') # 'solo' or 'team'
    
    if TournamentRegistration.objects.filter(tournament=tournament, user=request.user).exists():
        return redirect('tournament_detail', tournament_id=tournament.id)

    if reg_type == 'solo':
        # Find a virtual team that isn't full yet
        team_size = tournament.game.team_size if tournament.game else 1
        
        if team_size > 1:
            # Find the highest existing virtual_team_id
            last_v_id = TournamentRegistration.objects.filter(
                tournament=tournament, is_solo=True
            ).aggregate(Max('virtual_team_id'))['virtual_team_id__max'] or 0
            
            # Count members in the current last virtual team
            current_v_count = TournamentRegistration.objects.filter(
                tournament=tournament, virtual_team_id=last_v_id
            ).count()
            
            if last_v_id == 0 or current_v_count >= team_size:
                v_id = last_v_id + 1
            else:
                v_id = last_v_id
        else:
            v_id = None # Individual game
            
        TournamentRegistration.objects.create(
            tournament=tournament,
            user=request.user,
            is_solo=True,
            virtual_team_id=v_id
        )
        
    elif reg_type == 'team':
        team_id = request.POST.get('team_id')
        team = get_object_or_404(Team, id=team_id, leader=request.user)
        
        # Register all members
        for member in team.members.all():
            TournamentRegistration.objects.get_or_create(
                tournament=tournament,
                user=member,
                defaults={'team': team, 'is_solo': False}
            )
            
    return redirect('tournament_detail', tournament_id=tournament.id)

def search(request):
    query = request.GET.get('q', '')
    teams = []
    players = []
    tournaments = []
    
    if query:
        teams = Team.objects.filter(
            Q(name__icontains=query) | Q(slug__icontains=query)
        ).select_related('game')
        
        players = User.objects.filter(
            Q(username__icontains=query) | Q(profile__bio__icontains=query)
        ).select_related('profile')
        
        tournaments = Tournament.objects.filter(
            Q(name__icontains=query) | Q(description__icontains=query)
        ).select_related('game')

    # Header common data
    notifications = []
    unread_count = 0
    if request.user.is_authenticated:
        notifications = Notification.objects.filter(recipient=request.user, is_read=False)[:5]
        unread_count = Notification.objects.filter(recipient=request.user, is_read=False).count()

    context = {
        'query': query,
        'teams': teams,
        'players': players,
        'tournaments': tournaments,
        'notifications': notifications,
        'unread_count': unread_count,
    }
    return render(request, 'core/search_results.html', context)

def search_suggestions(request):
    query = request.GET.get('q', '')
    if not query or len(query) < 2:
        return JsonResponse({'teams': [], 'players': []})
    
    teams = Team.objects.filter(
        Q(name__icontains=query) | Q(slug__icontains=query)
    ).select_related('game')[:5]
    
    players = User.objects.filter(
        Q(username__icontains=query)
    )[:5]
    
    team_data = [{
        'id': t.id,
        'name': t.name,
        'slug': t.slug,
        'game_icon': t.game.icon,
        'image_url': t.image.url if t.image else None
    } for t in teams]
    
    player_data = [{
        'id': p.id,
        'username': p.username,
        'avatar_url': f"https://ui-avatars.com/api/?name={p.username}&background=1e293b&color=fff"
    } for p in players]
    
    return JsonResponse({
        'teams': team_data,
        'players': player_data
    })

@login_required
def edit_team(request, team_id):
    team = get_object_or_404(Team, id=team_id)
    if team.leader != request.user:
        return redirect('team_detail', team_id=team.id)
    
    if request.method == 'POST':
        form = TeamForm(request.POST, request.FILES, instance=team)
        if form.is_valid():
            form.save()
            return redirect('team_detail', team_id=team.id)
    else:
        form = TeamForm(instance=team)
    
    return render(request, 'core/edit_team.html', {'form': form, 'team': team})

@login_required
def delete_team(request, team_id):
    team = get_object_or_404(Team, id=team_id)
    if team.leader == request.user:
        team.delete()
        return redirect('team_list')
    return redirect('team_detail', team_id=team.id)

from django.http import JsonResponse

@login_required
def edit_post(request, post_id):
    post = get_object_or_404(Post, id=post_id)
    if post.author != request.user:
        if request.headers.get('x-requested-with') == 'XMLHttpRequest':
            return JsonResponse({'success': False, 'error': 'Ruxsat berilmagan'}, status=403)
        return redirect('home')
    
    if request.method == 'POST':
        # Handle AJAX Inline Edit (Partial Update)
        if request.headers.get('x-requested-with') == 'XMLHttpRequest':
            new_content = request.POST.get('content')
            if new_content and new_content.strip():
                post.content = new_content
                post.save()
                return JsonResponse({
                    'success': True, 
                    'message': 'Post yangilandi! ✅',
                    'content': post.content
                })
            return JsonResponse({'success': False, 'error': 'Matn bo\'sh bo\'lishi mumkin emas'}, status=400)

        # Handle Regular Form Submission (Full Update)
        form = PostForm(request.POST, instance=post)
        if form.is_valid():
            form.save()
            messages.success(request, 'Post yangilandi! ✅')
            return redirect('profile')
    else:
        form = PostForm(instance=post)
    return render(request, 'core/edit_post.html', {'form': form, 'post': post})

@login_required
def delete_post(request, post_id):
    post = get_object_or_404(Post, id=post_id)
    if post.author == request.user:
        post.delete()
        if request.headers.get('x-requested-with') == 'XMLHttpRequest':
            return JsonResponse({'success': True, 'message': 'Post o\'chirildi! 🗑️'})
        messages.success(request, 'Post o\'chirildi! 🗑️')
    return redirect('profile')

@login_required
def add_team_member(request, team_id):
    team = get_object_or_404(Team, id=team_id)
    if team.leader != request.user:
        return redirect('team_detail', team_id=team.id)
    
    if request.method == 'POST':
        username = request.POST.get('username')
        if username:
            try:
                user_to_add = User.objects.get(username=username)
                team.members.add(user_to_add)
            except User.DoesNotExist:
                pass # Later we can add a message
    return redirect('team_detail', team_id=team.id)
