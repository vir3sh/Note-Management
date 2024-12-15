import React from "react";
import logo from "../assets/logo.png";
import "./Signup.css";
import { useAuth } from "../context/ContextProvider";
import { Link } from "react-router-dom";
function Navbar() {
  const { user, logout } = useAuth();
  const handleLogout = () => {
    logout(); // This will clear the user context
    localStorage.removeItem("authToken"); // Remove auth token from localStorage, if used
    window.location.href = "/"; // Redirect to the homepage or login page after logout
  };
  return (
    <div className="container-nav">
      <div className="navbar-logo">
        {" "}
        <img src={logo} alt="Profile icon" />
      </div>
      <div className="nav-links">
        {/* <ul>
          <li>Home</li>
          <li>About Us</li>
          <li>Contact Us</li>
        </ul> */}
      </div>

      {!user ? (
        <div className="login">
          <Link to="/login">Login</Link>
        </div>
      ) : (
        <div className="logout">
          {/* <p>{user.name}</p> */}
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
  );
}

export default Navbar;
