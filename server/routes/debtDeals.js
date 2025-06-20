const express = require("express");
const router = express.Router();
const DebtDeal = require("../models/debtDeals");

router.get("/", async (req, res) => {
  try {
    const query = {};

    // Search keyword (optional)
    if (req.query.keyword) {
      query.$or = [
        { title: { $regex: req.query.keyword, $options: "i" } },
        { description: { $regex: req.query.keyword, $options: "i" } },
      ];
    }

    // Loop through other filters
    const fields = [
      "country",
      "industry",
      "subIndustry",
      "primaryUse",
      "openToUse",
      "companyStage",
      "revenue",
    ];

    fields.forEach((field) => {
      if (req.query[field]) {
        query[field] = req.query[field];
      }
    });

    const deals = await DebtDeal.find(query);
    res.json(deals);
  } catch (err) {
    console.error("Error fetching debt deals:", err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
