const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema({
  company: String,
  role: String,
  status: {
    type: String,
    default: "Applied"
  }
});

module.exports = mongoose.model("Job", JobSchema);
