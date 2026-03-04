import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Sidebar(){
  const { user } = useAuth();

  return(

    <div className="w-64 bg-gray-900 text-white h-screen p-6">

      <h2 className="text-xl font-bold mb-6">
        Dashboard
      </h2>

      <ul className="space-y-4">

        <li>
          <Link to="/dashboard">Rooms</Link>
        </li>

        <li>
          <Link to="/my-bookings">
            {user?.role === "admin" ? "Manage Bookings" : "My Bookings"}
          </Link>
        </li>

      </ul>

    </div>
  );
}

export default Sidebar;
