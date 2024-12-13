import React, { useState } from 'react';
import profileicon from '../assets/profileicon.png';
import './Signup.css';
import Text from './Text';

const Signup = () => {
  const [step, setStep] = useState(1); // Step 1: Send OTP, Step 2: Verify OTP, Step 3: Complete Registration
  const [formData, setFormData] = useState({
    email: '',
    otp: '',
    name: '',
    password: '',
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSendOTP = async () => {
    try {
      const response = await fetch('/api/user/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage('OTP sent successfully!');
        setStep(2);
      } else {
        setMessage(data.error || 'Failed to send OTP.');
      }
    } catch (error) {
      setMessage('Error sending OTP.');
    }
  };

  const handleVerifyOTP = async () => {
    try {
      const response = await fetch('/api/user/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email, otp: formData.otp }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage('OTP verified successfully!');
        setStep(3);
      } else {
        setMessage(data.error || 'Invalid or expired OTP.');
      }
    } catch (error) {
      setMessage('Error verifying OTP.');
    }
  };

  const handleRegister = async () => {
    try {
      const response = await fetch('/api/user/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          name: formData.name,
          password: formData.password,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage('User registered successfully!');
        setStep(1);
        setFormData({ email: '', otp: '', name: '', password: '' }); // Clear form
      } else {
        setMessage(data.error || 'Registration failed.');
      }
    } catch (error) {
      setMessage('Error completing registration.');
    }
  };

  return (
    <div className="whole">
      <Text />
      <div className="container">
        <div className="left-section">
          {step === 1 && (
            <>
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <button onClick={handleSendOTP}>Send OTP</button>
            </>
          )}
          {step === 2 && (
            <>
              <label>OTP</label>
              <input
                type="text"
                name="otp"
                value={formData.otp}
                onChange={handleChange}
                required
              />
              <button onClick={handleVerifyOTP}>Verify OTP</button>
            </>
          )}
          {step === 3 && (
            <>
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <button onClick={handleRegister}>Register</button>
            </>
          )}
          {message && <p>{message}</p>}
        </div>
        <div className="right-section">
          <img src={profileicon} alt="profile icon" />
        </div>
      </div>
    </div>
  );
};

export default Signup;
