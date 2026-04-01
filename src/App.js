import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import SelectRole from "./pages/SelectRole";
import Login from "./pages/Login";
import Register from "./pages/Register";

import DoctorDashboard from "./pages/DoctorDashboard";
import PatientDashboard from "./pages/PatientDashboard";

import Chat from "./pages/Chat";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";

function App() {

  // 🔐 Protect routes
  const ProtectedRoute = ({ children, role }) => {
    const userRole = localStorage.getItem("role");

    if (!userRole) {
      return <Navigate to="/" />;
    }

    if (role && userRole !== role) {
      return <Navigate to="/" />;
    }

    return children;
  };

  return (
    <BrowserRouter>
      <Routes>

        {/* 🟢 PUBLIC ROUTES */}
        <Route path="/" element={<SelectRole />} />
        <Route path="/login/:role" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* 🟢 PATIENT ROUTES */}
        <Route
          path="/patient"
          element={
            <ProtectedRoute role="patient">
              <PatientDashboard />
            </ProtectedRoute>
          }
        />

        {/* 🟢 DOCTOR ROUTES */}
        <Route
          path="/doctor"
          element={
            <ProtectedRoute role="doctor">
              <DoctorDashboard />
            </ProtectedRoute>
          }
        />

        {/* 🟢 COMMON ROUTES (BOTH CAN USE) */}
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