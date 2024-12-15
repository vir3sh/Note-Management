const jwt = require("jsonwebtoken");
const User = require("../Models/User");
const dotenv = require("dotenv");
dotenv.config();

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res
        .status(400)
        .json({ success: "false", message: "no  token found" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res
        .status(400)
        .json({ success: "false", message: "couldnot decode token" });
    }

    const user = await User.findById({ _id: decoded.id });
    if (!user) {
      return res
        .status(400)
        .json({ success: "false", message: "couldnot find user" });
    }

    const newUser = { name: user.name, id: user._id };
    req.user = newUser;
    next();
  } catch (error) {
    console.log(error);
  }
};

module.exports = authMiddleware;
