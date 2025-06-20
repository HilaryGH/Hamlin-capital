const express = require("express");
const router = express.Router();
const Job = require("../models/job"); // ✅ This must exist and point to your Job schema

// GET all jobs
router.get("/", async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// POST create job
router.post("/", async (req, res) => {
  try {
    const { title, description, location, type } = req.body;
    const newJob = new Job({ title, description, location, type });
    await newJob.save();
    res.status(201).json(newJob);
  } catch (err) {
    res.status(400).json({ error: "Invalid data" });
  }
});

// DELETE job
router.delete("/:id", async (req, res) => {
  try {
    await Job.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (err) {
    res.status(400).json({ error: "Delete failed" });
  }
});

module.exports = router;
