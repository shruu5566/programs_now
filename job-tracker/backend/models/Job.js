const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    company: {
      type: String,
      required: [true, "Please provide company name"],
      trim: true
    },
    role: {
      type: String,
      required: [true, "Please provide job role"],
      trim: true
    },
    status: {
      type: String,
      enum: ["Applied", "Shortlisted", "Interview", "Rejected"],
      default: "Applied"
    },
    source: {
      type: String,
      trim: true,
      default: ""
    },
    notes: {
      type: String,
      trim: true,
      default: ""
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Job", JobSchema);
