import { useEffect, useState } from "react";
import { Alert, Button, Paper } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { getBookingById, getRoomById } from "../services/api";
import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";

function BookingConfirmation() {
  const { bookingId } = useParams();
  const [booking, setBooking] = useState(null);
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getBookingById(bookingId)
      .then((bookingRes) => {
        setBooking(bookingRes.data);
        return getRoomById(bookingRes.data.roomId);
      })
      .then((roomRes) => {
        setRoom(roomRes.data);
      })
      .catch(() => {
        setError("Unable to load booking confirmation details.");
      })
      .finally(() => setLoading(false));
  }, [bookingId]);

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        <div className="p-6">
          <h2 className="mb-4 text-2xl font-bold text-gray-900">
            Booking Confirmation
          </h2>

          {loading ? (
            <p className="text-gray-600">Loading confirmation details...</p>
          ) : error ? (
            <Alert severity="error">{error}</Alert>
          ) : (
            <Paper className="max-w-3xl p-6 border border-green-200 bg-green-50">
              <h3 className="text-xl font-bold text-green-900">
                Your booking is confirmed
              </h3>
              <p className="mt-2 text-sm text-green-800">
                Keep this information for reference.
              </p>

              <div className="grid grid-cols-1 gap-3 mt-5 md:grid-cols-2">
                <p>
                  <span className="font-semibold">Booking ID:</span> #{booking?.id}
                </p>
                <p>
                  <span className="font-semibold">Status:</span>{" "}
                  {booking?.status || "active"}
                </p>
                <p>
                  <span className="font-semibold">Guest Name:</span>{" "}
                  {booking?.name || "Not provided"}
                </p>
                <p>
                  <span className="font-semibold">Phone:</span>{" "}
                  {booking?.phone || "Not provided"}
                </p>
                <p>
                  <span className="font-semibold">Email:</span>{" "}
                  {booking?.email || "Not provided"}
                </p>
                <p>
                  <span className="font-semibold">Booked By:</span>{" "}
                  {booking?.bookedBy || "Unknown"}
                </p>
                <p>
                  <span className="font-semibold">Room Name:</span>{" "}
                  {room?.name || "Not available"}
                </p>
                <p>
                  <span className="font-semibold">Room Number:</span>{" "}
                  {booking?.roomId || "Not available"}
                </p>
                <p>
                  <span className="font-semibold">Check-in:</span>{" "}
                  {booking?.startDate || "Not available"}
                </p>
                <p>
                  <span className="font-semibold">Check-out:</span>{" "}
                  {booking?.endDate || "Not available"}
                </p>
                <p>
                  <span className="font-semibold">Price per night:</span> Rs{" "}
                  {room?.price ?? "N/A"}
                </p>
                <p>
                  <span className="font-semibold">Total nights:</span>{" "}
                  {booking?.startDate && booking?.endDate
                    ? Math.max(
                        1,
                        Math.ceil(
                          (new Date(booking.endDate) - new Date(booking.startDate)) /
                            (1000 * 60 * 60 * 24)
                        )
                      )
                    : "N/A"}
                </p>
              </div>

              <div className="flex gap-3 mt-6">
                <Button variant="contained" component={Link} to="/my-bookings">
                  View My Bookings
                </Button>
                <Button variant="outlined" component={Link} to="/dashboard">
                  Book Another Room
                </Button>
              </div>
            </Paper>
          )}
        </div>
      </div>
    </div>
  );
}

export default BookingConfirmation;
