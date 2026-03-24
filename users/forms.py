from django import forms
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from .models import User, Profile
from core.models import Game

class CustomUserCreationForm(UserCreationForm):
    email = forms.EmailField(required=True, label="Email", help_text="Bitta email bilan bitta hisob ochish mumkin.")
    nickname = forms.CharField(max_length=50, required=True, label="Gamer Nickname")
    favorite_games = forms.ModelMultipleChoiceField(
        queryset=Game.objects.all(),
        widget=forms.CheckboxSelectMultiple,
        required=False,
        label="Sevimli O'yinlar"
    )

    class Meta(UserCreationForm.Meta):
        model = User
        fields = ('username', 'email')

    def clean_email(self):
        email = self.cleaned_data.get('email')
        if User.objects.filter(email=email).exists():
            raise forms.ValidationError('Bu email allaqachon ro\'yxatdan o\'tgan.')
        return email

    def clean_username(self):
        username = self.cleaned_data.get('username')
        if not username:
            return username
        
        # Uniqueness check (extra safety)
        if User.objects.filter(username=username).exists():
            raise forms.ValidationError('Bu username band. Iltimos, boshqa nom tanlang.')

        # Length check
        if len(username) < 4:
            raise forms.ValidationError('Username kamida 4 ta belgidan iborat bo\'lishi kerak.')
        
        # Regex check: alphanumeric and underscores only
        import re
        if not re.match(r'^[a-zA-Z0-9_]+$', username):
            raise forms.ValidationError('Username faqat harf, raqam va pastki chiziqdan iborat bo\'lishi kerak.')

        # Reserved names check
        reserved_names = ['admin', 'root', 'superuser', 'jamoa', 'support']
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
            profile.favorite_games.set(self.cleaned_data.get('favorite_games'))
            profile.save()
        return user

class CustomAuthenticationForm(AuthenticationForm):
    username = forms.CharField(
        label="Username yoki Email",
        widget=forms.TextInput(attrs={'class': 'elite-input', 'placeholder': 'Gamer nomi yoki email...'}),
        help_text="Ro'yxatdan o'tganingizda foydalangan nomingiz yoki email manzilingiz."
    )
    password = forms.CharField(
        label="Parol",
        widget=forms.PasswordInput(attrs={'class': 'elite-input', 'placeholder': '********'})
    )

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
