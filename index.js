const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());
require("dotenv").config();
const connectDB = require("./config/db");
const userRouter = require("./routers/userRoute");
const noteRouter = require("./routers/noteRoute");

//DB Connection
connectDB();

app.use(
  cors({
    orogin: "*",
  })
);

//api endpoints
app.use("/api/user", userRouter);
app.use("/api/note", noteRouter);

app.get("/", (req, res) => {
  res.json("Server is running");
});

app.listen(8000, () => {
  console.log("Server is running on 8000 port.");
});

module.exports = app;
