import React, { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import bg from "../assets/patient.jpg";

function PatientDashboard() {
  const navigate = useNavigate();

  const [data, setData] = useState("");
  const [records, setRecords] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [verifyResult, setVerifyResult] = useState(null);

  const loadData = async () => {
    try {
      const rec = await API.get("/get_records");
      setRecords(rec.data || []);

      const doc = await API.get("/doctors");
      setDoctors(doc.data || []);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const addRecord = async () => {
    if (!data.trim()) return alert("Enter data");

    await API.post("/add_record", { data });
    setData("");
    loadData();
  };

  const grantAccess = async (id) => {
    if (!selectedDoctor) return alert("Select doctor");

    await API.post(`/grant_access?record_id=${id}&doctor_id=${selectedDoctor}`);
    alert("Access granted");
  };

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
          <h3>🏥 MedChain</h3>

          <button onClick={() => navigate("/chat")} style={menuBtn}>Chat</button>
          <button onClick={() => navigate("/profile")} style={menuBtn}>Profile</button>
          <button onClick={() => navigate("/settings")} style={menuBtn}>Settings</button>

          <button onClick={logout} style={logoutBtn}>Logout</button>
        </div>

        {/* MAIN */}
        <div style={main}>
          <h2>Patient Dashboard</h2>

          {/* ADD RECORD */}
          <div style={card}>
            <textarea
              value={data}
              onChange={(e) => setData(e.target.value)}
              placeholder="Enter medical data"
              style={textarea}
            />
            <button onClick={addRecord}>Add Record</button>
          </div>

          {/* VERIFY */}
          <button onClick={verifyBlockchain} style={{ marginTop: "10px" }}>
            Verify Blockchain
          </button>

          {verifyResult && (
            <h4>
              {verifyResult.chain_valid
                ? "Blockchain Valid ✅"
                : "Blockchain Broken ❌"}
            </h4>
          )}

          {/* DOCTOR SELECT */}
          <div style={card}>
            <select onChange={(e) => setSelectedDoctor(e.target.value)}>
              <option value="">Select Doctor</option>
              {doctors.map((d) => (
                <option key={d.id} value={d.id}>{d.username}</option>
              ))}
            </select>
          </div>

          {/* RECORDS */}
          <div style={card}>
            {records.map((r) => (
              <div key={r.id} style={recordBox}>
                <p>{r.data}</p>
                <p>Prev Hash: {r.previous_hash}</p>
                <p>Hash: {r.record_hash}</p>
                <p>{r.verified ? "Verified ✅" : "Tampered ❌"}</p>

                <button onClick={() => grantAccess(r.id)}>
                  Grant Access
                </button>
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

const overlay = {
  display: "flex",
  background: "rgba(0,0,0,0.4)",
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
};

const menuBtn = {
  display: "block",
  margin: "10px 0",
  padding: "10px",
  width: "100%",
};

const logoutBtn = {
  background: "red",
  color: "white",
  marginTop: "20px",
  padding: "10px",
};

const card = {
  background: "rgba(255,255,255,0.9)",
  padding: "15px",
  marginTop: "20px",
  borderRadius: "10px",
};

const textarea = {
  width: "100%",
  height: "80px",
};

const recordBox = {
  border: "1px solid #ccc",
  padding: "10px",
  marginTop: "10px",
};

export default PatientDashboard;