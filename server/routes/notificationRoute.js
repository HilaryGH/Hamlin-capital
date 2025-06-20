const express = require("express");
const router = express.Router();
const Notification = require("../models/Notification");

router.post("/", async (req, res) => {
  try {
    const { name, email, dealType, userId } = req.body;

    if (!userId) {
      return res.status(400).json({ error: "userId is required" });
    }

    const newNotification = new Notification({ name, email, dealType, userId });
    await newNotification.save();

    res.status(201).json({ message: "Notification subscription saved!" });
  } catch (err) {
    console.error("Error saving notification:", err.message);
    res.status(500).json({ error: "Server error" });
  }
});

// Check if the user is already subscribed
router.get("/email/:email", async (req, res) => {
  try {
    const { email } = req.params;
    const existing = await Notification.findOne({ email });
    if (existing) {
      res.json({ subscribed: true });
    } else {
      res.json({ subscribed: false });
    }
  } catch (err) {
    console.error("Error checking subscription:", err.message);
    res.status(500).json({ error: "Server error" });
  }
});
// GET notifications for a specific user
router.get("/user/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const notifications = await Notification.find({ userId }).sort({ createdAt: -1 });
    res.json(notifications);
  } catch (err) {
    console.error("Error fetching user notifications:", err.message);
    res.status(500).json({ error: "Server error while fetching notifications" });
  }
});
// DELETE /api/notifications/unsubscribe
router.delete("/unsubscribe", async (req, res) => {
  const { userId, dealType } = req.body;
  try {
    await Notification.deleteOne({ userId, dealType });
    res.json({ message: "Unsubscribed successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to unsubscribe" });
  }
});




module.exports = router;

