import React, { useEffect, useState } from "react";
import API from "../services/api";

function DoctorDashboard() {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    fetchRecords();
  }, []);

  const fetchRecords = async () => {
    try {
      const res = await API.get("/get_records", {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      setRecords(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <div style={{ fontFamily: "Arial", background: "#f4f6f9", minHeight: "100vh" }}>

      {/* HEADER */}
      <div style={header}>
        <h2>🏥 MedChain Doctor Portal</h2>
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
            <h3>Accessible Patients</h3>
            <p>{records.length}</p>
          </div>

          <div style={cardStyle}>
            <h3>Status</h3>
            <p>Active</p>
          </div>

        </div>

        {/* TABLE */}
        <div style={tableContainer}>
          <h3>📄 Patient Medical Records</h3>

          {records.length === 0 ? (
            <p style={{ marginTop: "15px", color: "gray" }}>
              No records available. Patient must grant access.
            </p>
          ) : (
            <table style={table}>
              <thead>
                <tr style={{ background: "#ecf0f1" }}>
                  <th>ID</th>
                  <th>Medical Data</th>
                  <th>Blockchain Hash</th>
                </tr>
              </thead>
              <tbody>
                {records.map((r) => (
                  <tr key={r.id}>
                    <td>{r.id}</td>
                    <td>{r.data}</td>
                    <td style={{ fontSize: "12px" }}>{r.hash}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

      </div>
    </div>
  );
}

/* 🔥 STYLES */

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

export default DoctorDashboard;