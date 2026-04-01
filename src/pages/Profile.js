import React from "react";

function Profile() {
  return (
    <div style={{ padding: "20px" }}>
      <h2>👤 Profile</h2>

      <p>Username: {localStorage.getItem("username")}</p>
      <p>Role: {localStorage.getItem("role")}</p>
    </div>
  );
}

export default Profile;