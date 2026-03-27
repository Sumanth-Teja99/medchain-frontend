import { BrowserRouter, Routes, Route } from "react-router-dom";
import SelectRole from "./pages/SelectRole";
import Login from "./pages/Login";
import DoctorDashboard from "./pages/DoctorDashboard";
import PatientDashboard from "./pages/PatientDashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SelectRole />} />
        <Route path="/login/:role" element={<Login />} />
        <Route path="/doctor" element={<DoctorDashboard />} />
        <Route path="/patient" element={<PatientDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;