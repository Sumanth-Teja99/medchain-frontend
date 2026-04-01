import React, { useMemo, useState, useEffect } from "react";

function Chat() {
  const username = localStorage.getItem("username") || "User";
  const role = (localStorage.getItem("role") || "patient").toLowerCase();

  const storageKey = useMemo(() => `medchain_chat_${username}`, [username]);

  const [selectedUser, setSelectedUser] = useState(
    role === "doctor" ? "patient-demo" : "doctor-demo"
  );
  const [message, setMessage] = useState("");
  const [threads, setThreads] = useState({});

  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      setThreads(JSON.parse(saved));
    } else {
      const starter = {
        [role === "doctor" ? "patient-demo" : "doctor-demo"]: [
          {
            sender: role === "doctor" ? "patient-demo" : "doctor-demo",
            text:
              role === "doctor"
                ? "Hello doctor, I uploaded my latest symptoms."
                : "Hello, please share what symptoms you are experiencing.",
            time: new Date().toLocaleString(),
          },
        ],
      };
      setThreads(starter);
      localStorage.setItem(storageKey, JSON.stringify(starter));
    }
  }, [storageKey, role]);

  const contacts = Object.keys(threads).length
    ? Object.keys(threads)
    : [role === "doctor" ? "patient-demo" : "doctor-demo"];

  const activeMessages = threads[selectedUser] || [];

  const saveThreads = (next) => {
    setThreads(next);
    localStorage.setItem(storageKey, JSON.stringify(next));
  };

  const sendMessage = () => {
    if (!message.trim()) return;

    const next = {
      ...threads,
      [selectedUser]: [
        ...(threads[selectedUser] || []),
        {
          sender: username,
          text: message.trim(),
          time: new Date().toLocaleString(),
        },
      ],
    };

    saveThreads(next);
    setMessage("");

    setTimeout(() => {
      const replyText =
        role === "doctor"
          ? "Patient reply received. I will review it."
          : "Doctor reply: Please continue medication and monitor symptoms.";

      const replyThreads = {
        ...next,
        [selectedUser]: [
          ...(next[selectedUser] || []),
          {
            sender: selectedUser,
            text: replyText,
            time: new Date().toLocaleString(),
          },
        ],
      };

      saveThreads(replyThreads);
    }, 900);
  };

  return (
    <div style={page}>
      <div style={sidebar}>
        <div style={sidebarHeader}>
          <h2 style={{ margin: 0 }}>💬 Chat</h2>
          <p style={muted}>
            {role === "doctor" ? "Doctor communication" : "Patient communication"}
          </p>
        </div>

        <div>
          {contacts.map((contact) => (
            <button
              key={contact}
              onClick={() => setSelectedUser(contact)}
              style={{
                ...contactBtn,
                background: selectedUser === contact ? "#1d4ed8" : "#ffffff",
                color: selectedUser === contact ? "#ffffff" : "#0f172a",
              }}
            >
              {contact}
            </button>
          ))}
        </div>
      </div>

      <div style={chatArea}>
        <div style={chatHeader}>
          <div>
            <h3 style={{ margin: 0 }}>{selectedUser}</h3>
            <p style={muted}>Secure communication channel</p>
          </div>
        </div>

        <div style={messagesBox}>
          {activeMessages.length === 0 ? (
            <p style={muted}>No messages yet.</p>
          ) : (
            activeMessages.map((msg, i) => {
              const mine = msg.sender === username;
              return (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    justifyContent: mine ? "flex-end" : "flex-start",
                    marginBottom: "12px",
                  }}
                >
                  <div
                    style={{
                      ...bubble,
                      background: mine ? "#1d4ed8" : "#e2e8f0",
                      color: mine ? "#ffffff" : "#0f172a",
                    }}
                  >
                    <div style={{ fontSize: "12px", opacity: 0.8, marginBottom: "4px" }}>
                      {msg.sender}
                    </div>
                    <div>{msg.text}</div>
                    <div style={{ fontSize: "11px", marginTop: "6px", opacity: 0.75 }}>
                      {msg.time}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        <div style={inputRow}>
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            style={input}
          />
          <button onClick={sendMessage} style={sendBtn}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

const page = {
  display: "flex",
  minHeight: "100vh",
  background: "#f8fafc",
};

const sidebar = {
  width: "280px",
  background: "#0f172a",
  color: "#ffffff",
  padding: "20px",
};

const sidebarHeader = {
  marginBottom: "20px",
};

const muted = {
  margin: "6px 0 0 0",
  color: "#94a3b8",
  fontSize: "14px",
};

const contactBtn = {
  width: "100%",
  textAlign: "left",
  padding: "12px",
  borderRadius: "10px",
  border: "none",
  cursor: "pointer",
  marginBottom: "10px",
  fontWeight: "600",
};

const chatArea = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  padding: "24px",
};

const chatHeader = {
  background: "#ffffff",
  borderRadius: "14px",
  padding: "18px",
  marginBottom: "16px",
  boxShadow: "0 6px 18px rgba(15, 23, 42, 0.08)",
};

const messagesBox = {
  flex: 1,
  background: "#ffffff",
  borderRadius: "14px",
  padding: "18px",
  overflowY: "auto",
  boxShadow: "0 6px 18px rgba(15, 23, 42, 0.08)",
};

const bubble = {
  maxWidth: "65%",
  padding: "12px 14px",
  borderRadius: "14px",
};

const inputRow = {
  display: "flex",
  gap: "12px",
  marginTop: "16px",
};

const input = {
  flex: 1,
  padding: "14px",
  borderRadius: "12px",
  border: "1px solid #cbd5e1",
  fontSize: "15px",
};

const sendBtn = {
  padding: "14px 20px",
  background: "#1d4ed8",
  color: "#ffffff",
  border: "none",
  borderRadius: "12px",
  cursor: "pointer",
  fontWeight: "600",
};

export default Chat;