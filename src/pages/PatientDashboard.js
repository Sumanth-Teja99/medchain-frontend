import React, { useState, useEffect } from "react";
import API from "../services/api";

function PatientDashboard() {
  const [data, setData] = useState("");
  const [records, setRecords] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState("");

  const token = localStorage.getItem("token");

  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  const fetchRecords = async () => {
    const res = await API.get("/get_records", {
      headers: { token }
    });
    setRecords(res.data);
  };

  const fetchDoctors = async () => {
    const res = await API.get("/doctors");
    setDoctors(res.data);
  };

 useEffect(() => {
  const load = async () => {
    try {
      const recordsRes = await API.get("/get_records", {
        headers: { token }
      });
      setRecords(recordsRes.data);

      const doctorsRes = await API.get("/doctors");
      setDoctors(doctorsRes.data);

    } catch (err) {
      console.log(err);
    }
  };

  load();
}, []);

  const addRecord = async () => {
    if (!data) return alert("Enter data");

    await API.post("/add_record",
      { data },
      { headers: { token } }
    );

    setData("");
    fetchRecords();
  };

  const grantAccess = async (recordId) => {
    if (!selectedDoctor) return alert("Select doctor");

    await API.post(
      `/grant_access?record_id=${recordId}&doctor_id=${selectedDoctor}`,
      {},
      { headers: { token } }
    );

    alert("Access granted!");
  };

  const updateRecord = async (id, newData) => {
    if (!newData) return alert("Enter new data");

    await API.put(
      `/update_record/${id}?new_data=${newData}`,
      {},
      { headers: { token } }
    );

    fetchRecords();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>👤 Patient Dashboard</h2>

      <button onClick={logout}>Logout</button>

      <h3>Add Medical Record</h3>

      <textarea
        value={data}
        placeholder="Enter medical data..."
        onChange={(e) => setData(e.target.value)}
      />

      <br /><br />

      <button onClick={addRecord}>Save Record</button>

      <h3>Select Doctor</h3>

      <select onChange={(e) => setSelectedDoctor(e.target.value)}>
        <option value="">Select Doctor</option>
        {doctors.map(d => (
          <option key={d.id} value={d.id}>
            {d.username}
          </option>
        ))}
      </select>

      <h3>Your Records</h3>

      {records.length === 0 ? (
        <p>No records yet</p>
      ) : (
        records.map((r) => (
          <div key={r.id} style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
            <p>{r.data}</p>

            <input
              placeholder="Edit data"
              onChange={(e) => (r.newData = e.target.value)}
            />

            <br /><br />

            <button onClick={() => updateRecord(r.id, r.newData)}>
              Update
            </button>

            <button onClick={() => grantAccess(r.id)}>
              Grant Access
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default PatientDashboard;