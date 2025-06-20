// models/Deal.js
const mongoose = require("mongoose");

const dealSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    dealType: {
      type: String,
      required: true,
      enum: ["Equity", "Debt", "Sponsor", "Merger"], // allowed values
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt
  }
);

module.exports = mongoose.model("Deal", dealSchema);
