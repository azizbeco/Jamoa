from .forms import CustomUserCreationForm, CustomAuthenticationForm

def auth_forms(request):
    return {
        'login_form': CustomAuthenticationForm(),
        'register_form': CustomUserCreationForm(),
    }
