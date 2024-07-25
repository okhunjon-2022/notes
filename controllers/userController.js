const User = require("../models/userSchema");
const jwt = require("jsonwebtoken");

//Login User
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    return res
      .status(400)
      .json({ success: false, message: "Email is required" });
  }

  if (!password) {
    return res
      .status(400)
      .json({ success: false, message: "PasswordF is required." });
  }

  const userInfo = await User.findOne({ email: email });

  if (!userInfo) {
    return res.status(400).json({ message: "User not found" });
  }

  if (userInfo.email == email && userInfo.password === password) {
    const user = { user: userInfo };

    const accessToken = jwt.sign(user, process.env.JWT_SECRET, {
      expiresIn: "3600m",
    });

    return res.json({
      success: true,
      message: "Login Successful",
      email,
      accessToken,
    });
  } else {
    return res
      .status(400)
      .json({ success: false, message: "Invalid Credentials " });
  }
};

//Create User
const registerUser = async (req, res) => {
  const { fullName, email, password } = req.body;

  if (!fullName) {
    return res
      .status(400)
      .json({ success: false, message: "Full Name is required." });
  }

  if (!email) {
    return res
      .status(400)
      .json({ success: false, message: "Email Name is required." });
  }

  if (!password) {
    return res
      .status(400)
      .json({ success: false, message: "Password Name is required." });
  }

  const isUser = await User.findOne({ email: email });

  if (isUser) {
    return res
      .status(400)
      .json({ success: false, message: "User already exist" });
  }

  const user = new User({
    fullName,
    email,
    password,
  });

  await user.save();

  const accessToken = jwt.sign({ user }, process.env.JWT_SECRET, {
    expiresIn: "30m",
  });

  return res.status(201).json({
    success: true,
    message: "Registration Successful",
    user,
    accessToken,
  });
};

//Get User
const getUser = async (req, res) => {
  const { user } = req.user;
  // console.log(user);
  const isUser = await User.findById(user._id);

  if (!isUser) {
    return res.status(401);
  }

  return res.json({
    user: {
      fullName: isUser.fullName,
      email: isUser.email,
      _id: isUser._id,
      createOn: isUser.createOn,
    },
    message: "",
  });
};

module.exports = { registerUser, loginUser, getUser };
