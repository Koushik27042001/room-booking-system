import { Card, CardContent, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function RoomCard({room}){

  const navigate = useNavigate();
  const { user } = useAuth();
  const canBook = user?.role === "user";

  return(

    <Card className="shadow-lg">

      <CardContent>

        <Typography variant="h6">
          {room.name}
        </Typography>

        <Typography color="text.secondary">
          {room.description}
        </Typography>

        <Typography className="mt-2 font-semibold">
          ₹ {room.price} / night
        </Typography>

        <Button
        variant="contained"
        className="mt-4"
        disabled={!canBook}
        onClick={()=>navigate(`/room/${room.id}`)}
        >
          {canBook ? "Book Now" : "User Booking Only"}
        </Button>

      </CardContent>

    </Card>
  );
}

export default RoomCard;
