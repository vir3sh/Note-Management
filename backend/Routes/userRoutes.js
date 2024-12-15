const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../Models/User"); // Your User model
// const { sendOTP, generateOTP } = require('../otpService'); // OTP utilities
// const { signup, login } = require('../controllers/authController');
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

// Route to send OTP
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ success: "false", message: "please fill all fields" });
    }
  
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: "false",
        message: "User already exist please Login  ",
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashPassword,
    });

    await user.save();

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.log(error);
  }
});
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ success: "false", message: "please fill all fields" });
    }

    const userAvailable = await User.findOne({ email });
    if (!userAvailable) {
      return res
        .status(400)
        .json({ success: "false", message: "User doesnot exist  " });
    }

    const isPasswordMatch = await bcrypt.compare(
      password,
      userAvailable.password
    );
    if (!isPasswordMatch) {
      return res
        .status(400)
        .json({ success: "false", message: "Invalid Password" });
    }

    const token = jwt.sign(
      { id: userAvailable._id, email: userAvailable.email },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: userAvailable._id,
        name: userAvailable.name,
        email: userAvailable.email,
      },
    });
  } catch (error) {
    console.log(error);
  }
});

router.get("/get-all", async (req, res) => {
  try {
    const user = await User.find();
    if (!user) {
      return res.status(400).json({ message: "no use founnd" });
    }

    res.json(user);
  } catch (error) {
    console.log(error);
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    if (!userId) {
      return res
        .status(400)
        .json({ success: "false", message: "no user found" });
    }
    await User.findByIdAndDelete(userId);

    return res.status(400).json({ success: "true", message: "User Deleted" });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
