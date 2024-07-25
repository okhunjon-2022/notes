const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose
    .connect(process.env.MongoDB)
    .then(() => console.log("MongoDB is connected"))
    .catch(() => console.log("MongoDB is not connected"));
};

module.exports = connectDB;
