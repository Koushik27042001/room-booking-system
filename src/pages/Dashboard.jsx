import { useEffect, useState } from "react";
import { getRooms } from "../services/api";
import RoomCard from "../components/ui/RoomCard";
import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";
import Loader from "../components/ui/Loader";

function Dashboard(){

  const [rooms,setRooms] = useState([]);
  const [loading,setLoading] = useState(true);
  const [error,setError] = useState("");

  useEffect(()=>{

    getRooms()
    .then(res=>{
      setRooms(res.data);
      setLoading(false);
    })
    .catch(err=>{
      console.error("Error fetching rooms:", err);
      setError("Failed to fetch rooms");
      setLoading(false);
    });

  },[])

  if(loading) return <Loader />;

  if(error) return (
    <div className="flex justify-center items-center w-full h-screen">
      <p className="text-red-600 text-xl">{error}</p>
    </div>
  );

  return(

    <div className="flex">

      <Sidebar/>

      <div className="flex-1">

        <Navbar/>

        <div className="p-6 grid grid-cols-3 gap-6">

          {rooms.map(room=>(
            <RoomCard key={room.id} room={room}/>
          ))}

        </div>

      </div>

    </div>
  );
}

export default Dashboard;
