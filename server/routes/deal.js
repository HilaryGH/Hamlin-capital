const express = require("express");
const router = express.Router();
const Notification = require("../models/Notification");

router.post("/create-deal", async (req, res) => {
  const { title, message, dealType } = req.body;

  if (!title || !message || !dealType) {
    return res.status(400).json({ message: "Missing deal fields" });
  }

  // Simulate sending notification to users (you can expand this)
  console.log("New deal created:", { title, message, dealType });

  res.status(201).json({ message: "Deal created and notifications sent" });
});

module.exports = router;




