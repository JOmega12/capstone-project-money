from rest_framework import serializers
from .models import Transaction
import logging

logger = logging.getLogger(__name__)


class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = '__all__'
        read_only_fields = ['id', 'createdAt']
    
    def get_category_name(self, obj):
        if obj.category:
            return obj.category.name
        return None
    
    def to_representation(self, instance):
        """Custom representation that ensures proper decryption of amount"""
        
        # First get the default representation
        representation = super().to_representation(instance)
        
        # Now explicitly handle the transactionAmount field
        try:
            # Access it directly from the instance to ensure it goes through the ORM decryption
            # Convert to string for proper JSON serialization
            amount = instance.transactionAmount
            if amount is not None:
                representation['transactionAmount'] = str(amount)
            else:
                # If the amount is None, let's log it for debugging
                logger.warning(f"Transaction {instance.id} has None amount after decryption")
                
                # Check if the raw value is stored properly
                raw_value = Transaction.objects.filter(id=instance.id).values_list('transactionAmount', flat=True)[0]
                logger.debug(f"Raw DB value for transaction {instance.id}: {raw_value}")
        except Exception as e:
            # Log the error, but don't break the API
            logger.error(f"Error processing transactionAmount for transaction {instance.id}: {str(e)}")
            # Set null or use a placeholder
            representation['transactionAmount'] = None
            
        return representation

    def create(self, validated_data):
        """Custom create method to ensure proper encryption"""
        # Since the model field will handle encryption, we just need to pass the data through
        try:
            # Create the transaction directly through the model
            return super().create(validated_data)
        except Exception as e:
            logger.error(f"Error creating transaction with amount: {str(e)}")
            raise serializers.ValidationError(f"Error processing transaction amount: {str(e)}")
    
    def update(self, instance, validated_data):
        """Custom update method to ensure proper encryption"""
        try:
            # Update the transaction with validated data
            return super().update(instance, validated_data)
        except Exception as e:
            logger.error(f"Error updating transaction with amount: {str(e)}")
            raise serializers.ValidationError(f"Error processing transaction amount: {str(e)}")