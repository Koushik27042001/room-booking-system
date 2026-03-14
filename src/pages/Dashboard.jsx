import { useEffect, useState } from "react";
import { Alert, Button, Paper, TextField } from "@mui/material";
import { createRoom, getRooms } from "../services/api";
import RoomCard from "../components/ui/RoomCard";
import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";
import Loader from "../components/ui/Loader";
import { useAuth } from "../context/AuthContext";

function Dashboard() {

  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { user } = useAuth();
  const isAdmin = user?.role === "admin";

  const [formName, setFormName] = useState("");
  const [formPrice, setFormPrice] = useState("");
  const [formDescription, setFormDescription] = useState("");

  const [formErrors, setFormErrors] = useState({});
  const [formMessage, setFormMessage] = useState("");
  const [formMessageType, setFormMessageType] = useState("success");
  const [formSubmitting, setFormSubmitting] = useState(false);

  const loadRooms = async (showLoader = true) => {
    try {

      if (showLoader) setLoading(true);

      const res = await getRooms();

      setRooms(res.data);
      setError("");

    } catch (err) {

      console.error(err);
      setError("Failed to fetch rooms");

    } finally {

      if (showLoader) setLoading(false);

    }
  };

  useEffect(() => {
    loadRooms(true);
  }, []);

  const validateRoomForm = () => {

    const errors = {};

    if (!formName.trim()) errors.name = "Room name is required";

    if (!formPrice) {
      errors.price = "Price is required";
    } else if (Number(formPrice) <= 0) {
      errors.price = "Price must be positive";
    }

    if (!formDescription.trim()) {
      errors.description = "Description required";
    }

    setFormErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleAddRoom = async () => {

    if (!validateRoomForm()) return;

    try {

      setFormSubmitting(true);

      await createRoom({
        name: formName,
        price: Number(formPrice),
        description: formDescription
      });

      setFormMessage("Room added successfully");
      setFormMessageType("success");

      setFormName("");
      setFormPrice("");
      setFormDescription("");

      loadRooms(false);

    } catch (err) {

      setFormMessage("Failed to add room");
      setFormMessageType("error");

    } finally {

      setFormSubmitting(false);

    }
  };

  if (loading) return <Loader />;

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl text-red-600">{error}</p>
      </div>
    );
  }

  return (

    <div className="flex">

      <Sidebar />

      <div className="flex-1">

        <Navbar />

        <div className="p-6">

          {isAdmin && (
            <Paper className="p-6 mb-6">

              <h2 className="mb-4 text-xl font-bold">Add New Room</h2>

              <div className="grid gap-4 md:grid-cols-3">

                <TextField
                  label="Room Name"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  error={!!formErrors.name}
                  helperText={formErrors.name}
                />

                <TextField
                  label="Price"
                  type="number"
                  value={formPrice}
                  onChange={(e) => setFormPrice(e.target.value)}
                  error={!!formErrors.price}
                  helperText={formErrors.price}
                />

                <TextField
                  label="Description"
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  error={!!formErrors.description}
                  helperText={formErrors.description}
                />

              </div>

              <div className="flex items-center gap-4 mt-4">

                <Button
                  variant="contained"
                  onClick={handleAddRoom}
                  disabled={formSubmitting}
                >
                  {formSubmitting ? "Adding..." : "Add Room"}
                </Button>

                {formMessage && (
                  <Alert severity={formMessageType}>
                    {formMessage}
                  </Alert>
                )}

              </div>

            </Paper>
          )}

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

            {rooms.map(room => (
              <RoomCard key={room.id} room={room} />
            ))}

          </div>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;