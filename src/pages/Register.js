import React, { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Patient");

  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await API.post("/register", {
        username,
        password,
        role
      });

      alert("Registered successfully!");
      navigate("/login/" + role);

    } catch (err) {
      alert(err.response?.data?.detail || "Error");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>Register</h2>

      <input
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
      /><br /><br />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      /><br /><br />

      <select onChange={(e) => setRole(e.target.value)}>
        <option>Patient</option>
        <option>Doctor</option>
      </select>

      <br /><br />

      <button onClick={handleRegister}>Register</button>
    </div>
  );
}

export default Register;