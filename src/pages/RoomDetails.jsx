import { useEffect, useState } from "react";
import { Button, TextField, Paper } from "@mui/material";
import { createBooking, getRoomById } from "../services/api";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function RoomDetails() {
  const { id } = useParams();
  const { user } = useAuth();
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [message, setMessage] = useState("");

  useEffect(() => {
    getRoomById(id)
      .then((res) => {
        setRoom(res.data);
        setLoading(false);
      })
      .catch(() => {
        setMessage("Failed to load room details");
        setLoading(false);
      });
  }, [id]);

  const handleBooking = async () => {
    if (!name || !phone || !startDate || !endDate) {
      setMessage("Please fill all required fields");
      return;
    }

    try {
      await createBooking({
        roomId: id,
        name: name,
        phone: phone,
        email: email,
        startDate: startDate,
        endDate: endDate,
        bookedBy: user.username,
        status: "active",
      });

      setMessage("Booking confirmed!");
    } catch {
      setMessage("Booking failed");
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

          <p className="text-green-600">
            {message}
          </p>

        </div>

      </Paper>

    </div>
  );
}

export default RoomDetails;
