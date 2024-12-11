import React, { useState } from "react";
import axios from "axios";

const LoanSimulator = () => {
  const [amount, setAmount] = useState("");
  const [duration, setDuration] = useState("");
  const [response, setResponse] = useState(null);
  const [error, setError] = useState("");

  const handleSimulate = async (e) => {
  e.preventDefault();

  const token = localStorage.getItem("token");
  if (!token) {
    alert("Usuário não autenticado. Faça login novamente.");
    return;
  }

  try {
    const response = await axios.post(
      "http://localhost:8000/api/simulate/",
      { amount, duration },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    alert(`Resultado da Simulação: ${response.data.result}`);
  } catch (error) {
    console.error(error);
    if (error.response) {
      alert(`Erro na simulação: ${error.response.data.error || "Desconhecido"}`);
    } else {
      alert("Erro de rede ou servidor indisponível.");
    }
  }
};

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Simulador de Empréstimos</h1>
      <form onSubmit={handleSimulate}>
        <div>
          <input
            type="number"
            placeholder="Valor do Empréstimo"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            style={{ padding: "10px", marginBottom: "10px", width: "200px" }}
          />
        </div>
        <div>
          <input
            type="number"
            placeholder="Duração (meses)"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            required
            style={{ padding: "10px", marginBottom: "20px", width: "200px" }}
          />
        </div>
        <button
          type="submit"
          style={{
            padding: "10px 20px",
            backgroundColor: "#007BFF",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Simular
        </button>
      </form>
      {response && (
        <div style={{ marginTop: "20px" }}>
          <h3>Status: {response.status}</h3>
          <p>
            <strong>Valor:</strong> €{response.amount}
          </p>
          <p>
            <strong>Duração:</strong> {response.duration} meses
          </p>
        </div>
      )}
      {error && <p style={{ color: "red", marginTop: "20px" }}>{error}</p>}
    </div>
  );
};

export default LoanSimulator;