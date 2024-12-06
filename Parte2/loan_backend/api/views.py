from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.models import User
from rest_framework import status
from .models import LoanRequest
from django.core.exceptions import ValidationError

class LoginView(APIView):
    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")
        if not username or not password:
            return Response({"error": "Username and password are required."}, status=status.HTTP_400_BAD_REQUEST)

        user = User.objects.filter(username=username).first()
        if user and user.check_password(password):
            token = RefreshToken.for_user(user)
            return Response({"token": str(token.access_token)})
        return Response({"error": "Invalid credentials."}, status=status.HTTP_401_UNAUTHORIZED)

class LoanSimulationView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        amount = request.data.get("amount")
        duration = request.data.get("duration")

        try:
            amount = float(amount)
            duration = int(duration)

            # Lógica de avaliação do empréstimo
            if amount <= 5000 and duration <= 12:
                status = "Aprovado"
            elif amount > 5000 and amount <= 20000 and duration <= 36:
                status = "Marcação de Entrevista"
            else:
                status = "Recusado"

            return Response({"status": status, "amount": amount, "duration": duration})
        except (ValueError, TypeError):
            return Response({"error": "Dados inválidos. Certifique-se de enviar valores numéricos."}, status=400)
