import React, { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("patient");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await API.post("/register", {
        username,
        password,
        role,
      });

      alert("Registered successfully!");
      navigate("/login/" + role);
    } catch (err) {
      alert(err.response?.data?.detail || "Registration failed");
    }
  };

  return (
    <div style={container}>
      <div style={card}>
        <h2 style={{ marginBottom: "10px" }}>🏥 MedChain</h2>
        <h3>Create Account</h3>

        <input
          style={input}
          placeholder="Enter Username"
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          style={input}
          type="password"
          placeholder="Enter Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <select style={input} onChange={(e) => setRole(e.target.value)} value={role}>
          <option value="patient">Patient</option>
          <option value="doctor">Doctor</option>
        </select>

        <button style={button} onClick={handleRegister}>
          Register
        </button>

        <p style={{ marginTop: "15px" }}>
          Already have account?{" "}
          <span
            style={{ color: "blue", cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            Login here
          </span>
        </p>
      </div>
    </div>
  );
}

const container = {
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "#eef2f7",
};

const card = {
  background: "#fff",
  padding: "40px",
  borderRadius: "12px",
  boxShadow: "0 5px 20px rgba(0,0,0,0.1)",
  textAlign: "center",
  width: "320px",
};

const input = {
  width: "100%",
  padding: "12px",
  margin: "10px 0",
  borderRadius: "6px",
  border: "1px solid #ccc",
};

const button = {
  width: "100%",
  padding: "12px",
  background: "#2ecc71",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  fontSize: "16px",
};

export default Register;