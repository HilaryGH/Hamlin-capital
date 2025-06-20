const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const Application = require("../models/Application");

const router = express.Router();

// File upload config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = "uploads/resumes";

    // Automatically create the folder if it doesn't exist
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    cb(null, dir);
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueName + path.extname(file.originalname));
  },
});


const upload = multer({ storage });

// ✅ POST - Submit application
router.post("/", upload.single("resume"), async (req, res) => {
  try {
    const { fullName, email, coverLetter, jobTitle } = req.body;
    const resumePath = req.file ? req.file.path : null;

    const newApplication = new Application({
      fullName,
      email,
      coverLetter,
      jobTitle,
      resume: resumePath,
    });

    await newApplication.save();
    res.status(201).json({ message: "Application submitted successfully." });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: "Failed to submit application" });
  }
});

// ✅ GET - Fetch all applications
router.get("/", async (req, res) => {
  try {
    const applications = await Application.find().sort({ createdAt: -1 });
    res.status(200).json(applications);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch applications" });
  }
});

// ✅ GET - Download resume by filename
router.get("/resume/:filename", (req, res) => {
  const filePath = path.join(__dirname, "..", "uploads", "resumes", req.params.filename);

  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      return res.status(404).json({ error: "Resume not found" });
    }

    res.download(filePath, (downloadErr) => {
      if (downloadErr) {
        res.status(500).json({ error: "Error downloading the file" });
      }
    });
  });
});

module.exports = router;


