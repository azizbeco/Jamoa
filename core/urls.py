from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('like/<int:post_id>/', views.like_post, name='like_post'),
    path('comment/<int:post_id>/', views.add_comment, name='add_comment'),
    path('notif/read/<int:notif_id>/', views.mark_read, name='mark_read'),
    path('post/<int:post_id>/', views.post_detail, name='post_detail'),
    path('teams/', views.team_list, name='team_list'),
    path('teams/create/', views.create_team, name='create_team'),
    path('teams/<int:team_id>/', views.team_detail, name='team_detail'),
    path('teams/<int:team_id>/join/', views.join_team, name='join_team'),
    path('tournaments/', views.tournament_list, name='tournament_list'),
    path('tournaments/<int:tournament_id>/', views.tournament_detail, name='tournament_detail'),
    path('search/', views.search, name='search'),
    path('search/suggestions/', views.search_suggestions, name='search_suggestions'),
    path('teams/<int:team_id>/edit/', views.edit_team, name='edit_team'),
    path('teams/<int:team_id>/delete/', views.delete_team, name='delete_team'),
    path('teams/<int:team_id>/add-member/', views.add_team_member, name='add_team_member'),
    path('tournaments/<int:tournament_id>/register/', views.register_tournament, name='register_tournament'),
    path('post/<int:post_id>/edit/', views.edit_post, name='edit_post'),
    path('post/<int:post_id>/delete/', views.delete_post, name='delete_post'),
]
