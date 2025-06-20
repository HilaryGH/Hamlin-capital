const express = require("express");
const router = express.Router();
const Listing = require("../models/Listing");

// Create new listing
router.post("/", async (req, res) => {
  try {
    const newListing = new Listing(req.body);
    await newListing.save();
    res.status(201).json(newListing);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get listings with filters
router.get("/", async (req, res) => {
  try {
    const filters = {};

    if (req.query.listingType) filters.listingType = req.query.listingType;
    if (req.query.keyword)
      filters.businessName = { $regex: req.query.keyword, $options: "i" };
    if (req.query.country) filters.country = req.query.country;
    if (req.query.industry) filters.industry = req.query.industry;
    if (req.query.subIndustry) filters.subIndustry = req.query.subIndustry;
    if (req.query.brokerOrDirect) filters.brokerOrDirect = req.query.brokerOrDirect;
    if (req.query.capitalNeeded) filters.capitalNeeded = req.query.capitalNeeded;

    const listings = await Listing.find(filters);
    res.json(listings);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});


module.exports = router;
