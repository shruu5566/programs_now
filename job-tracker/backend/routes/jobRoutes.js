const express = require("express");
const router = express.Router();
const Job = require("../models/Job");

// Get all jobs
router.get("/", async (req, res) => {
  const jobs = await Job.find();
  res.json(jobs);
});

// Add job
router.post("/", async (req, res) => {
  const job = new Job({
    company: req.body.company,
    role: req.body.role,
    status: req.body.status
  });

  const savedJob = await job.save();
  res.json(savedJob);
});

// Delete job
router.delete("/:id", async (req, res) => {
  await Job.findByIdAndDelete(req.params.id);
  res.json({ message: "Job deleted" });
});

module.exports = router;
