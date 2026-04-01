import React, { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function DoctorDashboard() {
  const navigate = useNavigate();
  const [records, setRecords] = useState([]);
  const [editData, setEditData] = useState({});

  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  const loadRecords = async () => {
    const res = await API.get("/get_records");
    setRecords(res.data || []);
  };

  useEffect(() => {
    loadRecords();
  }, []);

  const updateRecord = async (id) => {
    const newData = editData[id];
    if (!newData) return;

    await API.put(`/update_record/${id}?new_data=${encodeURIComponent(newData)}`);
    loadRecords();
  };

  return (
    <div style={{ display: "flex" }}>

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
      <div style={{ flex: 1, padding: "20px" }}>

        <h2>Doctor Dashboard</h2>

        <div style={card}>
          <h4>Total Records: {records.length}</h4>
        </div>

        <div style={card}>
          {records.map(r => (
            <div key={r.id} style={recordBox}>
              <p>{r.data}</p>

              <input
                value={editData[r.id] || ""}
                onChange={(e) => setEditData({...editData, [r.id]: e.target.value})}
              />

              <button onClick={() => updateRecord(r.id)} style={greenBtn}>
                Update
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
const recordBox = { border: "1px solid #ccc", padding: "10px", marginTop: "10px" };
const greenBtn = { background: "green", color: "white" };

export default DoctorDashboard;