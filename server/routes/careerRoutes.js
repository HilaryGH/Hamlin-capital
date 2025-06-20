// routes/careerRoutes.js
const express = require("express");
const router = express.Router();
const Career = require("../models/Career");

// Get all career openings
router.get("/", async (req, res) => {
  try {
    const careers = await Career.find().sort({ postedDate: -1 });
    res.json(careers);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch careers" });
  }
});

// Post a new career opening
router.post("/", async (req, res) => {
  try {
    const newCareer = new Career(req.body);
    await newCareer.save();
    res.status(201).json(newCareer);
  } catch (err) {
    res.status(400).json({ error: "Failed to create career" });
  }
});

module.exports = router;
