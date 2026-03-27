import React, { useState } from "react";
import API from "../services/api";
import { useNavigate, useParams } from "react-router-dom";

function Login() {
  const { role } = useParams(); // 🔥 get role from URL
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await API.post("/login", {
        username,
        password,
      });

      localStorage.setItem("token", res.data.access_token);
      localStorage.setItem("role", res.data.role);

      if (res.data.role === "Patient") {
        navigate("/patient");
      } else {
        navigate("/doctor");
      }

    } catch (err) {
      if (err?.response?.data?.detail) {
        alert(err.response.data.detail);
      } else {
        alert("Server not reachable or backend down");
      }
    }
  };

  return (
    <div style={container}>

      <div style={card}>
        <h2 style={{ marginBottom: "10px" }}>🏥 MedChain</h2>
        <h3>{role} Login</h3>

        <input
          style={input}
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          style={input}
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button style={button} onClick={handleLogin}>
          Login
        </button>

        <p style={{ marginTop: "15px" }}>
          Not {role}?{" "}
          <span
            style={{ color: "blue", cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            Go Back
          </span>
        </p>
      </div>

    </div>
  );
}

/* 🎨 STYLES (PRO LOOK) */
const container = {
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "#f0f2f5",
};

const card = {
  background: "#fff",
  padding: "40px",
  borderRadius: "10px",
  boxShadow: "0 0 15px rgba(0,0,0,0.1)",
  textAlign: "center",
  width: "300px",
};

const input = {
  width: "100%",
  padding: "10px",
  margin: "10px 0",
  borderRadius: "5px",
  border: "1px solid #ccc",
};

const button = {
  width: "100%",
  padding: "10px",
  background: "#3498db",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  fontSize: "16px",
};

export default Login;