import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";

import Loader from "./components/ui/Loader";
import ProtectedRoute from "./routes/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";

/* Lazy Loading Pages */
const Login = lazy(() => import("./pages/Login"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const RoomDetails = lazy(() => import("./pages/RoomDetails"));
const MyBookings = lazy(() => import("./pages/MyBookings"));
const Home = lazy(() => import("./pages/home"));
const BookingConfirmation = lazy(() => import("./pages/BookingConfirmation"));

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>

        {/* Suspense Loader */}
        <Suspense fallback={<Loader />}>

          <Routes>

            {/* Home */}
            <Route path="/" element={<Home />} />

            {/* Login */}
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

            {/* Booking Confirmation */}
            <Route
              path="/booking-confirmation/:bookingId"
              element={
                <ProtectedRoute>
                  <BookingConfirmation />
                </ProtectedRoute>
              }
            />

          </Routes>

        </Suspense>

      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;