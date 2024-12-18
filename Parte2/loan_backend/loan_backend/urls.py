"""from django.contrib import admin
from django.urls import path
from api import views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/simulate/', views.LoanSimulationView.as_view(), name='simulate'),
]
"""
from django.contrib import admin
from django.urls import path
from api import views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/simulate/', views.LoanSimulationView.as_view(), name='simulate'),
    path('api/loans/', views.submit_loan_request, name='submit-loan'),  # Submissão do pedido
    path('api/loans/<int:loan_id>/status/', views.check_loan_status, name='check-loan-status'),  # Status do pedido
]
