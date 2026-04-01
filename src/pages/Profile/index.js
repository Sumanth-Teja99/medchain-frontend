import React, { useEffect, useMemo, useState } from "react";

function Profile() {
  const username = localStorage.getItem("username") || "User";
  const role = localStorage.getItem("role") || "patient";

  const storageKey = `medchain_profile_${username}`;

  const [profile, setProfile] = useState({
    fullName: "",
    email: "",
    phone: "",
    age: "",
    gender: "",
    bloodGroup: "",
    specialization: "",
    hospital: "",
    walletId: "",
  });

  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      setProfile(JSON.parse(saved));
    } else {
      const starter = {
        fullName: username,
        email: "",
        phone: "",
        age: "",
        gender: "",
        bloodGroup: "",
        specialization: role === "doctor" ? "General Medicine" : "",
        hospital: role === "doctor" ? "MedChain Hospital" : "",
        walletId: "0xA1B2...C9D0",
      };
      setProfile(starter);
      localStorage.setItem(storageKey, JSON.stringify(starter));
    }
  }, [storageKey, username, role]);

  const initials = useMemo(() => {
    return username.slice(0, 2).toUpperCase();
  }, [username]);

  const updateField = (key, value) => {
    const next = { ...profile, [key]: value };
    setProfile(next);
    localStorage.setItem(storageKey, JSON.stringify(next));
  };

  return (
    <div style={page}>
      <div style={hero}>
        <div style={avatar}>{initials}</div>
        <div>
          <h2 style={{ margin: 0 }}>{profile.fullName || username}</h2>
          <p style={subtitle}>
            {role.toUpperCase()} • Privacy-Preserving Medical Record Portal
          </p>
        </div>
      </div>

      <div style={grid}>
        <div style={card}>
          <h3>Basic Information</h3>

          <label style={label}>Full Name</label>
          <input
            style={input}
            value={profile.fullName}
            onChange={(e) => updateField("fullName", e.target.value)}
          />

          <label style={label}>Email</label>
          <input
            style={input}
            value={profile.email}
            onChange={(e) => updateField("email", e.target.value)}
          />

          <label style={label}>Phone</label>
          <input
            style={input}
            value={profile.phone}
            onChange={(e) => updateField("phone", e.target.value)}
          />

          <label style={label}>Wallet ID</label>
          <input
            style={input}
            value={profile.walletId}
            onChange={(e) => updateField("walletId", e.target.value)}
          />
        </div>

        <div style={card}>
          <h3>{role === "doctor" ? "Professional Information" : "Medical Information"}</h3>

          {role === "doctor" ? (
            <>
              <label style={label}>Specialization</label>
              <input
                style={input}
                value={profile.specialization}
                onChange={(e) => updateField("specialization", e.target.value)}
              />

              <label style={label}>Hospital / Clinic</label>
              <input
                style={input}
                value={profile.hospital}
                onChange={(e) => updateField("hospital", e.target.value)}
              />
            </>
          ) : (
            <>
              <label style={label}>Age</label>
              <input
                style={input}
                value={profile.age}
                onChange={(e) => updateField("age", e.target.value)}
              />

              <label style={label}>Gender</label>
              <input
                style={input}
                value={profile.gender}
                onChange={(e) => updateField("gender", e.target.value)}
              />

              <label style={label}>Blood Group</label>
              <input
                style={input}
                value={profile.bloodGroup}
                onChange={(e) => updateField("bloodGroup", e.target.value)}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

const page = {
  padding: "24px",
  background: "#f8fafc",
  minHeight: "100vh",
};

const hero = {
  display: "flex",
  alignItems: "center",
  gap: "18px",
  background: "#ffffff",
  borderRadius: "18px",
  padding: "22px",
  boxShadow: "0 6px 20px rgba(15, 23, 42, 0.08)",
  marginBottom: "22px",
};

const avatar = {
  width: "70px",
  height: "70px",
  borderRadius: "50%",
  background: "#1d4ed8",
  color: "#ffffff",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontWeight: "700",
  fontSize: "24px",
};

const subtitle = {
  marginTop: "6px",
  color: "#64748b",
};

const grid = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "20px",
};

const card = {
  background: "#ffffff",
  borderRadius: "18px",
  padding: "22px",
  boxShadow: "0 6px 20px rgba(15, 23, 42, 0.08)",
};

const label = {
  display: "block",
  marginTop: "14px",
  marginBottom: "6px",
  fontWeight: "600",
  color: "#334155",
};

const input = {
  width: "100%",
  padding: "12px",
  borderRadius: "10px",
  border: "1px solid #cbd5e1",
};

export default Profile;