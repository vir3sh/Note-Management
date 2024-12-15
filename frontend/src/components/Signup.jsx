import React, { useState } from "react";
import profileicon from "../assets/profileicon.png";
import "./Signup.css";
import Text from "./Text";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/signup",
        { name, email, password }
      );
      console.log(response);
      navigate("/profile");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="whole">
      <Text />
      <div className="container">
        <div className="left-section">
          <form onSubmit={handleSubmit}>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              // value={formData.name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              required
            />

            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              // value={formData.email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              required
            />

            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              // value={formData.password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              required
            />

            <button type="submit">Register</button>
          </form>
        </div>
        <div className="right-section">
          <img src={profileicon} alt="Profile Icon" />
        </div>
      </div>
    </div>
  );
};

export default Register;
