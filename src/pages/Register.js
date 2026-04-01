import React, { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import registerBg from "../assets/login.jpg"; // you can change image if needed

function Register() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("patient");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!username.trim() || !password.trim()) {
      alert("Enter all fields");
      return;
    }

    try {
      setLoading(true);

      await API.post("/register", {
        username,
        password,
        role,
      });

      alert("Registration successful");

      navigate(`/login/${role}`);
    } catch (err) {
      alert(
        err?.response?.data?.detail ||
        err?.response?.data?.msg ||
        "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={page(registerBg)}>
      <div style={overlay}>
        <div style={container}>

          {/* LEFT PANEL */}
          <div style={leftPanel}>
            <div style={logo}>🏥</div>
            <h1 style={title}>Create MedChain Account</h1>
            <p style={subtitle}>
              Register as a patient or doctor to securely manage medical records
              with blockchain protection.
            </p>

            <div style={features}>
              <div style={feature}>🔐 Secure Registration</div>
              <div style={feature}>⛓️ Blockchain Protection</div>
              <div style={feature}>👨‍⚕️ Role-Based Access</div>
            </div>
          </div>

          {/* RIGHT PANEL */}
          <div style={rightPanel}>
            <div style={card}>
              <h2>Create Account</h2>
              <p style={muted}>Fill in details to register</p>

              {/* USERNAME */}
              <label style={label}>Username</label>
              <input
                style={input}
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />

              {/* PASSWORD */}
              <label style={label}>Password</label>
              <input
                style={input}
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              {/* ROLE */}
              <label style={label}>Select Role</label>
              <select
                style={input}
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="patient">Patient</option>
                <option value="doctor">Doctor</option>
              </select>

              {/* BUTTON */}
              <button style={btn} onClick={handleRegister}>
                {loading ? "Registering..." : "Register"}
              </button>

              {/* ACTIONS */}
              <div style={actions}>
                <button style={secondaryBtn} onClick={() => navigate("/")}>
                  Back
                </button>
                <button
                  style={secondaryBtn}
                  onClick={() => navigate(`/login/${role}`)}
                >
                  Login
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

/* 🔥 STYLES */

const page = (img) => ({
  minHeight: "100vh",
  backgroundImage: `url(${img})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
});

const overlay = {
  minHeight: "100vh",
  background: "linear-gradient(rgba(8,15,30,0.75), rgba(8,15,30,0.75))",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const container = {
  width: "100%",
  maxWidth: "1100px",
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  borderRadius: "20px",
  overflow: "hidden",
};

const leftPanel = {
  background: "rgba(15,98,254,0.85)",
  color: "white",
  padding: "40px",
};

const rightPanel = {
  background: "white",
  padding: "40px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const logo = {
  fontSize: "40px",
  marginBottom: "20px",
};

const title = {
  fontSize: "32px",
};

const subtitle = {
  marginTop: "10px",
  lineHeight: "1.6",
};

const features = {
  marginTop: "30px",
};

const feature = {
  marginBottom: "10px",
};

const card = {
  width: "100%",
  maxWidth: "350px",
};

const muted = {
  color: "#666",
};

const label = {
  display: "block",
  marginTop: "15px",
};

const input = {
  width: "100%",
  padding: "10px",
  marginTop: "5px",
  borderRadius: "8px",
  border: "1px solid #ccc",
};

const btn = {
  width: "100%",
  marginTop: "20px",
  padding: "12px",
  background: "#0f62fe",
  color: "white",
  border: "none",
  borderRadius: "10px",
  cursor: "pointer",
};

const actions = {
  display: "flex",
  gap: "10px",
  marginTop: "15px",
};

const secondaryBtn = {
  flex: 1,
  padding: "10px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  cursor: "pointer",
};

export default Register;