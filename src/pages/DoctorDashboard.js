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

  const updateRecord = async () => {
    if (!editValue) return alert("Enter data");

    try {
      const token = localStorage.getItem("token");

      await API.put(
        `/update_record/${editId}?new_data=${encodeURIComponent(editValue)}`,
        {},
        { headers: { token } }
      );

      alert("Updated successfully");
      setEditId(null);
      setEditValue("");
      fetchRecords();

    } catch {
      alert("Update failed");
    }
  };

  return (
    <div style={{ fontFamily: "Arial", background: "#f4f6f9", minHeight: "100vh" }}>

      {/* HEADER */}
      <div style={{
        background: "#1f2d3d",
        color: "white",
        padding: "20px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}>
        <h2>🩺 Doctor Dashboard</h2>

        <div>
          <button onClick={fetchRecords} style={greenBtn}>Refresh</button>
          <button onClick={logout} style={redBtn}>Logout</button>
        </div>
      </div>

      <div style={{ padding: "20px" }}>

        {/* STATS */}
        <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
          <div style={card}>
            <h3>Total Records</h3>
            <p>{records.length}</p>
          </div>

          <div style={card}>
            <h3>Status</h3>
            <p>Active</p>
          </div>
        </div>

        {/* RECORDS */}
        <div style={container}>
          <h3>📄 Patient Records</h3>

          {records.length === 0 ? (
            <p style={{ color: "gray" }}>
              No records — patient must grant access
            </p>
          ) : (
            records.map((r) => (
              <div key={r.id} style={recordBox}>

                <div>
                  <strong>ID:</strong> {r.id}
                </div>

                <div style={{ marginTop: "5px" }}>
                  <strong>Data:</strong> {r.data}
                </div>

                {editId === r.id ? (
                  <>
                    <textarea
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      style={textarea}
                    />

                    <button onClick={updateRecord} style={greenBtn}>
                      Save
                    </button>
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

/* STYLES */

const card = {
  flex: 1,
  background: "#3498db",
  color: "white",
  padding: "20px",
  borderRadius: "10px",
  textAlign: "center"
};

const container = {
  background: "#fff",
  padding: "20px",
  borderRadius: "10px",
  boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
};

const recordBox = {
  border: "1px solid #ddd",
  padding: "15px",
  borderRadius: "8px",
  marginBottom: "10px"
};

const textarea = {
  width: "100%",
  padding: "10px",
  marginTop: "10px",
  marginBottom: "10px"
};

const greenBtn = {
  background: "#27ae60",
  color: "white",
  border: "none",
  padding: "8px 12px",
  marginRight: "10px",
  borderRadius: "5px",
  cursor: "pointer"
};

const redBtn = {
  background: "#e74c3c",
  color: "white",
  border: "none",
  padding: "8px 12px",
  borderRadius: "5px",
  cursor: "pointer"
};

const blueBtn = {
  background: "#2980b9",
  color: "white",
  border: "none",
  padding: "8px 12px",
  borderRadius: "5px",
  cursor: "pointer",
  marginTop: "10px"
};

export default DoctorDashboard;