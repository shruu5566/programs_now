const express = require("express");
const router = express.Router();
const User = require("../models/User");
router.get("/register", (req, res) => {
  res.send("Register route working");
});

// REGISTER USER
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // -------- VALIDATION --------
    if (!name || !email || !password) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ msg: "Invalid email format" });
    }

    if (password.length < 6) {
      return res.status(400).json({ msg: "Password must be at least 6 characters" });
    }

    // -------- CHECK USER --------
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ msg: "User already registered" });
    }

    // -------- SAVE USER --------
    const newUser = new User({
      name,
      email,
      password
    });

    await newUser.save();

    res.json({ msg: "Registration successful" });

  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
