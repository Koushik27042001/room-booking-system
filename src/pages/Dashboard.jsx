import { useEffect, useState } from "react";
import { getRooms } from "../services/api";
import RoomCard from "../components/ui/RoomCard";
import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";
import Loader from "../components/ui/Loader";

function Dashboard() {

  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadRooms = async () => {
    try {

      setLoading(true);

      const res = await getRooms();

      setRooms(res.data);
      setError("");

    } catch (err) {

      console.error(err);
      setError("Failed to fetch rooms");

    } finally {

      setLoading(false);

    }
  };

  useEffect(() => {
    loadRooms();
  }, []);

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

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

            {rooms.map((room) => (
              <RoomCard key={room.id} room={room} />
            ))}

          </div>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;