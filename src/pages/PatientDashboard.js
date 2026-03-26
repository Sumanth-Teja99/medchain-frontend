import React, { useEffect, useState } from "react";
import API from "../services/api";

function PatientDashboard() {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const res = await API.get("/get_records", {
          headers: {
            token: "Bearer " + localStorage.getItem("token"),
          },
        });
        setRecords(res.data);
      } catch (error) {
        console.log(error);
        alert("Could not fetch records");
      }
    };

    fetchRecords();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Patient Dashboard</h2>

      {records.length === 0 ? (
        <p>No records found</p>
      ) : (
        records.map((record) => (
          <div key={record.id} style={{ border: "1px solid #ccc", margin: "10px 0", padding: "10px" }}>
            <p><strong>Record:</strong> {record.data}</p>
            <p><strong>Hash:</strong> {record.hash}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default PatientDashboard;