// routes/interests.js
const express = require("express");
const router = express.Router();
const Interest = require("../models/Interest");
const { protect } = require("../middleware/authMiddleware"); // ✅ correct


router.post("/", protect, async (req, res) => {
  const { listingId } = req.body;

  const interest = await Interest.create({
    user: req.user._id,
    listing: listingId,
  });

  res.status(201).json(interest);

});
router.get("/", async (req, res) => {
  try {
    const { listingId } = req.query;
    const filter = listingId ? { listing: listingId } : {};
    const interests = await Interest.find(filter)
      .populate("listing", "businessName") // get businessName from listing
      .populate("user", "name email");     // get name and email from user

    res.json(interests);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch interests", error: err });
  }
});


module.exports = router;
