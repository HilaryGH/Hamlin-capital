const express = require("express");
const router = express.Router();
const Deal = require("../models/Deal"); // import Deal model
const Notification = require("../models/Notification");
const Subscriber = require("../models/Subscriber"); // the subscriber model

const { protect, adminOnly } = require("../middleware/authMiddleware");
const Investor = require("../models/Investor"); // your model

// Admin: Get all investors
router.get("/investors", protect, adminOnly, async (req, res) => {
  try {
    const investors = await Investor.find();
    res.status(200).json(investors);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Admin: Create a deal and notify subscribers
router.post("/create-deal", protect, adminOnly, async (req, res) => {
  try {
    const { title, message, dealType } = req.body;

    // 1. Save the deal
    const newDeal = new Deal({ title, message, dealType });
    await newDeal.save();

    // 2. Find subscribers for the deal type
    const subscribers = await Subscriber.find({ dealType });

    if (subscribers.length === 0) {
      return res.status(200).json({
        message: "Deal created, but no subscribers to notify.",
      });
    }

    // 3. Create notifications for subscribers
    const notifications = subscribers.map((subscriber) => ({
      userId: subscriber.userId,
      title,
      message,
      dealType,
      read: false,
    }));

    await Notification.insertMany(notifications);

    res.status(201).json({
      message: "✅ Deal created and notifications sent!",
    });
  } catch (error) {
    console.error("❌ Error creating deal and notifications:", error);
    res
      .status(500)
      .json({
        message: "Server error while creating deal and sending notifications.",
      });
  }
});

module.exports = router;


