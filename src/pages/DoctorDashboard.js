import React, { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function DoctorDashboard() {
  const navigate = useNavigate();
  const [records, setRecords] = useState([]);
  const [verifyResult, setVerifyResult] = useState(null);

  const loadRecords = async () => {
    const res = await API.get("/get_records");
    setRecords(res.data || []);
  };

  useEffect(() => {
    loadRecords();
  }, []);

  const verifyBlockchain = async () => {
    const res = await API.get("/verify_chain");
    setVerifyResult(res.data);
  };

  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <div style={{ display: "flex" }}>

      {/* SIDEBAR */}
      <div style={sidebar}>
        <h3>🏥 MedChain</h3>

        <button onClick={() => navigate("/chat")} style={menuBtn}>Chat</button>
        <button onClick={() => navigate("/profile")} style={menuBtn}>Profile</button>
        <button onClick={() => navigate("/settings")} style={menuBtn}>Settings</button>

        <button onClick={logout} style={logoutBtn}>Logout</button>
      </div>

      {/* MAIN */}
      <div style={{ flex: 1, padding: "20px" }}>
        <h2>Doctor Dashboard</h2>

        <button onClick={verifyBlockchain} style={{ marginBottom: "10px" }}>
          Verify Blockchain
        </button>

        {verifyResult && (
          <div>
            <h4>
              {verifyResult.chain_valid
                ? "Blockchain Valid ✅"
                : "Blockchain Broken ❌"}
            </h4>
            <p>Total Records: {verifyResult.total_records}</p>
          </div>
        )}

        {records.map((r) => (
          <div key={r.id} style={recordBox}>
            <p><b>Data:</b> {r.data}</p>

            <p><b>Previous Hash:</b> {r.previous_hash}</p>
            <p><b>Record Hash:</b> {r.record_hash}</p>
            <p>
              <b>Status:</b>{" "}
              {r.verified ? "Verified ✅" : "Tampered ❌"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

const sidebar = {
  width: "220px",
  background: "#2c3e50",
  color: "white",
  padding: "20px",
  height: "100vh",
};

const menuBtn = {
  display: "block",
  width: "100%",
  margin: "10px 0",
  padding: "10px",
};

const logoutBtn = {
  background: "red",
  color: "white",
  padding: "10px",
  marginTop: "20px",
};

const recordBox = {
  border: "1px solid #ccc",
  padding: "10px",
  marginTop: "10px",
};

export default DoctorDashboard;