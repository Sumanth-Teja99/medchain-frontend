import React, { useState, useEffect } from "react";
import API from "../services/api";

function PatientDashboard() {
  const [title, setTitle] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [prescription, setPrescription] = useState("");
  const [notes, setNotes] = useState("");
  const [records, setRecords] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [doctorUsername, setDoctorUsername] = useState("");
  const [editingRecordId, setEditingRecordId] = useState(null);

  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  const fetchRecords = async () => {
    try {
      const res = await API.get("/get_records");
      setRecords(res.data || []);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchDoctors = async () => {
    try {
      const res = await API.get("/doctors");
      setDoctors(res.data || []);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchRecords();
    fetchDoctors();
  }, []);

  const addRecord = async () => {
    try {
      await API.post("/add_record", {
        title,
        diagnosis,
        prescription,
        notes,
      });

      alert("Record added");
      setTitle("");
      setDiagnosis("");
      setPrescription("");
      setNotes("");
      fetchRecords();
    } catch (err) {
      alert(err.response?.data?.detail || "Failed to add record");
    }
  };

  const grantAccess = async () => {
    try {
      await API.post("/grant_access", {
        doctor_username: doctorUsername,
      });

      alert("Access granted");
    } catch (err) {
      alert(err.response?.data?.detail || "Failed to grant access");
    }
  };

  const startEdit = (record) => {
    setEditingRecordId(record.record_id || record.id);
    setTitle(record.title || "");
    setDiagnosis(record.diagnosis || "");
    setPrescription(record.prescription || "");
    setNotes(record.notes || "");
  };

  const updateRecord = async () => {
    try {
      await API.put("/update_record", {
        record_id: editingRecordId,
        title,
        diagnosis,
        prescription,
        notes,
      });

      alert("Record updated");
      setEditingRecordId(null);
      setTitle("");
      setDiagnosis("");
      setPrescription("");
      setNotes("");
      fetchRecords();
    } catch (err) {
      alert(err.response?.data?.detail || "Failed to update record");
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial", background: "#f4f6f9", minHeight: "100vh" }}>
      <div style={header}>
        <h2>🏥 MedChain Patient Portal</h2>
        <button style={logoutBtn} onClick={logout}>Logout</button>
      </div>

      <div style={{ display: "flex", gap: "20px", marginTop: "20px", marginBottom: "20px" }}>
        <div style={cardStyle}>
          <h3>Total Records</h3>
          <p>{records.length}</p>
        </div>
        <div style={cardStyle}>
          <h3>Available Doctors</h3>
          <p>{doctors.length}</p>
        </div>
      </div>

      <div style={section}>
        <h3>{editingRecordId ? "Edit Medical Record" : "Add Medical Record"}</h3>

        <input style={input} placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <input style={input} placeholder="Diagnosis" value={diagnosis} onChange={(e) => setDiagnosis(e.target.value)} />
        <input style={input} placeholder="Prescription" value={prescription} onChange={(e) => setPrescription(e.target.value)} />
        <textarea style={textarea} placeholder="Notes" value={notes} onChange={(e) => setNotes(e.target.value)} />

        {editingRecordId ? (
          <button style={button} onClick={updateRecord}>Update Record</button>
        ) : (
          <button style={button} onClick={addRecord}>Add Record</button>
        )}
      </div>

      <div style={section}>
        <h3>Grant Doctor Access</h3>

        <select style={input} value={doctorUsername} onChange={(e) => setDoctorUsername(e.target.value)}>
          <option value="">Select Doctor</option>
          {doctors.map((doctor, index) => (
            <option key={doctor.username || index} value={doctor.username}>
              {doctor.username}
            </option>
          ))}
        </select>

        <button style={button} onClick={grantAccess}>Grant Access</button>
      </div>

      <div style={section}>
        <h3>Your Records</h3>

        {records.length === 0 ? (
          <p>No records found.</p>
        ) : (
          <table style={table}>
            <thead>
              <tr style={{ background: "#ecf0f1" }}>
                <th>Title</th>
                <th>Diagnosis</th>
                <th>Prescription</th>
                <th>Notes</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
              {records.map((r) => (
                <tr key={r.record_id || r.id}>
                  <td>{r.title || "-"}</td>
                  <td>{r.diagnosis || "-"}</td>
                  <td>{r.prescription || "-"}</td>
                  <td>{r.notes || "-"}</td>
                  <td>
                    <button style={smallBtn} onClick={() => startEdit(r)}>Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

const header = {
  background: "#2c3e50",
  color: "white",
  padding: "15px 20px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const logoutBtn = {
  background: "#e74c3c",
  color: "white",
  border: "none",
  padding: "10px 16px",
  borderRadius: "6px",
  cursor: "pointer",
};

const cardStyle = {
  flex: 1,
  background: "#3498db",
  color: "white",
  padding: "20px",
  borderRadius: "10px",
  textAlign: "center",
};

const section = {
  background: "white",
  padding: "20px",
  borderRadius: "10px",
  marginBottom: "20px",
  boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
};

const input = {
  width: "100%",
  padding: "12px",
  marginBottom: "12px",
  borderRadius: "6px",
  border: "1px solid #ccc",
};

const textarea = {
  width: "100%",
  padding: "12px",
  minHeight: "100px",
  marginBottom: "12px",
  borderRadius: "6px",
  border: "1px solid #ccc",
};

const button = {
  background: "#2ecc71",
  color: "white",
  border: "none",
  padding: "12px 18px",
  borderRadius: "6px",
  cursor: "pointer",
};

const smallBtn = {
  background: "#2980b9",
  color: "white",
  border: "none",
  padding: "8px 12px",
  borderRadius: "5px",
  cursor: "pointer",
};

const table = {
  width: "100%",
  borderCollapse: "collapse",
};

export default PatientDashboard;