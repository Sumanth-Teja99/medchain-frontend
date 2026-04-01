import React from "react";

function Sidebar({ role }) {
  return (
    <div style={sidebar}>
      <h3>🏥 MedChain</h3>

      <ul style={menu}>
        <li>Dashboard</li>
        <li>Records</li>
        <li>Chat</li>
        <li>Profile</li>
        <li>Settings</li>
      </ul>
    </div>
  );
}

const sidebar = {
  width: "220px",
  background: "#2c3e50",
  color: "white",
  height: "100vh",
  padding: "20px"
};

const menu = {
  listStyle: "none",
  marginTop: "20px"
};

export default Sidebar;