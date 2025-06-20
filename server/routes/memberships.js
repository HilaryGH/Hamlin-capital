const express = require("express");
const Membership = require("../models/Membership");
const router = express.Router();

// POST - Create a new membership
router.post("/", async (req, res) => {
  try {
    const { planId, name, email } = req.body;

    if (!planId || !name || !email) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newMembership = new Membership({ planId, name, email });
    await newMembership.save();

    res.status(201).json({ message: "Membership joined successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ GET - Fetch all members correctly
router.get("/", async (req, res) => {
  try {
    const members = await Membership.find().sort({ createdAt: -1 });
    res.json(members);
  } catch (err) {
    console.error("Error fetching members:", err); // optional logging
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;

