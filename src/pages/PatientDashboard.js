import React, { useState, useEffect } from "react";
import API from "../services/api";

function PatientDashboard() {
  const [data, setData] = useState("");
  const [records, setRecords] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [editData, setEditData] = useState({});

  const token = localStorage.getItem("token");

  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  // ✅ LOAD DATA (SAFE FOR VERCEL)
  useEffect(() => {
    const loadData = async () => {
      try {
        const recordsRes = await API.get("/get_records", {
          headers: { token },
        });
        setRecords(recordsRes.data);

        const doctorsRes = await API.get("/doctors");
        setDoctors(doctorsRes.data);
      } catch (err) {
        console.log(err);
      }
    };

    loadData();
  }, []);

  // ✅ ADD RECORD
  const addRecord = async () => {
    if (!data) return alert("Enter data");

    await API.post(
      "/add_record",
      { data },
      { headers: { token } }
    );

    setData("");

    // reload
    const res = await API.get("/get_records", {
      headers: { token },
    });
    setRecords(res.data);
  };

  // ✅ GRANT ACCESS
  const grantAccess = async (recordId) => {
    if (!selectedDoctor) return alert("Select doctor");

    await API.post(
      `/grant_access?record_id=${recordId}&doctor_id=${selectedDoctor}`,
      {},
      { headers: { token } }
    );

    alert("Access granted!");
  };

  // ✅ UPDATE RECORD
  const updateRecord = async (id) => {
    const newData = editData[id];

    if (!newData) return alert("Enter new data");

    await API.put(
      `/update_record/${id}?new_data=${newData}`,
      {},
      { headers: { token } }
    );

    // reload
    const res = await API.get("/get_records", {
      headers: { token },
    });
    setRecords(res.data);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h2>👤 Patient Dashboard</h2>

      <button onClick={logout}>Logout</button>

      <hr />

      <h3>Add Medical Record</h3>

      <textarea
        value={data}
        placeholder="Enter medical data..."
        onChange={(e) => setData(e.target.value)}
      />

      <br /><br />

      <button onClick={addRecord}>Save Record</button>

      <hr />

      <h3>Select Doctor</h3>

      <select onChange={(e) => setSelectedDoctor(e.target.value)}>
        <option value="">Select Doctor</option>
        {doctors.map((d) => (
          <option key={d.id} value={d.id}>
            {d.username}
          </option>
        ))}
      </select>

      <hr />

      <h3>Your Records</h3>

      {records.length === 0 ? (
        <p>No records yet</p>
      ) : (
        records.map((r) => (
          <div
            key={r.id}
            style={{
              border: "1px solid #ccc",
              margin: "10px",
              padding: "10px",
              borderRadius: "8px",
            }}
          >
            <p><b>Data:</b> {r.data}</p>

            <input
              placeholder="Edit data"
              onChange={(e) =>
                setEditData({ ...editData, [r.id]: e.target.value })
              }
            />

            <br /><br />

            <button onClick={() => updateRecord(r.id)}>
              Update
            </button>

            <button onClick={() => grantAccess(r.id)}>
              Grant Access
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default PatientDashboard;