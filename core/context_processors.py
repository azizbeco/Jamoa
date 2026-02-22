from .models import Notification

def notifications_processor(request):
    if request.user.is_authenticated:
        notifications = Notification.objects.filter(recipient=request.user).order_by('-created_at')[:5]
        unread_count = Notification.objects.filter(recipient=request.user, is_read=False).count()
        return {
            'notifications': notifications,
            'unread_count': unread_count,
        }
    return {
        'notifications': [],
        'unread_count': 0,
    }
