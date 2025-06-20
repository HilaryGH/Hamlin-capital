// models/Career.js
const mongoose = require("mongoose");

const careerSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  location: String,
  postedDate: { type: Date, default: Date.now },
  deadline: Date,
});

module.exports = mongoose.model("Career", careerSchema);
