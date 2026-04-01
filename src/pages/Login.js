import React, { useState } from "react";
import API from "../services/api";
import { useNavigate, useParams } from "react-router-dom";
import loginBg from "../assets/login.jpg";

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
    <div style={page(loginBg)}>
      <div style={overlay}>
        <div style={shell}>
          <div style={leftPanel}>
            <div style={logo}>🏥</div>
            <h1 style={headline}>Secure {roleLabel} Login</h1>
            <p style={description}>
              Sign in to continue to the MedChain hospital portal with protected,
              blockchain-verified healthcare records.
            </p>

            <div style={benefits}>
              <div style={benefit}>🔐 Encrypted authentication</div>
              <div style={benefit}>📁 Role-based record access</div>
              <div style={benefit}>⛓️ Blockchain integrity verification</div>
            </div>
          </div>

          <div style={rightPanel}>
            <div style={formCard}>
              <div style={pill}>{roleLabel} Portal</div>
              <h2 style={{ marginBottom: "8px" }}>Welcome Back</h2>
              <p style={muted}>
                Enter your account details to continue.
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

              <button style={loginBtn} onClick={handleLogin} disabled={loading}>
                {loading ? "Signing in..." : `Login as ${roleLabel}`}
              </button>

              <div style={actionRow}>
                <button style={secondaryBtn} onClick={() => navigate("/register")}>
                  Create Account
                </button>
                <button style={secondaryBtn} onClick={() => navigate("/")}>
                  Back
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
  background: "linear-gradient(rgba(8,15,30,0.72), rgba(8,15,30,0.76))",
  padding: "30px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const shell = {
  width: "100%",
  maxWidth: "1180px",
  display: "grid",
  gridTemplateColumns: "1fr 0.95fr",
  borderRadius: "26px",
  overflow: "hidden",
  boxShadow: "0 25px 60px rgba(0,0,0,0.35)",
};

const leftPanel = {
  background: "linear-gradient(135deg, rgba(15,98,254,0.86), rgba(11,37,69,0.92))",
  color: "white",
  padding: "46px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
};

const rightPanel = {
  background: "rgba(255,255,255,0.95)",
  padding: "40px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const logo = {
  width: "72px",
  height: "72px",
  borderRadius: "50%",
  background: "rgba(255,255,255,0.16)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "34px",
  marginBottom: "18px",
};

const headline = {
  fontSize: "42px",
  lineHeight: "1.15",
  margin: "0 0 14px 0",
};

const description = {
  color: "rgba(255,255,255,0.9)",
  lineHeight: "1.8",
  fontSize: "16px",
  marginBottom: "22px",
};

const benefits = {
  display: "grid",
  gap: "12px",
};

const benefit = {
  background: "rgba(255,255,255,0.10)",
  border: "1px solid rgba(255,255,255,0.15)",
  borderRadius: "14px",
  padding: "14px 16px",
};

const formCard = {
  width: "100%",
  maxWidth: "420px",
  background: "white",
  borderRadius: "22px",
  padding: "32px",
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
  marginBottom: "20px",
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

const actionRow = {
  display: "flex",
  gap: "12px",
  marginTop: "16px",
};

const secondaryBtn = {
  flex: 1,
  background: "#f8fafc",
  border: "1px solid #e2e8f0",
  borderRadius: "12px",
  padding: "12px",
  cursor: "pointer",
  fontWeight: "600",
};

export default Login;