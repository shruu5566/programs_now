const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Import routes
const authRoutes = require("./routes/authRoutes");
const jobRoutes = require("./routes/jobRoutes");

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);

// MongoDB connection
const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://shrushtibp_db_user:jobtracker2@cluster0.zx78g9b.mongodb.net/?appName=Cluster0";

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
