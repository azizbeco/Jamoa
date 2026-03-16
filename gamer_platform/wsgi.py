import os
import sys

# Add the project and virtualenv to the Python path
path = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if path not in sys.path:
    sys.path.append(path)

# Add site-packages to path (targeting Python 3.11 as seen in logs)
venv_site_packages = os.path.join(path, 'venv', 'lib', 'python3.11', 'site-packages')
if venv_site_packages not in sys.path:
    sys.path.append(venv_site_packages)

from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'gamer_platform.settings')

application = get_wsgi_application()
