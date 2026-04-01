import React, { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function PatientDashboard() {
  const navigate = useNavigate();

  const [data, setData] = useState("");
  const [records, setRecords] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState("");

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

    try {
      await API.post("/add_record", { data });
      setData("");
      loadData();
    } catch {
      alert("Failed to add record");
    }
  };

  const grantAccess = async (id) => {
    if (!selectedDoctor) return alert("Select doctor");

    try {
      await API.post(`/grant_access?record_id=${id}&doctor_id=${selectedDoctor}`);
      alert("Access granted");
    } catch {
      alert("Failed");
    }
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

        {/* SELECT DOCTOR */}
        <div style={card}>
          <select onChange={(e) => setSelectedDoctor(e.target.value)}>
            <option value="">Select Doctor</option>
            {doctors.map((d) => (
              <option key={d.id} value={d.id}>
                {d.username}
              </option>
            ))}
          </select>
        </div>

        {/* RECORDS */}
        <div style={card}>
          <h3>Your Records</h3>

          {records.map((record) => (
            <div key={record.id} style={recordBox}>
              <p><b>Data:</b> {record.data}</p>

              {/* 🔥 BLOCKCHAIN DATA */}
              <p><b>Previous Hash:</b> {record.previous_hash}</p>
              <p><b>Record Hash:</b> {record.record_hash}</p>
              <p>
                <b>Status:</b>{" "}
                {record.verified ? "Verified ✅" : "Tampered ❌"}
              </p>

              <button onClick={() => grantAccess(record.id)}>
                Grant Access
              </button>
            </div>
          ))}
        </div>
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

const card = {
  marginTop: "20px",
  padding: "15px",
  background: "#ecf0f1",
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