import React, { useState, useEffect } from "react";
import API from "../services/api";

function PatientDashboard() {
  const [data, setData] = useState("");
  const [records, setRecords] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [editData, setEditData] = useState({});

  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  useEffect(() => {
    async function loadData() {
      try {
        const currentToken = localStorage.getItem("token");

        const recordsRes = await API.get("/get_records", {
          headers: { token: currentToken },
        });
        setRecords(recordsRes.data);

        const doctorsRes = await API.get("/doctors");
        setDoctors(doctorsRes.data);
      } catch (error) {
        console.log(error);
      }
    }

    loadData();
  }, []);

  const refreshRecords = async () => {
    try {
      const currentToken = localStorage.getItem("token");
      const res = await API.get("/get_records", {
        headers: { token: currentToken },
      });
      setRecords(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const addRecord = async () => {
    if (!data.trim()) {
      alert("Enter data");
      return;
    }

    try {
      const currentToken = localStorage.getItem("token");

      await API.post(
        "/add_record",
        { data },
        { headers: { token: currentToken } }
      );

      setData("");
      await refreshRecords();
    } catch (error) {
      console.log(error);
      alert("Failed to add record");
    }
  };

  const grantAccess = async (recordId) => {
    if (!selectedDoctor) {
      alert("Select doctor");
      return;
    }

    try {
      const currentToken = localStorage.getItem("token");

      await API.post(
        `/grant_access?record_id=${recordId}&doctor_id=${selectedDoctor}`,
        {},
        { headers: { token: currentToken } }
      );

      alert("Access granted!");
    } catch (error) {
      console.log(error);
      alert("Grant access failed");
    }
  };

  const updateRecord = async (recordId) => {
    const newData = editData[recordId];

    if (!newData || !newData.trim()) {
      alert("Enter new data");
      return;
    }

    try {
      const currentToken = localStorage.getItem("token");

      await API.put(
        `/update_record/${recordId}?new_data=${encodeURIComponent(newData)}`,
        {},
        { headers: { token: currentToken } }
      );

      await refreshRecords();
      alert("Record updated");
    } catch (error) {
      console.log(error);
      alert("Update failed");
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial", background: "#f4f6f9", minHeight: "100vh" }}>
      <div
        style={{
          background: "#2c3e50",
          color: "white",
          padding: "15px 20px",
          borderRadius: "10px",
          marginBottom: "20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2 style={{ margin: 0 }}>👤 Patient Dashboard</h2>
        <button
          onClick={logout}
          style={{
            background: "#e74c3c",
            color: "white",
            border: "none",
            padding: "10px 16px",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </div>

      <div
        style={{
          background: "white",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
          marginBottom: "20px",
        }}
      >
        <h3>Add Medical Record</h3>

        <textarea
          value={data}
          placeholder="Enter medical data..."
          onChange={(e) => setData(e.target.value)}
          style={{ width: "100%", minHeight: "100px", padding: "10px" }}
        />

        <br /><br />

        <button
          onClick={addRecord}
          style={{
            background: "#3498db",
            color: "white",
            border: "none",
            padding: "10px 16px",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Save Record
        </button>
      </div>

      <div
        style={{
          background: "white",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
          marginBottom: "20px",
        }}
      >
        <h3>Select Doctor for Access</h3>

        <select
          value={selectedDoctor}
          onChange={(e) => setSelectedDoctor(e.target.value)}
          style={{ padding: "10px", minWidth: "220px" }}
        >
          <option value="">Select Doctor</option>
          {doctors.map((doctor) => (
            <option key={doctor.id} value={doctor.id}>
              {doctor.username}
            </option>
          ))}
        </select>
      </div>

      <div
        style={{
          background: "white",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
        }}
      >
        <h3>Your Records</h3>

        {records.length === 0 ? (
          <p>No records yet</p>
        ) : (
          records.map((record) => (
            <div
              key={record.id}
              style={{
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "15px",
                marginBottom: "15px",
              }}
            >
              <p><strong>Record ID:</strong> {record.id}</p>
              <p><strong>Data:</strong> {record.data}</p>

              <input
                type="text"
                placeholder="Edit data"
                value={editData[record.id] || ""}
                onChange={(e) =>
                  setEditData({
                    ...editData,
                    [record.id]: e.target.value,
                  })
                }
                style={{
                  width: "100%",
                  padding: "10px",
                  marginBottom: "10px",
                }}
              />

              <button
                onClick={() => updateRecord(record.id)}
                style={{
                  background: "#27ae60",
                  color: "white",
                  border: "none",
                  padding: "10px 16px",
                  borderRadius: "6px",
                  cursor: "pointer",
                  marginRight: "10px",
                }}
              >
                Update
              </button>

              <button
                onClick={() => grantAccess(record.id)}
                style={{
                  background: "#8e44ad",
                  color: "white",
                  border: "none",
                  padding: "10px 16px",
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
              >
                Grant Access
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default PatientDashboard;