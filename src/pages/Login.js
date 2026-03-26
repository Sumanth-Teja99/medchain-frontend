import React, { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      console.log("Sending login request...");

      const res = await API.post("/login", {
        username,
        password,
      });

      console.log("SUCCESS:", res.data);

      localStorage.setItem("token", res.data.access_token);
      localStorage.setItem("role", res.data.role);

      if (res.data.role === "Patient") {
        navigate("/patient");
      } else {
        navigate("/doctor");
      }

    } catch (err) {
      console.log("ERROR:", err);
      console.log("ERROR RESPONSE:", err?.response?.data);

      if (err?.response?.data?.detail) {
        alert(err.response.data.detail);
      } else {
        alert("Server not reachable or backend down");
      }
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>MedChain Login</h2>

      <input
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
      /><br /><br />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      /><br /><br />

      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;