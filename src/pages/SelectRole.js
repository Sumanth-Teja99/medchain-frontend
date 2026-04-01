import React from "react";
import { useNavigate } from "react-router-dom";
import bg from "../assets/role.jpg";

function SelectRole() {
  const navigate = useNavigate();

  return (
    <div style={page(bg)}>
      <div style={overlay}>
        <div style={heroCard}>
          <div style={leftPanel}>
            <h1 style={title}>Privacy-Preserving Medical Record</h1>
            <p style={subtitle}>
              Secure blockchain-enabled hospital portal for doctors and patients.
            </p>

            <div style={badgeRow}>
              <span style={badge}>Secure Access</span>
              <span style={badge}>Blockchain Verified</span>
              <span style={badge}>Hospital Portal</span>
            </div>
          </div>

          <div style={rightPanel}>
            <h2 style={{ marginTop: 0 }}>Select Login Type</h2>
            <p style={smallText}>
              Continue as doctor or patient to access your secure dashboard.
            </p>

            <div style={cardWrap}>
              <div style={roleCard} onClick={() => navigate("/login/doctor")}>
                <div style={iconCircle}>👨‍⚕️</div>
                <h3 style={cardTitle}>Doctor Portal</h3>
                <p style={cardText}>
                  View granted records, verify blockchain integrity, and manage consultations.
                </p>
                <button style={primaryBtn}>Doctor Login</button>
              </div>

              <div style={roleCard} onClick={() => navigate("/login/patient")}>
                <div style={iconCircle}>🧑‍🦽</div>
                <h3 style={cardTitle}>Patient Portal</h3>
                <p style={cardText}>
                  Add records, grant doctor access, and manage your medical profile securely.
                </p>
                <button style={secondaryBtn}>Patient Login</button>
              </div>
            </div>
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
  background: "linear-gradient(rgba(8,15,30,0.70), rgba(8,15,30,0.78))",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "30px",
};

const heroCard = {
  width: "100%",
  maxWidth: "1180px",
  minHeight: "650px",
  display: "grid",
  gridTemplateColumns: "1.05fr 1fr",
  background: "rgba(255,255,255,0.10)",
  backdropFilter: "blur(10px)",
  WebkitBackdropFilter: "blur(10px)",
  border: "1px solid rgba(255,255,255,0.16)",
  borderRadius: "24px",
  overflow: "hidden",
  boxShadow: "0 25px 60px rgba(0,0,0,0.35)",
};

const leftPanel = {
  padding: "56px 48px",
  color: "white",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  background: "linear-gradient(135deg, rgba(19,72,145,0.70), rgba(10,22,44,0.55))",
};

const rightPanel = {
  padding: "48px 40px",
  background: "rgba(255,255,255,0.94)",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
};

const title = {
  fontSize: "42px",
  lineHeight: "1.15",
  marginBottom: "18px",
};

const subtitle = {
  fontSize: "17px",
  lineHeight: "1.7",
  color: "rgba(255,255,255,0.88)",
  maxWidth: "520px",
};

const badgeRow = {
  display: "flex",
  gap: "12px",
  flexWrap: "wrap",
  marginTop: "26px",
};

const badge = {
  padding: "10px 16px",
  borderRadius: "999px",
  background: "rgba(255,255,255,0.14)",
  border: "1px solid rgba(255,255,255,0.18)",
  fontSize: "14px",
};

const smallText = {
  color: "#64748b",
  marginTop: "-4px",
  marginBottom: "24px",
};

const cardWrap = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "18px",
};

const roleCard = {
  background: "#ffffff",
  border: "1px solid #e2e8f0",
  borderRadius: "20px",
  padding: "24px",
  boxShadow: "0 10px 28px rgba(15,23,42,0.08)",
  cursor: "pointer",
};

const iconCircle = {
  width: "58px",
  height: "58px",
  borderRadius: "50%",
  background: "#e0ecff",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "28px",
  marginBottom: "16px",
};

const cardTitle = {
  margin: "0 0 8px 0",
  color: "#0f172a",
};

const cardText = {
  color: "#64748b",
  minHeight: "72px",
  lineHeight: "1.6",
  fontSize: "14px",
};

const primaryBtn = {
  width: "100%",
  padding: "12px",
  background: "#0f62fe",
  color: "white",
  border: "none",
  borderRadius: "12px",
  fontWeight: "600",
  cursor: "pointer",
  marginTop: "10px",
};

const secondaryBtn = {
  ...primaryBtn,
  background: "#0f766e",
};

export default SelectRole;