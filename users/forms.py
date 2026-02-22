from django import forms
from django.contrib.auth.forms import UserCreationForm
from .models import User, Profile
from core.models import Game

class CustomUserCreationForm(UserCreationForm):
    nickname = forms.CharField(max_length=50, required=True, label="Gamer Nickname", help_text="Sizning o'yin dunyosidagi ismingiz")
    game_role = forms.ChoiceField(choices=Profile.GAME_ROLE_CHOICES, required=True, label="Asosiy Rolingiz")
    favorite_games = forms.ModelMultipleChoiceField(
        queryset=Game.objects.all(),
        widget=forms.CheckboxSelectMultiple,
        required=False,
        label="Sevimli O'yinlaringiz"
    )

    class Meta(UserCreationForm.Meta):
        model = User
        fields = UserCreationForm.Meta.fields + ('nickname', 'game_role', 'favorite_games')

    def clean_username(self):
        username = self.cleaned_data.get('username')
        if not username:
            return username
        
        # Length check
        if len(username) < 4:
            raise forms.ValidationError('Username kamida 4 ta belgidan iborat bo\'lishi kerak.')
        
        # Regex check: alphanumeric and underscores only
        import re
        if not re.match(r'^[a-zA-Z0-9_]+$', username):
            raise forms.ValidationError('Username faqat harf, raqam va pastki chiziqdan iborat bo\'lishi kerak.')

        # Reserved names check
        reserved_names = ['admin', 'root', 'superuser', 'teamify', 'support']
        if username.lower() in reserved_names:
            raise forms.ValidationError('Bu username band yoki taqiqlangan.')

        return username

    def save(self, commit=True):
        user = super().save(commit=False)
        user.is_staff = False
        user.is_superuser = False
        if commit:
            user.save()
            # Profile is automatically created by signal, but we update it with extra fields
            profile = user.profile
            profile.nickname = self.cleaned_data.get('nickname')
            profile.game_role = self.cleaned_data.get('game_role')
            profile.favorite_games.set(self.cleaned_data.get('favorite_games'))
            profile.save()
        return user

class ProfileForm(forms.ModelForm):
    class Meta:
        model = Profile
        fields = ['nickname', 'bio', 'game_role', 'skill_level', 'favorite_games', 'contact_info']
        widgets = {
            'nickname': forms.TextInput(attrs={'class': 'elite-input', 'placeholder': 'Gamer tag...'}),
            'bio': forms.Textarea(attrs={'class': 'elite-input', 'rows': 4, 'placeholder': 'Tell your story...'}),
            'game_role': forms.Select(attrs={'class': 'elite-input'}),
            'skill_level': forms.Select(attrs={'class': 'elite-input'}),
            'contact_info': forms.TextInput(attrs={'class': 'elite-input', 'placeholder': 'Discord or Telegram...'}),
            'favorite_games': forms.CheckboxSelectMultiple(),
        }
