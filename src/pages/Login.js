import React, { useState } from "react";
import API from "../services/api";
import { useNavigate, useParams } from "react-router-dom";
import bg from "../assets/login.jpg";

function Login() {
  const navigate = useNavigate();
  const { role } = useParams();

  const roleLabel =
    String(role || "").toLowerCase() === "doctor" ? "Doctor" : "Patient";

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!username.trim() || !password.trim()) {
      alert("Enter username and password");
      return;
    }

    try {
      setLoading(true);

      const res = await API.post("/login", {
        username,
        password,
      });

      const backendRole = String(res.data.role || "").toLowerCase();

      localStorage.clear();
      localStorage.setItem("token", res.data.access_token);
      localStorage.setItem("username", username);
      localStorage.setItem("role", backendRole);

      if (backendRole === "patient") {
        navigate("/patient");
      } else if (backendRole === "doctor") {
        navigate("/doctor");
      } else {
        alert("Invalid role from backend");
      }
    } catch (err) {
      alert(
        err?.response?.data?.detail ||
          err?.response?.data?.msg ||
          "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={page(bg)}>
      <div style={overlay}>
        <div style={loginShell}>
          <div style={leftPanel}>
            <div style={brandBlock}>
              <div style={logoCircle}>🏥</div>
              <h1 style={title}>MedChain Secure Access</h1>
              <p style={subtitle}>
                Hospital-grade access for {roleLabel.toLowerCase()} users with
                blockchain-backed record verification and privacy controls.
              </p>
            </div>

            <div style={infoBox}>
              <div style={infoItem}>🔐 Encrypted Authentication</div>
              <div style={infoItem}>🧾 Blockchain Integrity Check</div>
              <div style={infoItem}>👨‍⚕️ Role-Based Secure Access</div>
            </div>
          </div>

          <div style={rightPanel}>
            <div style={formCard}>
              <div style={pill}>{roleLabel} Login</div>
              <h2 style={{ marginBottom: "8px" }}>Welcome Back</h2>
              <p style={muted}>
                Sign in to access your secure medical portal.
              </p>

              <label style={label}>Username</label>
              <input
                style={input}
                placeholder={`Enter ${roleLabel.toLowerCase()} username`}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />

              <label style={label}>Password</label>
              <input
                style={input}
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <button
                style={loginBtn}
                onClick={handleLogin}
                disabled={loading}
              >
                {loading ? "Signing in..." : `Login as ${roleLabel}`}
              </button>

              <div style={footerActions}>
                <button style={linkBtn} onClick={() => navigate("/register")}>
                  Create Account
                </button>
                <button style={linkBtn} onClick={() => navigate("/")}>
                  Back to Role Select
                </button>
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
  background: "linear-gradient(rgba(8,15,30,0.72), rgba(8,15,30,0.72))",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "30px",
};

const loginShell = {
  width: "100%",
  maxWidth: "1120px",
  minHeight: "650px",
  display: "grid",
  gridTemplateColumns: "1fr 0.95fr",
  borderRadius: "24px",
  overflow: "hidden",
  boxShadow: "0 25px 60px rgba(0,0,0,0.35)",
};

const leftPanel = {
  background: "linear-gradient(135deg, rgba(15,98,254,0.88), rgba(11,37,69,0.9))",
  color: "white",
  padding: "50px 46px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
};

const rightPanel = {
  background: "rgba(255,255,255,0.95)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "36px",
};

const brandBlock = {
  maxWidth: "480px",
};

const logoCircle = {
  width: "72px",
  height: "72px",
  borderRadius: "50%",
  background: "rgba(255,255,255,0.16)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "34px",
  marginBottom: "20px",
};

const title = {
  fontSize: "40px",
  lineHeight: "1.15",
  marginBottom: "14px",
};

const subtitle = {
  fontSize: "16px",
  lineHeight: "1.75",
  color: "rgba(255,255,255,0.88)",
};

const infoBox = {
  display: "grid",
  gap: "12px",
  marginTop: "20px",
};

const infoItem = {
  background: "rgba(255,255,255,0.10)",
  border: "1px solid rgba(255,255,255,0.16)",
  borderRadius: "14px",
  padding: "14px 16px",
};

const formCard = {
  width: "100%",
  maxWidth: "420px",
  background: "#ffffff",
  borderRadius: "20px",
  padding: "34px",
  boxShadow: "0 12px 30px rgba(15,23,42,0.10)",
};

const pill = {
  display: "inline-block",
  padding: "8px 14px",
  borderRadius: "999px",
  background: "#dbeafe",
  color: "#1d4ed8",
  fontWeight: "700",
  fontSize: "13px",
  marginBottom: "16px",
};

const muted = {
  color: "#64748b",
  marginTop: 0,
  marginBottom: "22px",
};

const label = {
  display: "block",
  marginBottom: "8px",
  marginTop: "12px",
  fontWeight: "600",
  color: "#334155",
};

const input = {
  width: "100%",
  padding: "13px 14px",
  borderRadius: "12px",
  border: "1px solid #cbd5e1",
  outline: "none",
  fontSize: "15px",
};

const loginBtn = {
  width: "100%",
  marginTop: "20px",
  padding: "14px",
  borderRadius: "12px",
  border: "none",
  background: "#0f62fe",
  color: "white",
  fontWeight: "700",
  cursor: "pointer",
};

const footerActions = {
  display: "flex",
  justifyContent: "space-between",
  gap: "12px",
  marginTop: "18px",
};

const linkBtn = {
  flex: 1,
  background: "#f8fafc",
  border: "1px solid #e2e8f0",
  borderRadius: "12px",
  padding: "12px",
  cursor: "pointer",
  fontWeight: "600",
};

export default Login;