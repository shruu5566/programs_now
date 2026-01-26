const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

app.use(cors());
app.use(express.json());

// 🔗 CONNECT TO MONGODB
mongoose
  .connect("mongodb+srv://shrushtibp_db_user:5TUllddk5VQtoWgw@cluster0.zx78g9b.mongodb.net/?appName=Cluster0")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Routes
const jobRoutes = require("./routes/jobRoutes");
app.use("/api/jobs", jobRoutes);

app.get("/", (req, res) => {
  res.send("Backend Working");
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
