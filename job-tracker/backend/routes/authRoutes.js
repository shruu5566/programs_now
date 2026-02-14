const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const User = require("../models/User");
const Job = require("../models/Job");
const { sendPasswordResetEmail } = require("../utils/sendEmail");
const auth = require("../middleware/auth");

if (!process.env.JWT_SECRET) {
  console.error("ERROR: JWT_SECRET environment variable is not set. Please configure it in your .env file");
  process.exit(1);
}

const JWT_SECRET = process.env.JWT_SECRET;

// Generate JWT Token
const generateToken = (userId) => {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: "7d" });
};

// REGISTER
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validation
    if (!name || !email || !password) {
      return res.status(400).json({ msg: "Please provide all fields" });
    }

    // Check existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "User already registered" });
    }

    // Create new user
    const newUser = new User({ name, email, password });
    await newUser.save();

    // Generate token
    const token = generateToken(newUser._id);

    res.status(201).json({
      msg: "Registration successful",
      token,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        createdAt: newUser.createdAt
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({ msg: "Please provide email and password" });
    }

    // Find user and include password field
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    // Check password
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    // Generate token
    const token = generateToken(user._id);

    res.json({
      msg: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
});

// GUEST LOGIN
router.post("/guest-login", async (req, res) => {
  try {
    const guestEmail = "guest@jobtracker.com";
    
    // Check if guest user exists
    let guestUser = await User.findOne({ email: guestEmail });

    // If guest user doesn't exist, create one with sample jobs
    if (!guestUser) {
      guestUser = new User({
        name: "Guest User",
        email: guestEmail,
        password: "guest123"
      });
      await guestUser.save();

      // Create sample jobs for guest
      const sampleJobs = [
        {
          userId: guestUser._id,
          company: "Google",
          role: "Full Stack Engineer",
          status: "Interview",
          source: "LinkedIn",
          notes: "Second round interview scheduled for next week"
        },
        {
          userId: guestUser._id,
          company: "Microsoft",
          role: "Senior Developer",
          status: "Applied",
          source: "Company Website",
          notes: "Applied 2 days ago"
        },
        {
          userId: guestUser._id,
          company: "Amazon",
          role: "Backend Engineer",
          status: "Shortlisted",
          source: "Recruiter",
          notes: "Got shortlisted for technical round"
        },
        {
          userId: guestUser._id,
          company: "Meta",
          role: "React Developer",
          status: "Rejected",
          source: "LinkedIn",
          notes: "Not a good fit for team"
        },
        {
          userId: guestUser._id,
          company: "Apple",
          role: "iOS Developer",
          status: "Applied",
          source: "Job Portal",
          notes: "Waiting for response"
        }
      ];

      await Job.insertMany(sampleJobs);
    }

    // Generate token
    const token = generateToken(guestUser._id);

    res.json({
      msg: "Guest login successful",
      token,
      user: {
        id: guestUser._id,
        name: guestUser.name,
        email: guestUser.email,
        createdAt: guestUser.createdAt
      }
    });
  } catch (error) {
    console.error("Guest login error:", error);
    res.status(500).json({ msg: "Server error" });
  }
});

// FORGOT PASSWORD
router.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;

    // Validation
    if (!email) {
      return res.status(400).json({ msg: "Please provide email" });
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "User not found" });
    }

    // Check if email is configured
    if (!process.env.EMAIL_USER || process.env.EMAIL_USER === "your_email@gmail.com") {
      return res.status(400).json({ msg: "Email service not configured. Please contact admin." });
    }

    // Generate reset token
    const resetToken = user.generateResetToken();
    await user.save({ validateBeforeSave: false });

    // Send email
    try {
      await sendPasswordResetEmail(email, resetToken);
      res.status(200).json({ msg: "Password reset email sent successfully" });
    } catch (emailError) {
      console.error("Email error:", emailError.message);
      user.resetToken = undefined;
      user.resetTokenExpiry = undefined;
      await user.save({ validateBeforeSave: false });
      return res.status(500).json({ msg: "Error sending email. Check your email configuration." });
    }
  } catch (error) {
    console.error("🔴 Forgot Password Error:", error);
    res.status(500).json({ msg: "Server error" });
  }
});

// RESET PASSWORD
router.post("/reset-password/:token", async (req, res) => {
  try {
    const { password, confirmPassword } = req.body;
    const { token } = req.params;

    // Validation
    if (!password || !confirmPassword) {
      return res.status(400).json({ msg: "Please provide password and confirm password" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ msg: "Passwords do not match" });
    }

    if (password.length < 6 || password.length > 18) {
      return res.status(400).json({ msg: "Password should be 6-18 characters" });
    }

    // Hash token to match with stored token
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    // Find user with valid reset token
    const user = await User.findOne({
      resetToken: hashedToken,
      resetTokenExpiry: { $gt: Date.now() }
    }).select("+password +resetToken +resetTokenExpiry");

    if (!user) {
      return res.status(400).json({ msg: "Invalid or expired reset token" });
    }

    // Update password
    user.password = password;
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;
    await user.save();

    res.status(200).json({ msg: "Password reset successfully" });
  } catch (error) {
    console.error("🔴 Reset Password Error:", error);
    res.status(500).json({ msg: "Server error" });
  }
});

// CHANGE PASSWORD (Authenticated users)
router.post("/change-password", auth, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const userId = req.userId;

    // Validation
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ msg: "Please provide current and new password" });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ msg: "New password must be at least 6 characters" });
    }

    // Find user and include password
    const user = await User.findById(userId).select("+password");

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    // Verify current password
    const isMatch = await user.matchPassword(currentPassword);
    if (!isMatch) {
      return res.status(400).json({ msg: "Current password is incorrect" });
    }

    // Update password
    user.password = newPassword;
    await user.save();

    res.status(200).json({ msg: "Password changed successfully" });
  } catch (error) {
    console.error("🔴 Change Password Error:", error);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
