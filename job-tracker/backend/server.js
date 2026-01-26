const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const jobRoutes = require("./routes/jobRoutes");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("PASTE_YOUR_MONGODB_URL_HERE")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

app.use("/api/jobs", jobRoutes);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
