const express = require("express");
const router = express.Router();
const Subscriber = require("../models/Subscriber");

// ✅ Subscribe user to a deal type
router.post("/", async (req, res) => {
  try {
    const { name, email, dealType, userId } = req.body;

    if (!userId) return res.status(400).json({ error: "userId is required" });

    const existing = await Subscriber.findOne({ userId, dealType });
    if (existing)
      return res.status(400).json({ message: "Already subscribed" });

    await Subscriber.create({ userId, email, dealType });
    res.status(201).json({ message: "Subscription saved!" });
  } catch (err) {
    console.error("Subscription error:", err.message);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Check if user is already subscribed
router.get("/email/:email", async (req, res) => {
  try {
    const { email } = req.params;
    const existing = await Subscriber.findOne({ email });
    res.json({ subscribed: !!existing });
  } catch (err) {
    console.error("Subscription check error:", err.message);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Unsubscribe user from a specific deal type
router.delete("/unsubscribe", async (req, res) => {
  try {
    const { userId, dealType } = req.body;

    if (!userId || !dealType) {
      return res.status(400).json({ error: "userId and dealType are required" });
    }

    const deleted = await Subscriber.deleteOne({ userId, dealType });

    if (deleted.deletedCount === 0) {
      return res.status(404).json({ message: "No matching subscription found" });
    }

    res.json({ message: "Unsubscribed successfully" });
  } catch (err) {
    console.error("Unsubscribe error:", err.message);
    res.status(500).json({ error: "Server error while unsubscribing" });
  }
});

module.exports = router;






