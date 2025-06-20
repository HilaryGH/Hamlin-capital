const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const Startup = require("../models/Startup");
const { protect } = require("../middleware/authMiddleware");
const { registerStartup } = require("../controllers/startupController");

const router = express.Router();

// File storage setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// GET all startups (admin use case)
router.get("/", async (req, res) => {
  try {
    const startups = await Startup.find().sort({ createdAt: -1 });
    res.json(startups);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch startups" });
  }
});

// GET only the logged-in user's uploaded files
router.get("/files", protect, async (req, res) => {
  try {
    const startups = await Startup.find({ userId: req.user.id });

    const files = [];

    startups.forEach((startup) => {
      if (startup.registrationFile)
        files.push({ filename: startup.registrationFile });
      if (startup.pitchDeck)
        files.push({ filename: startup.pitchDeck });
      if (startup.businessPlan)
        files.push({ filename: startup.businessPlan });
      if (startup.financialModel)
        files.push({ filename: startup.financialModel });
      if (startup.founderProfile)
        files.push({ filename: startup.founderProfile });
    });

    res.json({ files });
  } catch (err) {
    console.error("Error fetching user files:", err);
    res.status(500).json({ error: "Failed to fetch files" });
  }
});

// ✅ Apply `protect` middleware
router.post(
  "/register",
  protect,
  upload.fields([
    { name: "registrationFile", maxCount: 1 },
    { name: "pitchDeck", maxCount: 1 },
    { name: "businessPlan", maxCount: 1 },
    { name: "financialModel", maxCount: 1 },
    { name: "founderProfile", maxCount: 1 },
  ]),
  registerStartup
);
// DELETE uploaded file
router.delete("/files/:filename", protect, async (req, res) => {
  try {
    const decodedFilename = decodeURIComponent(req.params.filename);
    const filePath = path.resolve("uploads", decodedFilename);
    console.log("Deleting file at:", filePath);

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ message: "File not found" });
    }

    fs.unlinkSync(filePath);

    // Optional: Clean up the reference from the DB
    await Startup.updateMany(
      { userId: req.user.id },
      {
        $set: {
          registrationFile: "",
          pitchDeck: "",
          businessPlan: "",
          financialModel: "",
          founderProfile: "",
        },
      },
      { multi: true }
    );

    res.status(200).json({ message: "File deleted successfully" });
  } catch (err) {
    console.error("Error deleting file:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// PATCH to update startup status
router.patch("/:id", async (req, res) => {
  try {
    const { status } = req.body;
    const updated = await Startup.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Startup not found" });
    }

    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update startup status" });
  }
});
const { getMyStartup } = require("../controllers/startupController");

router.get("/me", protect, getMyStartup);

module.exports = router;

