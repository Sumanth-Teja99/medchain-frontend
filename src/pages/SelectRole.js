import React from "react";
import { useNavigate } from "react-router-dom";
import roleBg from "../assets/role.jpg";

function SelectRole() {
  const navigate = useNavigate();

  return (
    <div style={page(roleBg)}>
      <div style={overlay}>
        <div style={wrapper}>
          <div style={leftPanel}>
            <div style={brandBadge}>🏥 MedChain</div>
            <h1 style={title}>Privacy-Preserving Medical Record Portal</h1>
            <p style={subtitle}>
              Secure blockchain-enabled healthcare portal for patients and
              doctors. Access records, verify integrity, and communicate safely.
            </p>

            <div style={featureGrid}>
              <div style={featureCard}>
                <h3 style={featureTitle}>🔐 Secure Access</h3>
                <p style={featureText}>Role-based login for patient and doctor users.</p>
              </div>

              <div style={featureCard}>
                <h3 style={featureTitle}>⛓️ Blockchain Verified</h3>
                <p style={featureText}>Medical records are protected with hash verification.</p>
              </div>

              <div style={featureCard}>
                <h3 style={featureTitle}>💬 Communication</h3>
                <p style={featureText}>Built-in doctor-patient portal experience.</p>
              </div>

              <div style={featureCard}>
                <h3 style={featureTitle}>🏥 Hospital UI</h3>
                <p style={featureText}>Professional interface for final-year project demo.</p>
              </div>
            </div>
          </div>

          <div style={rightPanel}>
            <div style={glassCard}>
              <h2 style={rightTitle}>Select Login Type</h2>
              <p style={rightSubtitle}>
                Choose the portal you want to continue with.
              </p>

              <div style={portalCard} onClick={() => navigate("/login/doctor")}>
                <div style={iconCircle}>👨‍⚕️</div>
                <div>
                  <h3 style={portalTitle}>Doctor Portal</h3>
                  <p style={portalText}>
                    Review granted patient records, verify blockchain integrity,
                    and manage consultations.
                  </p>
                </div>
              </div>

              <div style={portalCard} onClick={() => navigate("/login/patient")}>
                <div style={iconCircle}>🧑‍⚕️</div>
                <div>
                  <h3 style={portalTitle}>Patient Portal</h3>
                  <p style={portalText}>
                    Add medical records, grant doctor access, and manage your
                    health data securely.
                  </p>
                </div>
              </div>

              <button style={registerBtn} onClick={() => navigate("/register")}>
                Create New Account
              </button>
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
  background: "linear-gradient(rgba(8,15,30,0.75), rgba(8,15,30,0.78))",
  padding: "30px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const wrapper = {
  width: "100%",
  maxWidth: "1280px",
  display: "grid",
  gridTemplateColumns: "1.2fr 0.9fr",
  gap: "28px",
  alignItems: "stretch",
};

const leftPanel = {
  color: "white",
  background: "rgba(255,255,255,0.08)",
  border: "1px solid rgba(255,255,255,0.12)",
  borderRadius: "24px",
  padding: "36px",
  backdropFilter: "blur(8px)",
};

const rightPanel = {
  display: "flex",
  alignItems: "center",
};

const brandBadge = {
  display: "inline-block",
  padding: "10px 16px",
  borderRadius: "999px",
  background: "rgba(255,255,255,0.12)",
  marginBottom: "20px",
  fontWeight: "700",
};

const title = {
  fontSize: "46px",
  lineHeight: "1.15",
  margin: "0 0 16px 0",
};

const subtitle = {
  fontSize: "17px",
  lineHeight: "1.8",
  color: "rgba(255,255,255,0.9)",
  marginBottom: "28px",
};

const featureGrid = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "16px",
};

const featureCard = {
  background: "rgba(255,255,255,0.08)",
  border: "1px solid rgba(255,255,255,0.12)",
  borderRadius: "18px",
  padding: "18px",
};

const featureTitle = {
  margin: "0 0 8px 0",
};

const featureText = {
  margin: 0,
  color: "rgba(255,255,255,0.86)",
  lineHeight: "1.6",
  fontSize: "14px",
};

const glassCard = {
  width: "100%",
  background: "rgba(255,255,255,0.94)",
  borderRadius: "24px",
  padding: "32px",
  boxShadow: "0 20px 45px rgba(0,0,0,0.25)",
};

const rightTitle = {
  margin: "0 0 10px 0",
  color: "#0f172a",
};

const rightSubtitle = {
  margin: "0 0 22px 0",
  color: "#64748b",
};

const portalCard = {
  display: "flex",
  gap: "16px",
  alignItems: "flex-start",
  background: "#ffffff",
  border: "1px solid #e2e8f0",
  borderRadius: "18px",
  padding: "20px",
  marginBottom: "16px",
  cursor: "pointer",
  boxShadow: "0 8px 20px rgba(15,23,42,0.06)",
};

const iconCircle = {
  width: "56px",
  height: "56px",
  borderRadius: "50%",
  background: "#e0ecff",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "26px",
  flexShrink: 0,
};

const portalTitle = {
  margin: "0 0 6px 0",
  color: "#0f172a",
};

const portalText = {
  margin: 0,
  color: "#64748b",
  lineHeight: "1.6",
  fontSize: "14px",
};

const registerBtn = {
  width: "100%",
  padding: "14px",
  border: "none",
  borderRadius: "14px",
  background: "#0f62fe",
  color: "white",
  fontWeight: "700",
  cursor: "pointer",
  marginTop: "10px",
};

export default SelectRole;