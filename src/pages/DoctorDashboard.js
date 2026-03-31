import React, { useEffect, useState } from "react";
import API from "../services/api";

function DoctorDashboard() {
  const [records, setRecords] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editValue, setEditValue] = useState("");

  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  const fetchRecords = async () => {
    try {
      const res = await API.get("/get_records");
      setRecords(res.data || []);
    } catch (err) {
      console.log("FETCH RECORDS ERROR:", err?.response?.data || err);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  const updateRecord = async () => {
    if (!editValue.trim()) {
      alert("Enter data");
      return;
    }

    try {
      await API.put(
        `/update_record/${editId}?new_data=${encodeURIComponent(editValue)}`
      );

      alert("Updated successfully");
      setEditId(null);
      setEditValue("");
      fetchRecords();
    } catch (err) {
      console.log("UPDATE ERROR:", err?.response?.data || err);
      alert(err?.response?.data?.detail || "Update failed");
    }
  };

  return (
    <div style={{ fontFamily: "Arial", background: "#f4f6f9", minHeight: "100vh" }}>
      <div style={header}>
        <h2>🩺 Doctor Dashboard</h2>
        <div>
          <button onClick={fetchRecords} style={greenBtn}>Refresh</button>
          <button onClick={logout} style={redBtn}>Logout</button>
        </div>
      </div>

      <div style={{ padding: "20px" }}>
        <div style={card}>
          <h3>Total Records</h3>
          <p>{records.length}</p>
        </div>

        <div style={card}>
          <h3>Patient Records</h3>

          {records.length === 0 ? (
            <p>No records available</p>
          ) : (
            records.map((r) => (
              <div key={r.id} style={recordBox}>
                <p><b>ID:</b> {r.id}</p>
                <p><b>Data:</b> {r.data}</p>

                {editId === r.id ? (
                  <>
                    <textarea
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      style={textarea}
                    />
                    <button onClick={updateRecord} style={greenBtn}>Save</button>
                  </>
                ) : (
                  <button
                    onClick={() => {
                      setEditId(r.id);
                      setEditValue(r.data);
                    }}
                    style={blueBtn}
                  >
                    Edit
                  </button>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

const header = {
  background: "#1f2d3d",
  color: "white",
  padding: "15px",
  display: "flex",
  justifyContent: "space-between"
};

const card = {
  background: "white",
  padding: "20px",
  marginTop: "20px",
  borderRadius: "10px"
};

const recordBox = {
  border: "1px solid #ddd",
  padding: "10px",
  marginTop: "10px",
  borderRadius: "5px"
};

const textarea = {
  width: "100%",
  padding: "10px",
  marginBottom: "10px"
};

const blueBtn = {
  background: "#3498db",
  color: "white",
  padding: "8px",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer"
};

const greenBtn = {
  background: "#27ae60",
  color: "white",
  padding: "8px",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  marginRight: "10px"
};

const redBtn = {
  background: "#e74c3c",
  color: "white",
  padding: "8px",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer"
};

export default DoctorDashboard;