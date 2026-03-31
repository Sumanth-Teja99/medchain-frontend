import React, { useEffect, useState } from "react";
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

  const loadData = async () => {
    try {
      const recordsRes = await API.get("/get_records");
      setRecords(recordsRes.data || []);

      const doctorsRes = await API.get("/doctors");
      setDoctors(doctorsRes.data || []);
    } catch (error) {
      console.log("LOAD DATA ERROR:", error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const addRecord = async () => {
    if (!data.trim()) {
      alert("Enter data");
      return;
    }

    try {
      await API.post("/add_record", { data });
      setData("");
      await loadData();
      alert("Record added successfully");
    } catch (error) {
      console.log("ADD RECORD ERROR:", error?.response?.data || error);
      alert(error?.response?.data?.detail || "Failed to add record");
    }
  };

  const grantAccess = async (recordId) => {
    if (!selectedDoctor) {
      alert("Select doctor");
      return;
    }

    try {
      await API.post(
        `/grant_access?record_id=${recordId}&doctor_id=${selectedDoctor}`
      );
      alert("Access granted!");
    } catch (error) {
      console.log("GRANT ACCESS ERROR:", error?.response?.data || error);
      alert(error?.response?.data?.detail || "Grant access failed");
    }
  };

  const updateRecord = async (recordId) => {
    const newData = editData[recordId];

    if (!newData || !newData.trim()) {
      alert("Enter new data");
      return;
    }

    try {
      await API.put(
        `/update_record/${recordId}?new_data=${encodeURIComponent(newData)}`
      );
      await loadData();
      alert("Record updated");
    } catch (error) {
      console.log("UPDATE ERROR:", error?.response?.data || error);
      alert(error?.response?.data?.detail || "Update failed");
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial", background: "#f4f6f9", minHeight: "100vh" }}>
      <div style={header}>
        <h2>👤 Patient Dashboard</h2>
        <button onClick={logout} style={redBtn}>Logout</button>
      </div>

      <div style={card}>
        <h3>Add Medical Record</h3>
        <textarea
          value={data}
          placeholder="Enter medical data..."
          onChange={(e) => setData(e.target.value)}
          style={textarea}
        />
        <button onClick={addRecord} style={blueBtn}>Save Record</button>
      </div>

      <div style={card}>
        <h3>Select Doctor for Access</h3>
        <select
          value={selectedDoctor}
          onChange={(e) => setSelectedDoctor(e.target.value)}
          style={select}
        >
          <option value="">Select Doctor</option>
          {doctors.map((doctor) => (
            <option key={doctor.id} value={doctor.id}>
              {doctor.username}
            </option>
          ))}
        </select>
      </div>

      <div style={card}>
        <h3>Your Records</h3>

        {records.length === 0 ? (
          <p>No records yet</p>
        ) : (
          records.map((record) => (
            <div key={record.id} style={recordBox}>
              <p><b>ID:</b> {record.id}</p>
              <p><b>Data:</b> {record.data}</p>

              <input
                value={editData[record.id] || ""}
                onChange={(e) =>
                  setEditData({
                    ...editData,
                    [record.id]: e.target.value,
                  })
                }
                placeholder="Edit data"
                style={input}
              />

              <div>
                <button onClick={() => updateRecord(record.id)} style={greenBtn}>
                  Update
                </button>
                <button onClick={() => grantAccess(record.id)} style={purpleBtn}>
                  Grant Access
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

const header = {
  background: "#2c3e50",
  color: "white",
  padding: "15px",
  display: "flex",
  justifyContent: "space-between",
};

const card = {
  background: "white",
  padding: "20px",
  marginTop: "20px",
  borderRadius: "10px",
  boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
};

const textarea = {
  width: "100%",
  minHeight: "100px",
  padding: "10px",
  marginBottom: "10px"
};

const input = {
  width: "100%",
  padding: "8px",
  marginBottom: "10px"
};

const select = {
  padding: "10px",
  width: "220px"
};

const blueBtn = {
  background: "#3498db",
  color: "white",
  padding: "8px 12px",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer"
};

const greenBtn = {
  background: "#27ae60",
  color: "white",
  padding: "8px 12px",
  marginRight: "10px",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer"
};

const purpleBtn = {
  background: "#8e44ad",
  color: "white",
  padding: "8px 12px",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer"
};

const redBtn = {
  background: "#e74c3c",
  color: "white",
  padding: "8px 12px",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer"
};

const recordBox = {
  border: "1px solid #ddd",
  padding: "10px",
  marginTop: "10px",
  borderRadius: "5px"
};

export default PatientDashboard;