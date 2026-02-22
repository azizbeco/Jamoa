from django import forms
from .models import Post, Team

class PostForm(forms.ModelForm):
    class Meta:
        model = Post
        fields = ['content', 'post_type', 'game']
        widgets = {
            'content': forms.Textarea(attrs={'rows': 3, 'placeholder': 'What are you looking for?'}),
        }

    def clean_content(self):
        content = self.cleaned_data.get('content')
        if not content or not content.strip():
            raise forms.ValidationError('Content cannot be empty.')
        return content

class TeamForm(forms.ModelForm):
    class Meta:
        model = Team
        fields = ['name', 'slug', 'game', 'image', 'description']
        widgets = {
            'slug': forms.TextInput(attrs={'placeholder': 'e.g. og_team', 'style': 'text-transform: lowercase;'}),
        }
