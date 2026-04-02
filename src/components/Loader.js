import React from "react";

function Loader() {
  return (
    <div style={loaderContainer}>
      <div style={spinner}></div>
      <h3 style={{ marginTop: "15px" }}>Loading MedChain...</h3>
    </div>
  );
}

const loaderContainer = {
  height: "100vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  background: "#0f172a",
  color: "white",
};

const spinner = {
  width: "50px",
  height: "50px",
  border: "5px solid #ccc",
  borderTop: "5px solid #0f62fe",
  borderRadius: "50%",
  animation: "spin 1s linear infinite",
};

export default Loader;