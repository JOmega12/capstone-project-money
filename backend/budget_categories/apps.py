from django.apps import AppConfig


class BudgetCategoriesConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'budget_categories'

    def ready(self):
        import budget_categories.signals