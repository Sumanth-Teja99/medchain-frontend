import React, { useEffect, useState } from "react";
import API from "../services/api";

function DoctorDashboard() {
  const [records, setRecords] = useState([]);
  const [editingRecordId, setEditingRecordId] = useState(null);
  const [title, setTitle] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [prescription, setPrescription] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    fetchRecords();
  }, []);

  const fetchRecords = async () => {
    try {
      const res = await API.get("/get_records");
      setRecords(res.data || []);
    } catch (err) {
      console.log(err);
    }
  };

  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
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
    <div style={{ fontFamily: "Arial", background: "#f4f6f9", minHeight: "100vh" }}>
      <div style={header}>
        <h2>🏥 MedChain Doctor Portal</h2>
        <div>
          <button style={refreshBtn} onClick={fetchRecords}>Refresh</button>
          <button style={logoutBtn} onClick={logout}>Logout</button>
        </div>
      </div>

      <div style={{ padding: "20px" }}>
        <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
          <div style={cardStyle}>
            <h3>Total Accessible Records</h3>
            <p>{records.length}</p>
          </div>

          <div style={cardStyle}>
            <h3>Status</h3>
            <p>Active</p>
          </div>
        </div>

        <div style={tableContainer}>
          <h3>📄 Authorized Patient Records</h3>

          {records.length === 0 ? (
            <p style={{ marginTop: "15px", color: "gray" }}>
              No records available. Patient must grant access.
            </p>
          ) : (
            <table style={table}>
              <thead>
                <tr style={{ background: "#ecf0f1" }}>
                  <th>Patient</th>
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
                    <td>{r.patient_username || r.patient || "-"}</td>
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

        {editingRecordId && (
          <div style={{ ...tableContainer, marginTop: "20px" }}>
            <h3>Edit Patient Record</h3>

            <input style={input} placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
            <input style={input} placeholder="Diagnosis" value={diagnosis} onChange={(e) => setDiagnosis(e.target.value)} />
            <input style={input} placeholder="Prescription" value={prescription} onChange={(e) => setPrescription(e.target.value)} />
            <textarea style={textarea} placeholder="Notes" value={notes} onChange={(e) => setNotes(e.target.value)} />

            <button style={refreshBtn} onClick={updateRecord}>Update Record</button>
          </div>
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
  alignItems: "center"
};

const logoutBtn = {
  background: "#e74c3c",
  color: "white",
  border: "none",
  padding: "8px 15px",
  borderRadius: "5px",
  cursor: "pointer",
  marginLeft: "10px"
};

const refreshBtn = {
  background: "#27ae60",
  color: "white",
  border: "none",
  padding: "8px 15px",
  borderRadius: "5px",
  cursor: "pointer"
};

const smallBtn = {
  background: "#2980b9",
  color: "white",
  border: "none",
  padding: "8px 12px",
  borderRadius: "5px",
  cursor: "pointer"
};

const cardStyle = {
  flex: 1,
  background: "#3498db",
  color: "white",
  padding: "20px",
  borderRadius: "10px",
  textAlign: "center",
  boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
};

const tableContainer = {
  background: "#fff",
  padding: "20px",
  borderRadius: "10px",
  boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
};

const table = {
  width: "100%",
  marginTop: "10px",
  borderCollapse: "collapse"
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

export default DoctorDashboard;