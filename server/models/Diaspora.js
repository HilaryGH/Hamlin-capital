// models/Diaspora.js
const mongoose = require("mongoose");

const diasporaSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    country: { type: String },
    interests: [String],
    message: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Diaspora", diasporaSchema);
