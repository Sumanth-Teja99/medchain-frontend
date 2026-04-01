import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import SelectRole from "./pages/SelectRole";
import Login from "./pages/Login";
import Register from "./pages/Register";

import DoctorDashboard from "./pages/DoctorDashboard";
import PatientDashboard from "./pages/PatientDashboard";

// ✅ IMPORTANT (works with index.js inside folders)
import Chat from "./pages/Chat";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";

// 🔐 Protected Route
function ProtectedRoute({ children, role }) {
  const userRole = localStorage.getItem("role");

  // Not logged in
  if (!userRole) {
    return <Navigate to="/" replace />;
  }

  // Role mismatch
  if (role && userRole.toLowerCase() !== role.toLowerCase()) {
    return <Navigate to="/" replace />;
  }

  return children;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* 🟢 PUBLIC ROUTES */}
        <Route path="/" element={<SelectRole />} />
        <Route path="/login/:role" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* 🟢 PATIENT */}
        <Route
          path="/patient"
          element={
            <ProtectedRoute role="patient">
              <PatientDashboard />
            </ProtectedRoute>
          }
        />

        {/* 🟢 DOCTOR */}
        <Route
          path="/doctor"
          element={
            <ProtectedRoute role="doctor">
              <DoctorDashboard />
            </ProtectedRoute>
          }
        />

        {/* 🟢 COMMON PAGES */}
        <Route
          path="/chat"
          element={
            <ProtectedRoute>
              <Chat />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;