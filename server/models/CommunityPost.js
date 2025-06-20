const mongoose = require("mongoose");

const communityPostSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    message: { type: String, required: true },
    location: { type: String },
  },
  { timestamps: true } // adds createdAt automatically
);

module.exports = mongoose.model("CommunityPost", communityPostSchema);
