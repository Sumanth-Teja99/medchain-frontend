import React, { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import doctorBg from "../assets/doctor.jpg";

function DoctorDashboard() {
  const navigate = useNavigate();

  const [records, setRecords] = useState([]);
  const [editData, setEditData] = useState({});
  const [verifyResult, setVerifyResult] = useState(null);

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
    if (!newData || !newData.trim()) return alert("Enter data");

    try {
      await API.put(`/update_record/${id}?new_data=${encodeURIComponent(newData)}`);
      await loadRecords();
      alert("Record updated");
    } catch (err) {
      alert(err?.response?.data?.detail || "Update failed");
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
    <div style={page(doctorBg)}>
      <div style={overlay}>
        <div style={sidebar}>
          <h3 style={{ marginTop: 0 }}>🏥 MedChain</h3>
          <p style={panelLabel}>Doctor Panel</p>

          <button onClick={() => navigate("/chat")} style={menuBtn}>Chat</button>
          <button onClick={() => navigate("/profile")} style={menuBtn}>Profile</button>
          <button onClick={() => navigate("/settings")} style={menuBtn}>Settings</button>

          <button onClick={logout} style={logoutBtn}>Logout</button>
        </div>

        <div style={main}>
          <div style={topBar}>
            <div>
              <h2 style={{ margin: 0 }}>Doctor Dashboard</h2>
              <p style={subtext}>Review accessible patient records and verify blockchain integrity.</p>
            </div>
          </div>

          <div style={statsRow}>
            <div style={statCard}>
              <h4>Total Accessible Records</h4>
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
            <div style={actionRow}>
              <button style={primaryBtn} onClick={verifyBlockchain}>
                Verify Blockchain
              </button>
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
            <h3>Authorized Patient Records</h3>

            {records.length === 0 ? (
              <p style={emptyText}>No records available.</p>
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

                  <button style={successBtn} onClick={() => updateRecord(r.id)}>
                    Update Record
                  </button>
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
  background: "rgba(0,0,0,0.52)",
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

const actionRow = {
  display: "flex",
  gap: "12px",
  flexWrap: "wrap",
};

const primaryBtn = {
  padding: "12px 16px",
  background: "#0f62fe",
  color: "white",
  border: "none",
  borderRadius: "10px",
  cursor: "pointer",
};

const successBtn = {
  padding: "12px 16px",
  background: "#16a34a",
  color: "white",
  border: "none",
  borderRadius: "10px",
  cursor: "pointer",
  marginTop: "8px",
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

const input = {
  width: "100%",
  marginTop: "10px",
  marginBottom: "10px",
  padding: "12px",
  borderRadius: "10px",
  border: "1px solid #cbd5e1",
};

const emptyText = {
  color: "#64748b",
};

export default DoctorDashboard;