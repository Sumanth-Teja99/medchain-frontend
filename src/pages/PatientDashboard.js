import React, { useState, useEffect } from "react";
import API from "../services/api";

function PatientDashboard() {
  const [data, setData] = useState("");
  const [records, setRecords] = useState([]);
  const [doctorId, setDoctorId] = useState("");

  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  const addRecord = async () => {
    await API.post("/add_record",
      { data },
      { headers: { token: localStorage.getItem("token") } }
    );
    alert("Record added");
    fetchRecords();
  };

  const grantAccess = async (recordId) => {
    await API.post(`/grant_access?record_id=${recordId}&doctor_id=${doctorId}`, {},
      { headers: { token: localStorage.getItem("token") } }
    );
    alert("Access granted");
  };

  const fetchRecords = async () => {
    const res = await API.get("/get_records", {
      headers: { token: localStorage.getItem("token") }
    });
    setRecords(res.data);
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>👤 Patient Dashboard</h2>

      <button onClick={logout}>Logout</button>

      <h3>Add Medical Record</h3>

      <textarea
        placeholder="Enter medical data..."
        onChange={(e) => setData(e.target.value)}
      />

      <br /><br />

      <button onClick={addRecord}>Add Record</button>

      <h3>Your Records</h3>

      <input
        placeholder="Enter Doctor ID"
        onChange={(e) => setDoctorId(e.target.value)}
      />

      {records.map((r) => (
        <div key={r.id} style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
          <p>{r.data}</p>
          <button onClick={() => grantAccess(r.id)}>Grant Access</button>
        </div>
      ))}
    </div>
  );
}

export default PatientDashboard;