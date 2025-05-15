from decimal import Decimal
from venv import logger
from django.db import models
from django.contrib.auth.models import User
from budget_categories.models import Budget_categories




from django.conf import settings
import base64
from cryptography.fernet import Fernet
from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.primitives.kdf.pbkdf2 import PBKDF2HMAC
import os


class EncryptedDecimalField(models.DecimalField):
    
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
    
    def get_encryption_key(self):
        """We are generating a Fernet key from the Django SECRET_KEY using PBKDF2"""
        # Using Django's SECRET_KEY plus a salt to derive the encryption key
        salt = b'django_encrypted_fields_salt'  
        
        kdf = PBKDF2HMAC(
            algorithm=hashes.SHA256(),
            length=32,  # 32 bytes = 256 bits for AES-256
            salt=salt,
            iterations=100000,
        )
        key = base64.urlsafe_b64encode(kdf.derive(settings.SECRET_KEY.encode()))
        return key
    
    def encrypt_value(self, value):
        """Encrypt a value using Fernet (AES-256)"""
        if value is None:
            return None
        
        # Convert Decimal to string for encryption
        value_str = str(value)
        
        # Get the encryption key
        key = self.get_encryption_key()
        
        # Create a Fernet instance with the key
        fernet = Fernet(key)
        
        # Encrypt the value
        encrypted_value = fernet.encrypt(value_str.encode())
        
        # Return the encrypted value as a base64-encoded string
        return base64.b64encode(encrypted_value).decode('utf-8')
    
    def decrypt_value(self, value):
        """Decrypt a value using Fernet (AES-256)"""
        if value is None:
            return None
        
        # Get the encryption key
        key = self.get_encryption_key()
        
        # Create a Fernet instance with the key
        fernet = Fernet(key)
        
        # Decode the base64-encoded encrypted value
        encrypted_value = base64.b64decode(value)
        
        # Decrypt the value
        decrypted_value = fernet.decrypt(encrypted_value).decode('utf-8')
        
        # Return the decrypted value as a string
        return decrypted_value
    
    def from_db_value(self, value, expression, connection):
        """Convert from database value to Python value"""
        if value is None:
            return value
        
        if isinstance(value, Decimal):
            return value
        if isinstance(value, str) or isinstance(value, bytes):
        
            try:
                return self.decrypt_value(value)
            except Exception as e:
                # Optional: log the error
                import logging
                logging.error(f"Decryption failed for value {value}: {e}")
                return None

        # Catch-all fallback
        return value
    
    def to_python(self, value):
        """Convert Python value to appropriate type"""
        if value is None:
            return None
            
        # Check if the value is already a Decimal or similar numeric type
        if hasattr(value, 'quantize'):  # This catches Decimal and similar types
            return value
            
        # Check if this is likely an encrypted string
        if isinstance(value, str) and value.startswith('gAAAAAB'):  # Fernet encrypted values typically start with this prefix
            try:
                decrypted_value = self.decrypt_value(value)
                return super().to_python(decrypted_value)
            except Exception as e:
                logger.error(f"Error in to_python (encrypted case): {str(e)}")
                raise
        
        # Otherwise, treat as a normal value to be converted to Decimal
        try:
            return super().to_python(value)
        except Exception as e:
            logger.error(f"Error in to_python (normal case): {str(e)} for value {value}")
            raise
    
    def get_prep_value(self, value):
        """Prepare value for database storage"""
        if value is None:
            return value
        
        try:
            # Convert to Python Decimal and then to standard format
            value = super().get_prep_value(value)
            
            # Encrypt the value
            return self.encrypt_value(value)
        except Exception as e:
            logger.error(f"Error in get_prep_value: {str(e)} for value {value}")
            raise
# Create your models here.
class Transaction(models.Model):
    
    TRANSACTION_TYPES = (
        ('income', 'Income'),
        ('expense', 'Expense')
    )
    
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    transactionName = models.CharField(max_length=20)
    # transactionAmount = models.DecimalField(max_digits=20, decimal_places=2)
    transactionAmount = EncryptedDecimalField(max_digits=20, decimal_places=2)
    transactionType = models.CharField(max_length = 10, choices=TRANSACTION_TYPES, null = True, blank=True)
    category = models.ForeignKey(Budget_categories, on_delete=models.CASCADE, related_name='transactions',null = True, blank=True)
    createdAt= models.DateField(auto_now_add=True)

    
    def __str__(self):
        return f"{self.transactionName}, amount: {self.transactionAmount}, date: {self.createdAt}"
    
