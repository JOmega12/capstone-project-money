
from django.conf import settings
from datetime import datetime, timedelta
import jwt


# see if you can get an idea of how to create your own payload from the backend in javascript as
# inspiration
def generate_access_token(user):
    payload = {
        'payload': user.user_id,
        'exp': datetime() + timedelta(days=1),
        'iat': datetime(),
    }
    
    access_token = jwt.encode(payload, settings.SECRET_KEY, algorithm='HS256')
    
    return access_token