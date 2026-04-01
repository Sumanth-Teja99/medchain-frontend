import React, { useEffect, useState } from "react";

function Settings() {
  const username = localStorage.getItem("username") || "user";
  const storageKey = `medchain_settings_${username}`;

  const [settings, setSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    darkMode: false,
    blockchainVerification: true,
    autoLogout: "30 minutes",
    language: "English",
  });

  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      const parsed = JSON.parse(saved);
      setSettings(parsed);
      applySettings(parsed);
    } else {
      localStorage.setItem(storageKey, JSON.stringify(settings));
    }
  }, []);

  const applySettings = (config) => {
    if (config.darkMode) {
      document.body.style.backgroundColor = "#121212";
      document.body.style.color = "white";
    } else {
      document.body.style.backgroundColor = "#f8fafc";
      document.body.style.color = "black";
    }
  };

  const updateSetting = (key, value) => {
    const updated = { ...settings, [key]: value };
    setSettings(updated);
    localStorage.setItem(storageKey, JSON.stringify(updated));
    applySettings(updated);

    if (key === "language") {
      alert("Language changed to " + value);
    }
  };

  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <div style={page}>
      <div style={card}>
        <h2>⚙️ Settings</h2>

        <div style={section}>
          <h3>Notifications</h3>

          <SettingRow
            label="Email Notifications"
            checked={settings.emailNotifications}
            onChange={(v) => updateSetting("emailNotifications", v)}
          />

          <SettingRow
            label="SMS Notifications"
            checked={settings.smsNotifications}
            onChange={(v) => updateSetting("smsNotifications", v)}
          />
        </div>

        <div style={section}>
          <h3>Security & Privacy</h3>

          <SettingRow
            label="Blockchain Verification"
            checked={settings.blockchainVerification}
            onChange={(v) => updateSetting("blockchainVerification", v)}
          />

          <label style={label}>Auto Logout</label>
          <select
            style={select}
            value={settings.autoLogout}
            onChange={(e) => updateSetting("autoLogout", e.target.value)}
          >
            <option>15 minutes</option>
            <option>30 minutes</option>
            <option>1 hour</option>
            <option>Never</option>
          </select>
        </div>

        <div style={section}>
          <h3>Display</h3>

          <SettingRow
            label="Dark Mode"
            checked={settings.darkMode}
            onChange={(v) => updateSetting("darkMode", v)}
          />

          <label style={label}>Language</label>
          <select
            style={select}
            value={settings.language}
            onChange={(e) => updateSetting("language", e.target.value)}
          >
            <option>English</option>
            <option>Telugu</option>
            <option>Hindi</option>
          </select>
        </div>

        <div style={section}>
          <h3>Account</h3>
          <button onClick={logout} style={logoutBtn}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

function SettingRow({ label, checked, onChange }) {
  return (
    <div style={row}>
      <span>{label}</span>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
    </div>
  );
}

const page = {
  minHeight: "100vh",
  padding: "30px",
  background: "#f8fafc",
};

const card = {
  maxWidth: "720px",
  margin: "0 auto",
  background: "rgba(255,255,255,0.96)",
  borderRadius: "18px",
  padding: "28px",
  boxShadow: "0 12px 28px rgba(15,23,42,0.10)",
};

const section = {
  marginTop: "24px",
};

const row = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "12px 0",
  borderBottom: "1px solid #e2e8f0",
};

const label = {
  display: "block",
  marginTop: "14px",
  marginBottom: "8px",
  fontWeight: "600",
};

const select = {
  width: "100%",
  padding: "12px",
  borderRadius: "10px",
  border: "1px solid #cbd5e1",
};

const logoutBtn = {
  background: "#dc2626",
  color: "white",
  border: "none",
  padding: "12px 18px",
  borderRadius: "10px",
  cursor: "pointer",
};

export default Settings;