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
      setSettings(JSON.parse(saved));
    } else {
      localStorage.setItem(storageKey, JSON.stringify(settings));
    }
  }, [storageKey]);

  const updateSetting = (key, value) => {
    const next = { ...settings, [key]: value };
    setSettings(next);
    localStorage.setItem(storageKey, JSON.stringify(next));
  };

  const clearSession = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <div style={page}>
      <h2 style={{ marginBottom: "18px" }}>⚙️ Settings</h2>

      <div style={card}>
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

      <div style={card}>
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

      <div style={card}>
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

      <div style={card}>
        <h3>Account</h3>
        <button style={dangerBtn} onClick={clearSession}>
          Logout All Sessions
        </button>
      </div>
    </div>
  );
}

function SettingRow({ label, checked, onChange }) {
  return (
    <div style={row}>
      <span>{label}</span>
      <label style={switchWrap}>
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
        />
      </label>
    </div>
  );
}

const page = {
  padding: "24px",
  background: "#f8fafc",
  minHeight: "100vh",
};

const card = {
  background: "#ffffff",
  borderRadius: "18px",
  padding: "22px",
  boxShadow: "0 6px 20px rgba(15, 23, 42, 0.08)",
  marginBottom: "18px",
};

const row = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "12px 0",
  borderBottom: "1px solid #e2e8f0",
};

const switchWrap = {
  transform: "scale(1.2)",
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

const dangerBtn = {
  background: "#dc2626",
  color: "#ffffff",
  border: "none",
  padding: "12px 16px",
  borderRadius: "10px",
  cursor: "pointer",
};

export default Settings;