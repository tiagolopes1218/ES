import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import LoanSimulator from "./pages/LoanSimulator";
import LoanStatus from "./pages/LoanStatus";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/simulator" element={<LoanSimulator />} />
        <Route path="/status" element={<LoanStatus />} />
      </Routes>
    </Router>
  );
};

export default App;
