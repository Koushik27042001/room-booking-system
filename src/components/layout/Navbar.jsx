import { AppBar, Toolbar, Typography, Box, Button, Chip } from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Navbar(){
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return(
    <AppBar position="static" sx={{ backgroundColor: "#111827" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between", gap: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          Room Booking Dashboard
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Button
            component={Link}
            to="/"
            color="inherit"
            variant={location.pathname === "/" ? "outlined" : "text"}
          >
            Home
          </Button>
          <Button
            component={Link}
            to="/dashboard"
            color="inherit"
            variant={location.pathname === "/dashboard" ? "outlined" : "text"}
          >
            Dashboard
          </Button>
          <Button
            component={Link}
            to="/my-bookings"
            color="inherit"
            variant={location.pathname === "/my-bookings" ? "outlined" : "text"}
          >
            My Bookings
          </Button>
          {!user ? (
            <Button component={Link} to="/login" variant="contained" color="warning">
              Login
            </Button>
          ) : (
            <>
              <Chip
                label={`${user.username} (${user.role})`}
                size="small"
                sx={{ bgcolor: "#374151", color: "#fff" }}
              />
              <Button variant="contained" color="error" onClick={handleLogout}>
                Logout
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
