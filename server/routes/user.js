const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const User = require("../models/User");
const fs = require("fs");
const path = require("path");

// Existing route
router.get("/me", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ NEW: Route to return uploaded files
router.get("/files", protect, async (req, res) => {
  try {
    const uploadDir = path.join(__dirname, "../uploads"); // adjust path if needed
    const files = fs.readdirSync(uploadDir);

    const fileList = files.map((filename) => ({
      filename,
      url: `/uploads/${filename}`,
    }));

    res.json({ files: fileList });
  } catch (err) {
    console.error("File fetch error:", err);
    res.status(500).json({ message: "Could not load files" });
  }
});

module.exports = router;

