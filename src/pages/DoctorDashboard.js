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

  return (
    <div style={{ fontFamily: "Arial", padding: "20px" }}>
      
      {/* NAVBAR */}
      <div style={{
        background: "#2c3e50",
        color: "white",
        padding: "15px",
        borderRadius: "8px",
        marginBottom: "20px"
      }}>
        <h2>🏥 MedChain Doctor Dashboard</h2>
      </div>

      {/* CARDS */}
      <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
        
        <div style={cardStyle}>
          <h3>Total Records</h3>
          <p>{records.length}</p>
        </div>

        <div style={cardStyle}>
          <h3>Patients</h3>
          <p>{records.length}</p>
        </div>

        <div style={cardStyle}>
          <h3>Status</h3>
          <p>Active</p>
        </div>

      </div>

      {/* TABLE */}
      <div style={{
        background: "#fff",
        padding: "20px",
        borderRadius: "8px",
        boxShadow: "0 0 10px rgba(0,0,0,0.1)"
      }}>
        <h3>📄 Medical Records</h3>

        <table style={{ width: "100%", marginTop: "10px" }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Data</th>
              <th>Hash</th>
            </tr>
          </thead>
          <tbody>
            {records.map((r) => (
              <tr key={r.id}>
                <td>{r.id}</td>
                <td>{r.data}</td>
                <td>{r.hash}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}

const cardStyle = {
  flex: 1,
  background: "#3498db",
  color: "white",
  padding: "20px",
  borderRadius: "10px",
  textAlign: "center"
};

export default DoctorDashboard;