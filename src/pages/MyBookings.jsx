import { useEffect, useMemo, useState } from "react";
import { Button, Card, CardContent, Chip, Typography } from "@mui/material";
import {
  deleteBooking,
  getBookings,
  getRooms,
  updateBooking,
} from "../services/api";
import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";
import { useAuth } from "../context/AuthContext";

function MyBookings() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const isAdmin = user?.role === "admin";

  const loadData = () => {
    setLoading(true);
    Promise.all([getBookings(), getRooms()])
      .then(([bookingsRes, roomsRes]) => {
        setBookings(bookingsRes.data);
        setRooms(roomsRes.data);
        setError("");
      })
      .catch((err) => {
        console.error("Error loading bookings:", err);
        setError("Failed to load bookings");
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadData();
  }, []);

  const roomMap = useMemo(
    () => Object.fromEntries(rooms.map((room) => [String(room.id), room])),
    [rooms]
  );

  const visibleBookings = useMemo(() => {
    if (isAdmin) {
      return bookings;
    }
    return bookings.filter((booking) => booking.bookedBy === user?.username);
  }, [bookings, isAdmin, user?.username]);

  const handleCancel = async (bookingId) => {
    try {
      await deleteBooking(bookingId);
      loadData();
    } catch (err) {
      console.error("Cancel booking error:", err);
      setError("Failed to cancel booking");
    }
  };

  const handleComplete = async (bookingId) => {
    try {
      await updateBooking(bookingId, { status: "completed" });
      loadData();
    } catch (err) {
      console.error("Complete booking error:", err);
      setError("Failed to update booking");
    }
  };

  if (error) {
    return (
      <div className="flex justify-center items-center w-full h-screen">
        <p className="text-red-600 text-xl">{error}</p>
      </div>
    );
  }

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        <div className="p-6">
          <h2 className="mb-4 text-2xl font-bold text-gray-900">
            {isAdmin ? "All Bookings (Admin)" : "My Bookings"}
          </h2>

          {loading ? (
            <p className="text-gray-600">Loading bookings...</p>
          ) : visibleBookings.length === 0 ? (
            <p className="text-gray-700">No bookings found</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {visibleBookings.map((booking) => {
                const room = roomMap[String(booking.roomId)];
                const status = booking.status || "active";

                return (
                  <Card key={booking.id}>
                    <CardContent className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Typography variant="h6">
                          {room?.name || `Room #${booking.roomId}`}
                        </Typography>
                        <Chip
                          size="small"
                          color={status === "completed" ? "success" : "warning"}
                          label={status}
                        />
                      </div>

                      <Typography color="text.secondary">
                        {room?.description || "Room details unavailable"}
                      </Typography>

                      <Typography className="font-semibold">
                        ₹ {room?.price ?? "N/A"} / night
                      </Typography>

                      <Typography>
                        Guest: {booking.name || "Not provided"}
                      </Typography>
                      <Typography>
                        Phone: {booking.phone || "Not provided"}
                      </Typography>
                      <Typography>
                        Email: {booking.email || "Not provided"}
                      </Typography>
                      <Typography>
                        From: {booking.startDate}
                      </Typography>
                      <Typography>
                        To: {booking.endDate}
                      </Typography>
                      <Typography>
                        Booked By: {booking.bookedBy || "Unknown"}
                      </Typography>

                      <div className="flex gap-2 pt-2">
                        {!isAdmin && (
                          <Button
                            variant="outlined"
                            color="error"
                            onClick={() => handleCancel(booking.id)}
                          >
                            Cancel Booking
                          </Button>
                        )}

                        {isAdmin && status !== "completed" && (
                          <Button
                            variant="contained"
                            color="success"
                            onClick={() => handleComplete(booking.id)}
                          >
                            Mark Completed
                          </Button>
                        )}

                        {isAdmin && (
                          <Button
                            variant="outlined"
                            color="error"
                            onClick={() => handleCancel(booking.id)}
                          >
                            Remove Booking
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MyBookings;
