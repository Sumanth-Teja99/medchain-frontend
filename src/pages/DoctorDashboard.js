import React, { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import bg from "../assets/doctor.jpg";

function DoctorDashboard() {
  const navigate = useNavigate();

  const [records, setRecords] = useState([]);
  const [verifyResult, setVerifyResult] = useState(null);

  const loadRecords = async () => {
    try {
      const res = await API.get("/get_records");
      setRecords(res.data || []);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadRecords();
  }, []);

  const verifyBlockchain = async () => {
    try {
      const res = await API.get("/verify_chain");
      setVerifyResult(res.data);
    } catch {
      alert("Verification failed");
    }
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
          <h3>🏥 MedChain</h3>
          <p>Doctor Panel</p>

          <button onClick={() => navigate("/chat")} style={menuBtn}>Chat</button>
          <button onClick={() => navigate("/profile")} style={menuBtn}>Profile</button>
          <button onClick={() => navigate("/settings")} style={menuBtn}>Settings</button>

          <button onClick={logout} style={logoutBtn}>Logout</button>
        </div>

        {/* MAIN */}
        <div style={main}>
          <h2>Doctor Dashboard</h2>

          {/* VERIFY BUTTON */}
          <button onClick={verifyBlockchain} style={{ marginBottom: "10px" }}>
            Verify Blockchain
          </button>

          {verifyResult && (
            <div style={verifyBox}>
              <h4>
                {verifyResult.chain_valid
                  ? "Blockchain Valid ✅"
                  : "Blockchain Broken ❌"}
              </h4>
              <p>Total Records: {verifyResult.total_records}</p>
            </div>
          )}

          {/* RECORDS */}
          <div style={card}>
            {records.map((r) => (
              <div key={r.id} style={recordBox}>
                <p><b>Data:</b> {r.data}</p>

                {/* 🔥 BLOCKCHAIN INFO */}
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
      </div>
    </div>
  );
}

/* 🔥 STYLES */

const page = (img) => ({
  minHeight: "100vh",
  backgroundImage: `url(${img})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
});

const overlay = {
  display: "flex",
  background: "rgba(0,0,0,0.5)",
  minHeight: "100vh",
};

const sidebar = {
  width: "220px",
  background: "#2c3e50",
  color: "white",
  padding: "20px",
};

const main = {
  flex: 1,
  padding: "20px",
  color: "white",
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

const card = {
  background: "rgba(255,255,255,0.9)",
  padding: "15px",
  borderRadius: "10px",
  color: "black",
};

const recordBox = {
  border: "1px solid #ccc",
  padding: "10px",
  marginTop: "10px",
};

const verifyBox = {
  background: "rgba(255,255,255,0.8)",
  padding: "10px",
  borderRadius: "10px",
  color: "black",
};

export default DoctorDashboard;