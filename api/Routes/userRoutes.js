const express = require("express");
const {
  signup,
  login,
  getUserData,
  deleteUser,
} = require("../controllers/userController");
const userRouter = express.Router();

userRouter.post("/signup", signup);
userRouter.post("/login", login);
userRouter.get("/:id", getUserData);
userRouter.delete("/:id", deleteUser);

module.exports = userRouter;
