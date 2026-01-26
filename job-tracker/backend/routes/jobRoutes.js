const express = require("express");
const router = express.Router();

// Dummy data
let jobs = [];

// GET all jobs
router.get("/", (req, res) => {
  res.json(jobs);
});

// POST new job
router.post("/", (req, res) => {
  const job = req.body;
  jobs.push(job);
  res.status(201).json({ message: "Job Added", job });
});

module.exports = router;
