const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../Models/User'); // Your User model
const { sendOTP, generateOTP } = require('../otpService'); // OTP utilities

// Route to send OTP
router.post('/send-otp', async (req, res) => {
  const { email } = req.body;

  try {
    const otp = generateOTP();
    const expiration = Date.now() + 5 * 60 * 1000; // OTP valid for 5 minutes

    // Save OTP to the database
    let user = await User.findOne({ email });
    if (!user) {
      user = new User({ email, otp, otpExpiration: expiration });
    } else {
      user.otp = otp;
      user.otpExpiration = expiration;
    }
    await user.save();

    // Send OTP via email
    await sendOTP(email, otp);
    res.status(200).json({ message: 'OTP sent successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error sending OTP',error });
  }
});

// Route to verify OTP
router.post('/verify-otp', async (req, res) => {
  const { email, otp } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || user.otp !== otp || user.otpExpiration < Date.now()) {
      return res.status(400).json({ error: 'Invalid or expired OTP' });
    }

    // OTP verified; clear OTP fields for security
    user.otp = null;
    user.otpExpiration = null;
    await user.save();

    res.status(200).json({ message: 'OTP verified successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error verifying OTP' });
  }
});

// Route to complete registration
router.post('/register', async (req, res) => {
  const { email, name, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'User not found. Please start registration again.' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update user with name and password
    user.name = name;
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error registering user' });
  }
});

module.exports = router;
