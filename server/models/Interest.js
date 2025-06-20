const mongoose = require("mongoose");

const interestSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  listing: { type: mongoose.Schema.Types.ObjectId, ref: "Listing", required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Interest", interestSchema);

