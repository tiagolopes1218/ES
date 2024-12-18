import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validação básica
    if (!username || !password) {
      setError("Preencha todos os campos.");
      return;
    }

    try {
      console.log("Enviando credenciais:", { username, password });

      // Requisição correta para obter o token
      const response = await axios.post("http://localhost:8000/api/token/", {
        username,
        password,
      });

      console.log("Resposta da API:", response);

      // Extrai o token da resposta
      const { access, refresh } = response.data;

      if (access) {
        console.log("Token de acesso recebido:", access);
        // Armazena o token no localStorage
        localStorage.setItem("token", access);
        localStorage.setItem("refreshToken", refresh);
        setError("");
        navigate("/simulator"); // Redireciona para o simulador
      } else {
        setError("Autenticação falhou. Token não recebido.");
      }
    } catch (error) {
      console.error("Erro ao enviar login:", error);

      if (error.response) {
        setError(error.response.data.detail || "Credenciais inválidas.");
      } else {
        setError("Erro de rede ou servidor indisponível.");
      }
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            placeholder="Usuário"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={{ padding: "10px", marginBottom: "10px", width: "200px" }}
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
          Entrar
        </button>
      </form>
      {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
      
    </div>
  );
};

export default Login;