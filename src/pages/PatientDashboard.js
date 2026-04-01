import React, { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import patientBg from "../assets/patient.jpg";

function PatientDashboard() {
  const navigate = useNavigate();

  const [data, setData] = useState("");
  const [records, setRecords] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [editData, setEditData] = useState({});
  const [verifyResult, setVerifyResult] = useState(null);

  const loadData = async () => {
    try {
      const recordsRes = await API.get("/get_records");
      setRecords(recordsRes.data || []);

      const doctorsRes = await API.get("/doctors");
      setDoctors(doctorsRes.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const addRecord = async () => {
    if (!data.trim()) return alert("Enter data");

    try {
      await API.post("/add_record", { data });
      setData("");
      await loadData();
      alert("Record added successfully");
    } catch (error) {
      alert(error?.response?.data?.detail || "Failed to add record");
    }
  };

  const grantAccess = async (id) => {
    if (!selectedDoctor) return alert("Select doctor");

    try {
      await API.post(`/grant_access?record_id=${id}&doctor_id=${selectedDoctor}`);
      alert("Access granted");
    } catch (error) {
      alert(error?.response?.data?.detail || "Grant access failed");
    }
  };

  const updateRecord = async (id) => {
    const newData = editData[id];
    if (!newData || !newData.trim()) return alert("Enter new data");

    try {
      await API.put(`/update_record/${id}?new_data=${encodeURIComponent(newData)}`);
      await loadData();
      alert("Record updated");
    } catch (error) {
      alert(error?.response?.data?.detail || "Update failed");
    }
  };

  const verifyBlockchain = async () => {
    try {
      const res = await API.get("/verify_chain");
      setVerifyResult(res.data);
    } catch {
      alert("Verification failed");
    }
  };

  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <div style={page(patientBg)}>
      <div style={overlay}>
        <div style={sidebar}>
          <h3 style={{ marginTop: 0 }}>🏥 MedChain</h3>
          <p style={panelLabel}>Patient Panel</p>

          <button onClick={() => navigate("/chat")} style={menuBtn}>Chat</button>
          <button onClick={() => navigate("/profile")} style={menuBtn}>Profile</button>
          <button onClick={() => navigate("/settings")} style={menuBtn}>Settings</button>

          <button onClick={logout} style={logoutBtn}>Logout</button>
        </div>

        <div style={main}>
          <div style={topBar}>
            <div>
              <h2 style={{ margin: 0 }}>Patient Dashboard</h2>
              <p style={subtext}>Manage your records and grant doctor access securely.</p>
            </div>
          </div>

          <div style={statsRow}>
            <div style={statCard}>
              <h4>Total Records</h4>
              <div style={statValue}>{records.length}</div>
            </div>
            <div style={statCard}>
              <h4>Blockchain Status</h4>
              <div style={statValue}>
                {verifyResult ? (verifyResult.chain_valid ? "Valid" : "Broken") : "Unchecked"}
              </div>
            </div>
          </div>

          <div style={card}>
            <h3>Add Medical Record</h3>
            <textarea
              value={data}
              onChange={(e) => setData(e.target.value)}
              placeholder="Enter medical data..."
              style={textarea}
            />
            <div style={actionRow}>
              <button style={primaryBtn} onClick={addRecord}>Add Record</button>
              <button style={secondaryBtn} onClick={verifyBlockchain}>Verify Blockchain</button>
            </div>

            {verifyResult && (
              <div style={verifyBox}>
                <h4 style={{ margin: "0 0 8px 0" }}>
                  {verifyResult.chain_valid ? "Blockchain Valid ✅" : "Blockchain Broken ❌"}
                </h4>
                <p style={{ margin: 0 }}>Total Records: {verifyResult.total_records}</p>
              </div>
            )}
          </div>

          <div style={card}>
            <h3>Select Doctor for Access</h3>
            <select
              value={selectedDoctor}
              onChange={(e) => setSelectedDoctor(e.target.value)}
              style={select}
            >
              <option value="">Select Doctor</option>
              {doctors.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.username}
                </option>
              ))}
            </select>
          </div>

          <div style={card}>
            <h3>Your Records</h3>

            {records.length === 0 ? (
              <p style={emptyText}>No records available yet.</p>
            ) : (
              records.map((r) => (
                <div key={r.id} style={recordBox}>
                  <p><b>Record ID:</b> {r.id}</p>
                  <p><b>Data:</b> {r.data}</p>
                  <p><b>Previous Hash:</b> {r.previous_hash}</p>
                  <p><b>Record Hash:</b> {r.record_hash}</p>
                  <p><b>Status:</b> {r.verified ? "Verified ✅" : "Tampered ❌"}</p>

                  <input
                    value={editData[r.id] || ""}
                    onChange={(e) =>
                      setEditData({
                        ...editData,
                        [r.id]: e.target.value,
                      })
                    }
                    placeholder="Edit record data"
                    style={input}
                  />

                  <div style={actionRow}>
                    <button style={successBtn} onClick={() => updateRecord(r.id)}>
                      Update Record
                    </button>
                    <button style={purpleBtn} onClick={() => grantAccess(r.id)}>
                      Grant Access
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const page = (img) => ({
  minHeight: "100vh",
  backgroundImage: `url(${img})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
});

const overlay = {
  minHeight: "100vh",
  display: "flex",
  background: "rgba(0,0,0,0.50)",
};

const sidebar = {
  width: "230px",
  background: "rgba(20,33,52,0.92)",
  color: "white",
  padding: "22px",
};

const panelLabel = {
  color: "#cbd5e1",
  marginTop: "-6px",
};

const menuBtn = {
  display: "block",
  width: "100%",
  margin: "10px 0",
  padding: "12px",
  border: "none",
  borderRadius: "10px",
  background: "#334155",
  color: "white",
  cursor: "pointer",
  textAlign: "left",
};

const logoutBtn = {
  ...menuBtn,
  marginTop: "20px",
  background: "#dc2626",
};

const main = {
  flex: 1,
  padding: "24px",
  color: "white",
};

const topBar = {
  marginBottom: "18px",
};

const subtext = {
  marginTop: "6px",
  color: "#e2e8f0",
};

const statsRow = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "16px",
  marginBottom: "18px",
};

const statCard = {
  background: "rgba(255,255,255,0.14)",
  border: "1px solid rgba(255,255,255,0.16)",
  borderRadius: "16px",
  padding: "18px",
};

const statValue = {
  fontSize: "26px",
  fontWeight: "700",
  marginTop: "8px",
};

const card = {
  background: "rgba(255,255,255,0.92)",
  color: "#0f172a",
  padding: "18px",
  borderRadius: "16px",
  marginTop: "18px",
  boxShadow: "0 10px 25px rgba(0,0,0,0.12)",
};

const textarea = {
  width: "100%",
  minHeight: "100px",
  borderRadius: "12px",
  border: "1px solid #cbd5e1",
  padding: "12px",
};

const input = {
  width: "100%",
  marginTop: "10px",
  marginBottom: "10px",
  padding: "12px",
  borderRadius: "10px",
  border: "1px solid #cbd5e1",
};

const select = {
  width: "100%",
  padding: "12px",
  borderRadius: "10px",
  border: "1px solid #cbd5e1",
};

const actionRow = {
  display: "flex",
  gap: "12px",
  flexWrap: "wrap",
  marginTop: "12px",
};

const primaryBtn = {
  padding: "12px 16px",
  background: "#0f62fe",
  color: "white",
  border: "none",
  borderRadius: "10px",
  cursor: "pointer",
};

const secondaryBtn = {
  ...primaryBtn,
  background: "#0f766e",
};

const successBtn = {
  ...primaryBtn,
  background: "#16a34a",
};

const purpleBtn = {
  ...primaryBtn,
  background: "#7c3aed",
};

const verifyBox = {
  marginTop: "14px",
  padding: "14px",
  background: "#eef6ff",
  borderRadius: "12px",
};

const recordBox = {
  border: "1px solid #e2e8f0",
  borderRadius: "14px",
  padding: "14px",
  marginTop: "14px",
  background: "#ffffff",
};

const emptyText = {
  color: "#64748b",
};

export default PatientDashboard;