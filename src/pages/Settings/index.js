import React, { useEffect, useState } from "react";

function Settings() {
  const username = localStorage.getItem("username") || "user";
  const storageKey = `medchain_settings_${username}`;

  const [settings, setSettings] = useState({
    darkMode: false,
    language: "English",
  });

  // 🔥 LOAD SETTINGS
  useEffect(() => {
    const saved = localStorage.getItem(storageKey);

    if (saved) {
      const parsed = JSON.parse(saved);
      setSettings(parsed);
      applySettings(parsed);
    }
  }, []);

  // 🔥 APPLY SETTINGS FUNCTION
  const applySettings = (config) => {
    if (config.darkMode) {
      document.body.style.backgroundColor = "#121212";
      document.body.style.color = "white";
    } else {
      document.body.style.backgroundColor = "#f8fafc";
      document.body.style.color = "black";
    }
  };

  // 🔥 UPDATE SETTINGS
  const updateSetting = (key, value) => {
    const updated = { ...settings, [key]: value };

    setSettings(updated);
    localStorage.setItem(storageKey, JSON.stringify(updated));

    applySettings(updated);

    if (key === "language") {
      alert("Language changed to " + value);
    }
  };

  // 🔥 LOGOUT
  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <div style={page}>
      <div style={card}>
        <h2>⚙️ Settings</h2>

        {/* DARK MODE */}
        <div style={row}>
          <span>Dark Mode</span>
          <input
            type="checkbox"
            checked={settings.darkMode}
            onChange={(e) =>
              updateSetting("darkMode", e.target.checked)
            }
          />
        </div>

        {/* LANGUAGE */}
        <div style={row}>
          <span>Language</span>
          <select
            value={settings.language}
            onChange={(e) =>
              updateSetting("language", e.target.value)
            }
          >
            <option>English</option>
            <option>Telugu</option>
            <option>Hindi</option>
          </select>
        </div>

        {/* LOGOUT */}
        <button onClick={logout} style={logoutBtn}>
          Logout
        </button>
      </div>
    </div>
  );
}

/* 🔥 STYLES */

const page = {
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "#f8fafc",
};

const card = {
  background: "rgba(255,255,255,0.9)",
  padding: "30px",
  borderRadius: "12px",
  width: "300px",
  boxShadow: "0 0 10px rgba(0,0,0,0.2)",
};

const row = {
  display: "flex",
  justifyContent: "space-between",
  marginTop: "20px",
};

const logoutBtn = {
  marginTop: "30px",
  width: "100%",
  padding: "10px",
  background: "red",
  color: "white",
  border: "none",
};

export default Settings;