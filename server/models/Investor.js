const mongoose = require("mongoose");

const investorSchema = new mongoose.Schema(
  {
    fullName: String,
    email: String,
    company: String,
    investmentType: String,
    investmentVehicle: String,
    mnaServices: [String],
    advisoryServices: [String],
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Investor", investorSchema);
