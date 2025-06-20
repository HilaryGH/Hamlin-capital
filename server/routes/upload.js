const express = require("express");
const multer = require("multer");
const { protect } = require("../middleware/authMiddleware");
const User = require("../models/User");

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});
const upload = multer({ storage });

router.post(
  "/api/startup/register",
  protect,
  upload.fields([
    { name: "registrationFile" },
    { name: "pitchDeck" },
    { name: "businessPlan" },
    { name: "financialModel" },
    { name: "founderProfile" },
  ]),
  async (req, res) => {
    try {
      const user = await User.findById(req.user._id);

      // Log the uploaded files to debug
      console.log("Uploaded Files:", req.files);

      // Store filenames
      const registrationFile = req.files["registrationFile"]?.[0]?.filename;
      const pitchDeck = req.files["pitchDeck"]?.[0]?.filename;
      const businessPlan = req.files["businessPlan"]?.[0]?.filename;
      const financialModel = req.files["financialModel"]?.[0]?.filename;
      const founderProfile = req.files["founderProfile"]?.[0]?.filename;

      // You can store these files in the user's model, or in a separate Startup model
      user.uploadedFiles.push(
        registrationFile,
        pitchDeck,
        businessPlan,
        financialModel,
        founderProfile
      );
      await user.save();

      res.status(200).json({
        message: "Files uploaded successfully",
        files: req.files,
      });
    } catch (err) {
      console.error("Upload error:", err);
      res.status(500).json({ message: "Upload failed" });
    }
  }
);


module.exports = router;
