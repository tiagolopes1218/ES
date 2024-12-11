from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

class LoanSimulationView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            # Verifica os dados recebidos
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

            # Lógica da simulação (exemplo simples)
            if amount <= 100000 and duration <=12:
                result = f"Aprovado para {amount} em {duration} meses."
            elif amount > 100000 and amount < 1000000 and duration <=36:
                result = f"Marcação de Entrevista"
            else:
                result = f"Reprovado"
            return Response({"result": result})

        except ValueError:
            return Response({"error": "Formato inválido. 'amount' e 'duration' devem ser numéricos."}, status=400)
