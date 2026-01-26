const express = require("express");
const router = express.Router();
const Job = require("../models/Job");

// GET all jobs
router.get("/", async (req, res) => {
  const jobs = await Job.find();
  res.json(jobs);
});

// POST new job
router.post("/", async (req, res) => {
  const job = new Job(req.body);
  await job.save();
  res.json(job);
});

module.exports = router;
