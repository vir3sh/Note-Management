const User = require("../Models/User");
const bcrypt = require("bcrypt");
const signup = async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.send("Fill all details");
  }

  try {
    const exisEmail = await User.findOne({ email });

    if (exisEmail) {
      res.json({ success: false, message: "Email already registered" });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashPassword });
    await user.save();
    res.json({ success: true, message: "user created" });
  } catch (error) {
    console.log(error);
  }
};
const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.send("Fill all details");
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.json({ success: false, message: "user dont exits" });
    }

    const comparePassword = await bcrypt.compare(password, user.password);
    if (!comparePassword) {
      res.json({ success: false, message: "invalid credentials" });
    }

    res.json({ success: true, user });
  } catch (error) {
    console.log(error);
  }
};

const getUserData = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      res.json({ success: false, message: "no user " });
    } else {
      console.log("sss");
    }
    res.json({ user });
  } catch (error) {
    console.log(error);
  }
};

const deleteUser = async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);
  try {
    if (!user) {
      res.send("user not found");
    }
    res.json({ success: true, message: "Account deleted" });
  } catch (error) {
    console.log(error);
  }
};
module.exports = { signup, login, getUserData, deleteUser };
