const mongoose = require("mongoose");

const subscriberSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  email: String,
  dealType: String,
});

module.exports = mongoose.model("Subscriber", subscriberSchema);


