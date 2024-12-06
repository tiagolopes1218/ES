import React, { useState } from "react";
import axios from "axios";

const LoanSimulator = () => {
  const [amount, setAmount] = useState("");
  const [duration, setDuration] = useState("");
  const [response, setResponse] = useState(null);
  const [error, setError] = useState("");

  const handleSimulate = async (e) => {
    e.preventDefault();
    setError("");
    setResponse(null);

    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/api/simulate/", // URL do backend
        { amount, duration },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Token do login
          },
        }
      );
      setResponse(res.data);
    } catch (err) {
      setError("Erro na simulação. Verifique os dados ou tente novamente.");
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
