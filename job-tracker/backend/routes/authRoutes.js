const express = require("express");
const router = express.Router();
const User = require("../models/User");

// REGISTER
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ msg: "User already registered" });
    }

    const newUser = new User({ name, email, password });
    await newUser.save();

    res.json({ msg: "Registration successful" });

  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
