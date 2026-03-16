import os
import sys
import logging

# Set up logging to uWSGI output
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Add the project and virtualenv to the Python path
path = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if path not in sys.path:
    sys.path.append(path)

# Find site-packages dynamically
lib_path = os.path.join(path, 'venv', 'lib')
if os.path.exists(lib_path):
    for item in os.listdir(lib_path):
        if item.startswith('python'):
            site_packages = os.path.join(lib_path, item, 'site-packages')
            if os.path.exists(site_packages):
                if site_packages not in sys.path:
                    sys.path.append(site_packages)
                logger.info(f"Added to sys.path: {site_packages}")

logger.info(f"Final sys.path: {sys.path}")

try:
    from django.core.wsgi import get_wsgi_application
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'gamer_platform.settings')
    application = get_wsgi_application()
    logger.info("Successfully loaded WSGI application")
except Exception as e:
    logger.error(f"Failed to load WSGI application: {e}")
    raise e
