import React, { useState, useEffect } from "react";

function Chat() {
  const user = localStorage.getItem("username") || "You";
  const role = localStorage.getItem("role") || "patient";

  const [selectedUser, setSelectedUser] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState({});
  const [users, setUsers] = useState([]);

  // 🔹 Dummy users (simulate doctors/patients)
  useEffect(() => {
    if (role === "patient") {
      setUsers(["doctor1", "doctor2"]);
    } else {
      setUsers(["patient1", "patient2"]);
    }
  }, [role]);

  // 🔹 Send message
  const sendMessage = () => {
    if (!message.trim() || !selectedUser) return;

    const key = `${user}_${selectedUser}`;

    const newMsg = {
      sender: user,
      text: message,
      time: new Date().toLocaleTimeString(),
    };

    const updated = {
      ...messages,
      [key]: [...(messages[key] || []), newMsg],
    };

    setMessages(updated);
    setMessage("");

    // Auto reply (simulate other user)
    setTimeout(() => {
      const reply = {
        sender: selectedUser,
        text: "Reply from " + selectedUser,
        time: new Date().toLocaleTimeString(),
      };

      setMessages((prev) => ({
        ...prev,
        [key]: [...(prev[key] || []), reply],
      }));
    }, 800);
  };

  const chatKey = `${user}_${selectedUser}`;
  const chatMessages = messages[chatKey] || [];

  return (
    <div style={{ display: "flex", height: "100vh" }}>

      {/* LEFT USERS LIST */}
      <div style={leftPanel}>
        <h3>Chats</h3>

        {users.map((u) => (
          <div
            key={u}
            onClick={() => setSelectedUser(u)}
            style={{
              padding: "10px",
              cursor: "pointer",
              background: selectedUser === u ? "#3498db" : "#ecf0f1",
              color: selectedUser === u ? "white" : "black",
              marginBottom: "5px",
            }}
          >
            {u}
          </div>
        ))}
      </div>

      {/* RIGHT CHAT */}
      <div style={rightPanel}>

        {/* HEADER */}
        <div style={header}>
          {selectedUser ? `Chat with ${selectedUser}` : "Select a user"}
        </div>

        {/* MESSAGES */}
        <div style={messagesBox}>
          {chatMessages.map((msg, i) => (
            <div
              key={i}
              style={{
                textAlign: msg.sender === user ? "right" : "left",
                marginBottom: "10px",
              }}
            >
              <div
                style={{
                  display: "inline-block",
                  padding: "10px",
                  borderRadius: "10px",
                  background:
                    msg.sender === user ? "#3498db" : "#bdc3c7",
                  color: msg.sender === user ? "white" : "black",
                }}
              >
                <b>{msg.sender}</b><br />
                {msg.text}
                <div style={{ fontSize: "10px" }}>{msg.time}</div>
              </div>
            </div>
          ))}
        </div>

        {/* INPUT */}
        {selectedUser && (
          <div style={inputBox}>
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type message..."
              style={{ flex: 1, padding: "10px" }}
            />
            <button onClick={sendMessage} style={sendBtn}>
              Send
            </button>
          </div>
        )}

      </div>
    </div>
  );
}

const leftPanel = {
  width: "250px",
  background: "#2c3e50",
  color: "white",
  padding: "10px",
};

const rightPanel = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
};

const header = {
  padding: "15px",
  background: "#34495e",
  color: "white",
};

const messagesBox = {
  flex: 1,
  padding: "10px",
  overflowY: "auto",
  background: "#ecf0f1",
};

const inputBox = {
  display: "flex",
  padding: "10px",
  background: "#bdc3c7",
};

const sendBtn = {
  padding: "10px",
  background: "#2ecc71",
  color: "white",
  border: "none",
};

export default Chat;