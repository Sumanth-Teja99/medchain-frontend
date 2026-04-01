import React from "react";
import { useNavigate } from "react-router-dom";

function SelectRole() {
  const navigate = useNavigate();

  return (
    <div style={container}>
      <div style={box}>
        <h1 style={{ marginBottom: "20px" }}>🏥 MedChain Portal</h1>
        <p>Select Login Type</p>

        <div style={cards}>

          <div style={card} onClick={() => navigate("/login/Patient")}>
            <h3>👤 Patient</h3>
            <p>Access your medical records</p>
          </div>

          <div style={card} onClick={() => navigate("/login/Doctor")}>
            <h3>👨‍⚕️ Doctor</h3>
            <p>Manage patient data</p>
          </div>

        </div>
      </div>
    </div>
  );
}

const container = {
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "linear-gradient(135deg, #74ebd5, #ACB6E5)"
};

const box = {
  background: "white",
  padding: "40px",
  borderRadius: "15px",
  textAlign: "center",
  width: "400px",
  boxShadow: "0 10px 30px rgba(0,0,0,0.2)"
};

const cards = {
  display: "flex",
  gap: "20px",
  marginTop: "20px"
};

const card = {
  flex: 1,
  background: "#3498db",
  color: "white",
  padding: "20px",
  borderRadius: "10px",
  cursor: "pointer",
  transition: "0.3s"
};

export default SelectRole;