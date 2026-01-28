const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express(); // ✅ ADD THIS LINE

const jobRoutes = require("./routes/jobRoutes");
const authRoutes = require("./routes/auth");

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/auth", require("./routes/auth"));


mongoose.connect("mongodb+srv://shrushtibp_db_user:jobtracker2@cluster0.zx78g9b.mongodb.net/?appName=Cluster0")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
