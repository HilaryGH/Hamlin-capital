// controllers/diasporaController.js
const Diaspora = require("../models/Diaspora");

// Create a new member
const createDiasporaMember = async (req, res) => {
  try {
    const newMember = await Diaspora.create(req.body);
    res.status(201).json(newMember);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get all members
const getAllDiaspora = async (req, res) => {
  try {
    const members = await Diaspora.find().sort({ createdAt: -1 });
    res.json(members);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createDiasporaMember,
  getAllDiaspora,
};
