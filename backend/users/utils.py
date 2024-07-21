
from django.conf import settings
from datetime import datetime, timedelta, timezone
import jwt

def generate_access_token(user):
    
    now = datetime.now(timezone.utc)
    payload = {
        'payload': user.id,
        'exp': now + timedelta(days=1),
        'iat': now,
    }
    
    access_token = jwt.encode(payload, settings.SECRET_KEY, algorithm='HS256')
    
    return access_token