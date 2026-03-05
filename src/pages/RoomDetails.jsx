import { useEffect, useState } from "react";
import { Alert, Button, Paper, TextField } from "@mui/material";
import { createBooking, getBookings, getRoomById } from "../services/api";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function hasDateOverlap(newStart, newEnd, existingStart, existingEnd) {
  const start = new Date(newStart);
  const end = new Date(newEnd);
  const bookedStart = new Date(existingStart);
  const bookedEnd = new Date(existingEnd);

  return start <= bookedEnd && end >= bookedStart;
}

function RoomDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [room, setRoom] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");
  const [availabilityMessage, setAvailabilityMessage] = useState("");
  const [availabilityType, setAvailabilityType] = useState("info");

  useEffect(() => {
    Promise.all([getRoomById(id), getBookings()])
      .then(([roomRes, bookingsRes]) => {
        setRoom(roomRes.data);
        setBookings(bookingsRes.data);
        setLoading(false);
      })
      .catch(() => {
        setMessage("Failed to load room details");
        setMessageType("error");
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    if (!startDate || !endDate) {
      setAvailabilityMessage("");
      return;
    }

    if (new Date(startDate) > new Date(endDate)) {
      setAvailabilityMessage("End date should be after start date.");
      setAvailabilityType("warning");
      return;
    }

    const conflictingBooking = bookings.find(
      (booking) =>
        String(booking.roomId) === String(id) &&
        booking.status !== "completed" &&
        hasDateOverlap(startDate, endDate, booking.startDate, booking.endDate)
    );

    if (conflictingBooking) {
      setAvailabilityMessage("Selected dates are not available for this room.");
      setAvailabilityType("error");
      return;
    }

    setAvailabilityMessage("Selected dates are available.");
    setAvailabilityType("success");
  }, [bookings, endDate, id, startDate]);

  const handleBooking = async () => {
    if (!name || !phone || !startDate || !endDate) {
      setMessage("Please fill all required fields");
      setMessageType("error");
      return;
    }

    if (new Date(startDate) > new Date(endDate)) {
      setMessage("End date should be after start date.");
      setMessageType("error");
      return;
    }

    const conflictingBooking = bookings.find(
      (booking) =>
        String(booking.roomId) === String(id) &&
        booking.status !== "completed" &&
        hasDateOverlap(startDate, endDate, booking.startDate, booking.endDate)
    );

    if (conflictingBooking) {
      setMessage("This room is not available for selected dates.");
      setMessageType("error");
      return;
    }

    try {
      const response = await createBooking({
        roomId: id,
        name: name,
        phone: phone,
        email: email,
        startDate: startDate,
        endDate: endDate,
        bookedBy: user.username,
        status: "active",
      });

      const createdBooking = response.data;
      setBookings((prev) => [...prev, createdBooking]);

      setMessage("Booking confirmed successfully.");
      setMessageType("success");
      navigate(`/booking-confirmation/${createdBooking.id}`);
    } catch {
      setMessage("Booking failed");
      setMessageType("error");
    }
  };

  return (
    <div className="flex justify-center mt-20">
      <Paper className="p-6 w-96">
        {loading ? (
          <p className="mb-4 text-gray-600">Loading room details...</p>
        ) : room ? (
          <div className="p-3 mb-4 rounded-md bg-gray-50">
            <h3 className="text-lg font-bold">{room.name}</h3>
            <p className="mt-1 text-sm text-gray-600">{room.description}</p>
            <p className="mt-2 font-semibold">₹ {room.price} / night</p>
          </div>
        ) : (
          <p className="mb-4 text-red-600">Room details not found</p>
        )}

        <h2 className="mb-4 text-xl font-bold">
          Room Booking Details
        </h2>

        {availabilityMessage && (
          <Alert severity={availabilityType} className="mb-4">
            {availabilityMessage}
          </Alert>
        )}

        <div className="space-y-4">

          <TextField
            label="Full Name"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <TextField
            label="Phone Number"
            fullWidth
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <TextField
            label="Email"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextField
            type="date"
            label="Start Date"
            InputLabelProps={{ shrink: true }}
            fullWidth
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />

          <TextField
            type="date"
            label="End Date"
            InputLabelProps={{ shrink: true }}
            fullWidth
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />

          <Button
            variant="contained"
            fullWidth
            onClick={handleBooking}
          >
            Confirm Booking
          </Button>

          {message && (
            <Alert severity={messageType}>
              {message}
            </Alert>
          )}

        </div>

      </Paper>

    </div>
  );
}

export default RoomDetails;
