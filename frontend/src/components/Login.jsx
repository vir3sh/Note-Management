import React, { useState } from "react";
import profileicon from "../assets/profileicon.png";
import "./Signup.css";
import Text from "./Text";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/ContextProvider";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://note-management-y2co.vercel.app/api/auth/login",
        { email, password }
      );
      if (response.data.success) {
        login(response.data.user);
        localStorage.setItem("token", response.data.token);
        console.log(response);
        navigate("/profile");
      }
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
            <h2>Login</h2>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              required
            />

            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              required
            />

            <button type="submit">Submit</button>
          </form>
        </div>
        <div className="right-section">
          <img src={profileicon} alt="Profile Icon" />
        </div>
      </div>
    </div>
  );
};

export default Login;
