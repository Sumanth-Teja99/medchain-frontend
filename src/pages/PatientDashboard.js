import React, { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import bg from "../assets/patient.jpg";

function PatientDashboard() {
  const navigate = useNavigate();

  const [data, setData] = useState("");
  const [records, setRecords] = useState([]);
  const [verifyResult, setVerifyResult] = useState(null);

  const loadData = async () => {
    const res = await API.get("/get_records");
    setRecords(res.data || []);
  };

  useEffect(() => {
    loadData();
  }, []);

  const addRecord = async () => {
    await API.post("/add_record", { data });
    setData("");
    loadData();
  };

  const verifyBlockchain = async () => {
    const res = await API.get("/verify_chain");
    setVerifyResult(res.data);
  };

  return (
    <div style={page(bg)}>
      <div style={layout}>

        {/* SIDEBAR */}
        <div style={sidebar}>
          <h2>🏥 MedChain</h2>

          <button onClick={() => navigate("/patient")}>🏠 Dashboard</button>
          <button onClick={() => navigate("/chat")}>💬 Chat</button>
          <button onClick={() => navigate("/profile")}>👤 Profile</button>
          <button onClick={() => navigate("/settings")}>⚙️ Settings</button>

          <button onClick={() => {
            localStorage.clear();
            window.location.href = "/";
          }}>🚪 Logout</button>
        </div>

        {/* MAIN */}
        <div style={main}>

          {/* NAVBAR */}
          <div style={navbar}>
            <h2>Patient Dashboard</h2>
          </div>

          {/* CARDS */}
          <div style={cards}>
            <div style={card}>
              <h3>Total Records</h3>
              <p>{records.length}</p>
            </div>

            <div style={card}>
              <h3>Status</h3>
              <p>
                {verifyResult
                  ? verifyResult.chain_valid ? "Valid ✅" : "Broken ❌"
                  : "Not Checked"}
              </p>
            </div>
          </div>

          {/* ADD RECORD */}
          <div style={box}>
            <h3>Add Record</h3>
            <textarea
              value={data}
              onChange={(e) => setData(e.target.value)}
            />
            <button onClick={addRecord}>Add</button>
            <button onClick={verifyBlockchain}>Verify</button>
          </div>

          {/* RECORDS */}
          <div style={box}>
            <h3>Records</h3>

            {records.map((r) => (
              <div key={r.id} style={record}>
                <p>{r.data}</p>
                <p>{r.record_hash}</p>
                <p>{r.verified ? "✅" : "❌"}</p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}

/* STYLES */

const page = (img) => ({
  minHeight: "100vh",
  backgroundImage: `url(${img})`,
  backgroundSize: "cover",
});

const layout = {
  display: "flex",
};

const sidebar = {
  width: "220px",
  background: "#1e293b",
  color: "white",
  padding: "20px",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
};

const main = {
  flex: 1,
  padding: "20px",
  background: "rgba(255,255,255,0.9)",
};

const navbar = {
  marginBottom: "20px",
};

const cards = {
  display: "flex",
  gap: "20px",
};

const card = {
  background: "#0f62fe",
  color: "white",
  padding: "20px",
  borderRadius: "10px",
  flex: 1,
};

const box = {
  background: "white",
  padding: "20px",
  marginTop: "20px",
  borderRadius: "10px",
};

const record = {
  borderBottom: "1px solid #ccc",
  padding: "10px",
};

export default PatientDashboard;