// models/UserNotification.js
const mongoose = require("mongoose");

const UserNotificationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId, // or String if your userId is not an ObjectId
      required: true,
    },
    title: String,
    message: String,
    dealType: String,
    read: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("UserNotification", UserNotificationSchema);
