const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    coverLetter: { type: String },
    jobTitle: { type: String, required: true },
    resume: { type: String }, // ✅ New field
  },
  { timestamps: true }
);

module.exports = mongoose.model("Application", applicationSchema);

