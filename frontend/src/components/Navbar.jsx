import React from 'react'
import logo from '../assets/logo.png' 
import './Signup.css'
function Navbar() {
  return (
    <div className="container-nav">
      <div className="navbar-logo"> <img src={logo} alt="Profile icon" /></div>

      <div className="nav-links">
        <ul>
            <li>Home</li>
            <li>About Us</li>
            <li>Contact Us</li>
        </ul>
      </div>
    </div>
  )
}

export default Navbar
