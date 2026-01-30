const express = require("express");
const router = express.Router();
const Job = require("../models/Job");
const auth = require("../middleware/auth");

// Get all jobs with search, filter, and sort
router.get("/", auth, async (req, res) => {
  try {
    const { search, status, sort } = req.query;
    let query = { userId: req.userId };

    // Search by company name
    if (search) {
      query.company = { $regex: search, $options: "i" };
    }

    // Filter by status
    if (status) {
      query.status = status;
    }

    let jobsQuery = Job.find(query);

    // Sort by latest (default) or oldest
    if (sort === "oldest") {
      jobsQuery = jobsQuery.sort({ createdAt: 1 });
    } else {
      jobsQuery = jobsQuery.sort({ createdAt: -1 }); // Latest first
    }

    const jobs = await jobsQuery;
    res.json(jobs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
});

// Add job
router.post("/", auth, async (req, res) => {
  try {
    const { company, role, status, source, notes } = req.body;

    // Validation
    if (!company || !role) {
      return res.status(400).json({ msg: "Company and role are required" });
    }

    const job = new Job({
      userId: req.userId,
      company,
      role,
      status: status || "Applied",
      source: source || "",
      notes: notes || ""
    });

    const savedJob = await job.save();
    res.status(201).json(savedJob);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
});

// Update job
router.put("/:id", auth, async (req, res) => {
  try {
    const { company, role, status, source, notes } = req.body;

    // Check if job exists and belongs to user
    let job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ msg: "Job not found" });
    }

    if (job.userId.toString() !== req.userId) {
      return res.status(403).json({ msg: "Not authorized to update this job" });
    }

    // Update fields
    job.company = company || job.company;
    job.role = role || job.role;
    job.status = status || job.status;
    job.source = source !== undefined ? source : job.source;
    job.notes = notes !== undefined ? notes : job.notes;

    job = await job.save();
    res.json(job);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
});

// Delete job
router.delete("/:id", auth, async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ msg: "Job not found" });
    }

    if (job.userId.toString() !== req.userId) {
      return res.status(403).json({ msg: "Not authorized to delete this job" });
    }

    await Job.findByIdAndDelete(req.params.id);
    res.json({ msg: "Job deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
