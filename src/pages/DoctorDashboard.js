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
    loadRecords();
  }, []);

  const updateRecord = async (id) => {
    const newData = editData[id];

    if (!newData) return alert("Enter data");

    try {
      await API.put(`/update_record/${id}?new_data=${encodeURIComponent(newData)}`);
      alert("Updated!");
      loadRecords();
    } catch (err) {
      alert("Update failed");
    }
  };

  return (
    <div className="d-flex">

      {/* SIDEBAR */}
      <div style={sidebar}>
        <h4>🏥 MedChain</h4>
        <p>Doctor Panel</p>
        <button className="btn btn-danger w-100" onClick={logout}>
          Logout
        </button>
      </div>

      {/* MAIN CONTENT */}
      <div style={{ flex: 1, padding: "20px" }}>

        {/* TOPBAR */}
        <div className="d-flex justify-content-between mb-4">
          <h2>Doctor Dashboard</h2>
        </div>

        {/* STATS */}
        <div className="row mb-4">
          <div className="col-md-4">
            <div className="card text-center p-3">
              <h5>Total Records</h5>
              <h3>{records.length}</h3>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card text-center p-3">
              <h5>Status</h5>
              <h3>Active</h3>
            </div>
          </div>
        </div>

        {/* RECORDS */}
        <div className="card p-3">
          <h4>Patient Records</h4>

          {records.length === 0 ? (
            <p>No records available</p>
          ) : (
            records.map((r) => (
              <div key={r.id} className="border p-3 mt-2 rounded">

                <p><b>ID:</b> {r.id}</p>
                <p><b>Data:</b> {r.data}</p>

                <input
                  className="form-control mb-2"
                  placeholder="Edit record"
                  value={editData[r.id] || ""}
                  onChange={(e) =>
                    setEditData({
                      ...editData,
                      [r.id]: e.target.value,
                    })
                  }
                />

                <button
                  className="btn btn-success"
                  onClick={() => updateRecord(r.id)}
                >
                  Update
                </button>

              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
}

const sidebar = {
  width: "250px",
  background: "#2c3e50",
  color: "white",
  height: "100vh",
  padding: "20px",
};

export default DoctorDashboard;