from .forms import CustomUserCreationForm, CustomAuthenticationForm

def auth_forms(request):
    try:
        return {
            'login_form': CustomAuthenticationForm(),
            'register_form': CustomUserCreationForm(),
        }
    except Exception:
        return {}
