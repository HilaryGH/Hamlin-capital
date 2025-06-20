// models/Startup.js
const mongoose = require("mongoose");

const startupSchema = new mongoose.Schema(
  {
    companyName: String,
    companyAge: String,
    companyType: String,
    annualTurnover: String,
    registrationFile: String,
    pitchDeck: String,
    businessPlan: String,
    financialModel: String,
    founderProfile: String,
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Startup", startupSchema);


