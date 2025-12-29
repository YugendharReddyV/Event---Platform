import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();        // Clear user + token
    navigate("/login"); // Redirect to login page
  };

  return (
    <div style={{
      padding: "15px 20px",
      background: "#222",
      color: "white",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    }}>
      
      {/* Left side */}
      <div style={{ display: "flex", gap: "15px" }}>
        <Link to="/" style={{ color: "white", textDecoration: "none" }}>
          Home
        </Link>

        {user && (
          <Link to="/create-event" style={{ color: "white", textDecoration: "none" }}>
            Create Event
          </Link>
        )}
      </div>

      {/* Right side */}
      <div style={{ display: "flex", gap: "15px" }}>
        {!user && (
          <>
            <Link to="/login" style={{ color: "white", textDecoration: "none" }}>
              Login
            </Link>
            <Link to="/signup" style={{ color: "white", textDecoration: "none" }}>
              Signup
            </Link>
          </>
        )}

        {user && (
          <>
            <span>Hello, {user.name}</span>
            <button
              onClick={handleLogout}
              style={{
                background: "white",
                color: "black",
                border: "none",
                padding: "5px 10px",
                borderRadius: "4px",
                cursor: "pointer"
              }}
            >
              Logout
            </button>
          </>
        )}
      </div>

    </div>
  );
}
