import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import RoomDetails from "./pages/RoomDetails";
import MyBookings from "./pages/MyBookings";
import Home from "./pages/home";
import ProtectedRoute from "./routes/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>

          {/* Home Page */}
          <Route path="/" element={<Home />} />

          {/* Login Page */}
          <Route path="/login" element={<Login />} />

          {/* Dashboard */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          {/* Room Details */}
          <Route
            path="/room/:id"
            element={
              <ProtectedRoute allowedRoles={["user"]}>
                <RoomDetails />
              </ProtectedRoute>
            }
          />

          {/* My Bookings */}
          <Route
            path="/my-bookings"
            element={
              <ProtectedRoute>
                <MyBookings />
              </ProtectedRoute>
            }
          />

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
