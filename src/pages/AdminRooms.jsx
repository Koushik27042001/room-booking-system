import { useEffect, useState } from "react";
import { Alert, Button, Card, CardContent, TextField, Typography } from "@mui/material";
import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";
import { createRoom, getRooms } from "../services/api";

const initialForm = {
  name: "",
  description: "",
  price: "",
  beds: "",
  baths: "",
  tag: "",
  image: "",
  imageKey: "",
};

function AdminRooms() {
  const [form, setForm] = useState(initialForm);
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");

  const loadRooms = () => {
    setLoading(true);
    getRooms()
      .then((res) => {
        setRooms(res.data);
        setLoading(false);
      })
      .catch(() => {
        setMessage("Failed to load rooms");
        setMessageType("error");
        setLoading(false);
      });
  };

  useEffect(() => {
    loadRooms();
  }, []);

  const handleChange = (field) => (event) => {
    setForm((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");

    if (!form.name.trim() || !form.price || !form.description.trim()) {
      setMessage("Name, price and description are required.");
      setMessageType("error");
      return;
    }

    setSaving(true);

    try {
      await createRoom({
        name: form.name.trim(),
        description: form.description.trim(),
        price: Number(form.price),
        beds: Number(form.beds) || 1,
        baths: Number(form.baths) || 1,
        tag: form.tag.trim(),
        image: form.image.trim(),
        imageKey: form.imageKey.trim(),
      });

      setForm(initialForm);
      setMessage("Room added successfully.");
      setMessageType("success");
      loadRooms();
    } catch {
      setMessage("Failed to add room.");
      setMessageType("error");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Navbar />

        <div className="p-6 space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">Admin Room Management</h2>

          <Card>
            <CardContent>
              <Typography variant="h6" className="mb-4">
                Add New Room
              </Typography>

              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <TextField label="Room Name" value={form.name} onChange={handleChange("name")} required />
                <TextField
                  label="Price Per Night"
                  type="number"
                  value={form.price}
                  onChange={handleChange("price")}
                  required
                />
                <TextField
                  label="Beds"
                  type="number"
                  value={form.beds}
                  onChange={handleChange("beds")}
                />
                <TextField
                  label="Baths"
                  type="number"
                  value={form.baths}
                  onChange={handleChange("baths")}
                />
                <TextField label="Tag (optional)" value={form.tag} onChange={handleChange("tag")} />
                <TextField
                  label="Image Key (room1-room6)"
                  value={form.imageKey}
                  onChange={handleChange("imageKey")}
                />
                <TextField
                  label="Image URL (optional)"
                  value={form.image}
                  onChange={handleChange("image")}
                  className="md:col-span-2"
                />
                <TextField
                  label="Description"
                  value={form.description}
                  onChange={handleChange("description")}
                  multiline
                  minRows={3}
                  required
                  className="md:col-span-2"
                />

                <div className="md:col-span-2">
                  <Button type="submit" variant="contained" disabled={saving}>
                    {saving ? "Adding..." : "Add Room"}
                  </Button>
                </div>
              </form>

              {message && (
                <Alert severity={messageType} className="mt-4">
                  {message}
                </Alert>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h6" className="mb-4">
                Existing Rooms
              </Typography>

              {loading ? (
                <Typography color="text.secondary">Loading rooms...</Typography>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {rooms.map((room) => (
                    <div key={room.id} className="p-4 border rounded-lg">
                      <Typography variant="subtitle1" fontWeight={700}>
                        {room.name}
                      </Typography>
                      <Typography color="text.secondary">{room.description}</Typography>
                      <Typography className="mt-2 font-semibold">INR {room.price} / night</Typography>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default AdminRooms;
