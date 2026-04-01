import React, { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function PatientDashboard() {
  const navigate = useNavigate();

  const [data, setData] = useState("");
  const [records, setRecords] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [editData, setEditData] = useState({});

  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  const loadData = async () => {
    try {
      const recordsRes = await API.get("/get_records");
      setRecords(recordsRes.data || []);

      const doctorsRes = await API.get("/doctors");
      setDoctors(doctorsRes.data || []);
    } catch (error) {
      console.log(error);
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
    } catch (err) {
      alert("Failed to add record");
    }
  };

  const grantAccess = async (id) => {
    if (!selectedDoctor) return alert("Select doctor");

    try {
      await API.post(`/grant_access?record_id=${id}&doctor_id=${selectedDoctor}`);
      alert("Access granted");
    } catch {
      alert("Grant failed");
    }
  };

  const updateRecord = async (id) => {
    const newData = editData[id];
    if (!newData) return alert("Enter new data");

    try {
      await API.put(`/update_record/${id}?new_data=${encodeURIComponent(newData)}`);
      loadData();
    } catch {
      alert("Update failed");
    }
  };

  return (
    <div style={{ display: "flex" }}>

      {/* SIDEBAR */}
      <div style={sidebar}>
        <h3>🏥 MedChain</h3>
        <p>Patient Panel</p>

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
          <h4>Add Record</h4>
          <textarea value={data} onChange={(e) => setData(e.target.value)} style={textarea}/>
          <button onClick={addRecord} style={blueBtn}>Save</button>
        </div>

        {/* SELECT DOCTOR */}
        <div style={card}>
          <h4>Grant Access</h4>
          <select value={selectedDoctor} onChange={(e) => setSelectedDoctor(e.target.value)}>
            <option value="">Select Doctor</option>
            {doctors.map(d => (
              <option key={d.id} value={d.id}>{d.username}</option>
            ))}
          </select>
        </div>

        {/* RECORDS */}
        <div style={card}>
          <h4>Your Records</h4>

          {records.map(r => (
            <div key={r.id} style={recordBox}>
              <p>{r.data}</p>

              <input
                value={editData[r.id] || ""}
                onChange={(e) => setEditData({...editData, [r.id]: e.target.value})}
              />

              <button onClick={() => updateRecord(r.id)} style={greenBtn}>Update</button>
              <button onClick={() => grantAccess(r.id)} style={purpleBtn}>Grant</button>
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
  height: "100vh"
};

const menuBtn = {
  display: "block",
  width: "100%",
  margin: "10px 0",
  padding: "10px",
  background: "#34495e",
  color: "white",
  border: "none"
};

const logoutBtn = {
  marginTop: "20px",
  background: "red",
  color: "white",
  padding: "10px",
  border: "none"
};

const card = { background: "white", padding: "15px", marginTop: "20px" };
const textarea = { width: "100%", height: "80px" };
const blueBtn = { background: "#3498db", color: "white", padding: "8px" };
const greenBtn = { background: "green", color: "white", marginRight: "10px" };
const purpleBtn = { background: "purple", color: "white" };
const recordBox = { border: "1px solid #ccc", padding: "10px", marginTop: "10px" };

export default PatientDashboard;