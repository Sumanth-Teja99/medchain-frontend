import React, { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import bg from "../assets/doctor.jpg";

function DoctorDashboard() {
  const navigate = useNavigate();

  const [records, setRecords] = useState([]);
  const [verifyResult, setVerifyResult] = useState(null);

  const loadData = async () => {
    const res = await API.get("/get_records");
    setRecords(res.data || []);
  };

  useEffect(() => {
    loadData();
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
    <div style={page(bg)}>
      <div style={overlay}>

        {/* SIDEBAR */}
        <div style={sidebar}>
          <h2>🏥 MedChain</h2>

          <button style={menuBtn} onClick={() => navigate("/chat")}>💬 Chat</button>
          <button style={menuBtn} onClick={() => navigate("/profile")}>👤 Profile</button>
          <button style={menuBtn} onClick={() => navigate("/settings")}>⚙️ Settings</button>

          <button style={logoutBtn} onClick={logout}>🚪 Logout</button>
        </div>

        {/* MAIN */}
        <div style={main} className="fade-in">
          <h2 style={{ marginBottom: "20px" }}>Doctor Dashboard</h2>

          {/* CARDS */}
          <div style={cards}>
            <div style={card}>
              <h4>Total Records</h4>
              <p>{records.length}</p>
            </div>

            <div style={card}>
              <h4>Blockchain Status</h4>
              <p>
                {verifyResult
                  ? verifyResult.chain_valid ? "Valid ✅" : "Broken ❌"
                  : "Not Checked"}
              </p>
            </div>
          </div>

          {/* VERIFY */}
          <div style={box}>
            <h3>Blockchain Verification</h3>
            <button style={primaryBtn} onClick={verifyBlockchain}>
              Verify Blockchain
            </button>
          </div>

          {/* RECORDS */}
          <div style={box}>
            <h3>Patient Records</h3>

            {records.map((r) => (
              <div key={r.id} style={record}>
                <p><b>Data:</b> {r.data}</p>
                <p><b>Hash:</b> {r.record_hash}</p>
                <p><b>Status:</b> {r.verified ? "Verified ✅" : "Tampered ❌"}</p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}

/* SAME CLEAN STYLES */

const page = (img) => ({
  minHeight: "100vh",
  backgroundImage: `url(${img})`,
  backgroundSize: "cover",
});

const overlay = {
  display: "flex",
  minHeight: "100vh",
  background: "rgba(0,0,0,0.6)",
};

const sidebar = {
  width: "230px",
  background: "rgba(20,33,52,0.95)",
  color: "white",
  padding: "20px",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
};

const menuBtn = {
  padding: "12px",
  border: "none",
  borderRadius: "8px",
  background: "#334155",
  color: "white",
};

const logoutBtn = {
  marginTop: "20px",
  padding: "12px",
  background: "#dc2626",
  color: "white",
};

const main = {
  flex: 1,
  padding: "30px",
  color: "white",
};

const cards = {
  display: "flex",
  gap: "20px",
};

const card = {
  flex: 1,
  background: "rgba(255,255,255,0.9)",
  color: "black",
  padding: "15px",
  borderRadius: "10px",
};

const box = {
  marginTop: "20px",
  background: "rgba(255,255,255,0.95)",
  padding: "20px",
  borderRadius: "10px",
  color: "black",
};

const record = {
  borderBottom: "1px solid #ccc",
  padding: "10px",
};

const primaryBtn = {
  padding: "10px 15px",
  background: "#0f62fe",
  color: "white",
  border: "none",
  borderRadius: "6px",
};

export default DoctorDashboard;