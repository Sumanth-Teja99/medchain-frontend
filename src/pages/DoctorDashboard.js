import React, { useEffect, useState } from "react";
import API from "../services/api";

function DoctorDashboard() {
  const [records, setRecords] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [newData, setNewData] = useState("");

  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  const fetchRecords = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.get("/get_records", {
        headers: { token }
      });

      setRecords(res.data || []);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  const startEdit = (record) => {
    setEditingId(record.id);
    setNewData(record.data);
  };

  const updateRecord = async () => {
    if (!newData) return alert("Enter data");

    try {
      const token = localStorage.getItem("token");

      await API.put(
        `/update_record/${editingId}?new_data=${encodeURIComponent(newData)}`,
        {},
        { headers: { token } }
      );

      alert("Record updated");

      setEditingId(null);
      setNewData("");
      fetchRecords();

    } catch (err) {
      alert("Update failed");
    }
  };

  return (
    <div style={{ fontFamily: "Arial", background: "#f4f6f9", minHeight: "100vh" }}>

      {/* HEADER */}
      <div style={header}>
        <h2>🩺 MedChain Doctor Dashboard</h2>
        <div>
          <button style={refreshBtn} onClick={fetchRecords}>Refresh</button>
          <button style={logoutBtn} onClick={logout}>Logout</button>
        </div>
      </div>

      <div style={{ padding: "20px" }}>

        {/* CARDS */}
        <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
          <div style={cardStyle}>
            <h3>Total Records</h3>
            <p>{records.length}</p>
          </div>

          <div style={cardStyle}>
            <h3>Status</h3>
            <p>Active</p>
          </div>
        </div>

        {/* TABLE */}
        <div style={tableContainer}>
          <h3>📄 Authorized Patient Records</h3>

          {records.length === 0 ? (
            <p style={{ marginTop: "15px", color: "gray" }}>
              No records available (patient must grant access)
            </p>
          ) : (
            <table style={table}>
              <thead>
                <tr style={{ background: "#ecf0f1" }}>
                  <th>ID</th>
                  <th>Data</th>
                  <th>Edit</th>
                </tr>
              </thead>

              <tbody>
                {records.map((r) => (
                  <tr key={r.id}>
                    <td>{r.id}</td>
                    <td>{r.data}</td>
                    <td>
                      <button style={smallBtn} onClick={() => startEdit(r)}>
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* EDIT SECTION */}
        {editingId && (
          <div style={{ ...tableContainer, marginTop: "20px" }}>
            <h3>Edit Record</h3>

            <textarea
              style={textarea}
              value={newData}
              onChange={(e) => setNewData(e.target.value)}
            />

            <button style={refreshBtn} onClick={updateRecord}>
              Update Record
            </button>
          </div>
        )}

      </div>
    </div>
  );
}

/* STYLES */

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
  textAlign: "center"
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

const textarea = {
  width: "100%",
  padding: "12px",
  minHeight: "100px",
  marginBottom: "12px",
  borderRadius: "6px",
  border: "1px solid #ccc"
};

export default DoctorDashboard;