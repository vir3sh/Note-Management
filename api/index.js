const express = require("express");
const { default: mongoose } = require("mongoose");
const userRouter = require("./routes/userRoutes.js");
const notesRoutes = require("./routes/notesRoutes");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("database connected"))
  .catch((error) => console.log("eror while connecting database", error));

app.use("/api/user", userRouter);
app.use("/api/note", notesRoutes);

app.listen(5000, () => {
  console.log("hello world");
});
