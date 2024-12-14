const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../Models/User'); // Your User model
const { sendOTP, generateOTP } = require('../otpService'); // OTP utilities
const { signup, login } = require('../controllers/authController');

// Route to send OTP
router.post('/signup' , signup);
router.post('/login' , login);


module.exports = router;
