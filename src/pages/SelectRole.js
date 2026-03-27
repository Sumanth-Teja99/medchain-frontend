import React from "react";
import { useNavigate } from "react-router-dom";

function SelectRole() {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>🏥 MedChain</h1>
      <h3>Select Login Type</h3>

      <button onClick={() => navigate("/login/Doctor")} style={btn}>
        Doctor Login
      </button>

      <button onClick={() => navigate("/login/Patient")} style={btn}>
        Patient Login
      </button>
    </div>
  );
}

const btn = {
  margin: "20px",
  padding: "15px 30px",
  fontSize: "18px",
  cursor: "pointer"
};

export default SelectRole;