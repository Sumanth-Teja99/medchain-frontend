import React, { useState } from "react";
import API from "../services/api";
import { useNavigate, useParams } from "react-router-dom";

function Login() {
  const { role } = useParams();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const formData = new URLSearchParams();
      formData.append("username", username);
      formData.append("password", password);

      const res = await API.post("/login", formData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      localStorage.setItem("token", res.data.access_token || res.data.token);
      localStorage.setItem("username", username);
      localStorage.setItem("role", role?.toLowerCase());

      if (role?.toLowerCase() === "patient") {
        navigate("/patient");
      } else {
        navigate("/doctor");
      }
    } catch (err) {
      alert(err.response?.data?.detail || "Login failed");
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
          New user?{" "}
          <span
            style={{ color: "blue", cursor: "pointer" }}
            onClick={() => navigate("/register")}
          >
            Register here
          </span>
        </p>

        <p style={{ marginTop: "10px" }}>
          <span
            style={{ color: "gray", cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            ← Go Back
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