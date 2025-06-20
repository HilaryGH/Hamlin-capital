// models/Membership.js
const mongoose = require("mongoose");

const membershipSchema = new mongoose.Schema(
  {
    planId: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Membership", membershipSchema);
