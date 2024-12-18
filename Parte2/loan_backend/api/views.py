from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from django.shortcuts import get_object_or_404
from .models import LoanRequest
from datetime import datetime

# Simulação de Empréstimo
class LoanSimulationView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            amount = float(request.data.get("amount", 0))
            duration = int(request.data.get("duration", 0))

            # Validações básicas
            if not amount or not duration:
                return Response(
                    {"error": "Dados incompletos. Certifique-se de preencher todos os campos."},
                    status=400
                )

            if amount <= 0 or duration <= 0:
                return Response(
                    {"error": "Valores inválidos. 'amount' e 'duration' devem ser maiores que zero."},
                    status=400
                )

            # Lógica da simulação
            if amount <= 100000 and duration <= 12:
                result = "Aprovado"
            elif amount > 100000 and amount < 1000000 and duration <= 36:
                result = "Marcação de Entrevista"
            else:
                result = "Reprovado"

            # Devolver o resultado com valor e duração
            return Response({
                "result": result,
                "amount": amount,
                "duration": duration
            })

        except ValueError:
            return Response(
                {"error": "Formato inválido. 'amount' e 'duration' devem ser numéricos."},
                status=400
            )


# Submissão de Pedido de Empréstimo
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def submit_loan_request(request):
    user = request.user
    amount = request.data.get("amount")
    duration = request.data.get("duration")

    if not amount or not duration:
        return Response({"error": "Dados incompletos."}, status=400)

    try:
        # Criar o pedido de empréstimo
        loan = LoanRequest.objects.create(
            user=user,
            amount=amount,
            duration_months=duration,
            status="pending"
        )
        return Response(
            {
                "loanId": loan.id,
                "message": f"Pedido submetido com sucesso! ID: {loan.id}"
            },
            status=201
        )
    except Exception as e:
        return Response({"error": str(e)}, status=400)


# Consulta do Status do Pedido de Empréstimo
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def check_loan_status(request, loan_id):
    loan = get_object_or_404(LoanRequest, id=loan_id, user=request.user)
    return Response({
        "loanId": loan.id,
        "amount": loan.amount,
        "duration": loan.duration_months,
        "status": loan.status,
        "created_at": loan.created_at.strftime('%Y-%m-%d %H:%M:%S'),
        "updated_at": loan.updated_at.strftime('%Y-%m-%d %H:%M:%S')
    })
