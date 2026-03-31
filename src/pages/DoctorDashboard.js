import React, { useEffect, useState } from "react";
import API from "../services/api";

function DoctorDashboard() {
  const [records, setRecords] = useState([]);
  const [editData, setEditData] = useState({});

  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  const loadRecords = async () => {
    try {
      const res = await API.get("/get_records");
      setRecords(res.data || []);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("role") !== "doctor") {
      alert("Please login as Doctor");
      localStorage.clear();
      window.location.href = "/login/Doctor";
      return;
    }

    loadRecords();
  }, []);

  const updateRecord = async (id) => {
    const newData = editData[id];

    if (!newData || !newData.trim()) {
      alert("Enter data");
      return;
    }

    try {
      await API.put(`/update_record/${id}?new_data=${encodeURIComponent(newData)}`);
      alert("Updated successfully");
      loadRecords();
    } catch (err) {
      alert(err?.response?.data?.detail || "Update failed");
    }
  };

  return (
    <div style={{ padding: "20px", background: "#f4f6f9", minHeight: "100vh" }}>
      <div style={header}>
        <h2>👨‍⚕️ Doctor Dashboard</h2>
        <button onClick={logout} style={logoutBtn}>Logout</button>
      </div>

      <div style={card}>
        <h3>Accessible Patient Records</h3>

        {records.length === 0 ? (
          <p>No records available</p>
        ) : (
          records.map((record) => (
            <div key={record.id} style={recordBox}>
              <p><b>ID:</b> {record.id}</p>
              <p><b>Data:</b> {record.data}</p>

              <input
                placeholder="Edit record"
                value={editData[record.id] || ""}
                onChange={(e) =>
                  setEditData({
                    ...editData,
                    [record.id]: e.target.value,
                  })
                }
                style={input}
              />

              <button
                onClick={() => updateRecord(record.id)}
                style={updateBtn}
              >
                Update Record
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

const header = {
  display: "flex",
  justifyContent: "space-between",
  background: "#2c3e50",
  color: "white",
  padding: "15px",
};

const card = {
  background: "white",
  padding: "20px",
  marginTop: "20px",
  borderRadius: "10px",
};

const recordBox = {
  border: "1px solid #ddd",
  padding: "10px",
  marginTop: "10px",
  borderRadius: "6px",
};

const input = {
  width: "100%",
  padding: "8px",
  marginTop: "10px",
};

const updateBtn = {
  marginTop: "10px",
  background: "#27ae60",
  color: "white",
  border: "none",
  padding: "8px 12px",
  borderRadius: "5px",
  cursor: "pointer",
};

const logoutBtn = {
  background: "#e74c3c",
  color: "white",
  border: "none",
  padding: "8px 12px",
  borderRadius: "5px",
  cursor: "pointer",
};

export default DoctorDashboard;