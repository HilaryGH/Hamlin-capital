const Investor = require('../models/Investor');

// Save a new investor
const createInvestor = async (req, res) => {
  try {
    const newInvestor = new Investor({
      fullName: req.body.fullName,
      email: req.body.email,
      company: req.body.company,
      investmentType: req.body.investmentType,
      investmentVehicle: req.body.investmentVehicle,
      mnaServices: req.body.mnaServices,
      advisoryServices: req.body.advisoryServices,
      userId: req.user.id, // ✅ Link submission to user
    });

    await newInvestor.save();
    res.status(201).json({ message: "Investor submission saved!" });
  } catch (error) {
    console.error("Error creating investor:", error);
    res.status(500).json({ message: "Failed to save investor" });
  }
};

// (Optional) Get all investors
const getAllInvestors = async (req, res) => {
  try {
    const investors = await Investor.find();
    res.status(200).json(investors);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch investors" });
  }
};

// ✅ Get the investor form for the logged-in user
const getMyInvestorForm = async (req, res) => {
  try {
    const investor = await Investor.findOne({ userId: req.user.id });

    if (!investor) {
      return res.status(404).json({ message: "No submission found" });
    }

    res.status(200).json({ investor });
  } catch (error) {
    console.error("Error in getMyInvestorForm:", error);
    res.status(500).json({ message: "Server error" });
  }
};
// controllers/investorController.js
const updateInvestorStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ message: "Status is required" });
    }

    const investor = await Investor.findById(id);
    if (!investor) {
      return res.status(404).json({ message: "Investor not found" });
    }

    investor.status = status;
    await investor.save();

    res.status(200).json({ message: "Status updated", investor });
  } catch (err) {
    console.error("Error in updateInvestorStatus:", err); // <— See this in terminal
    res.status(500).json({ message: "Server error", error: err.message });
  }
};


module.exports = {
  createInvestor,
  getAllInvestors,
  getMyInvestorForm, // ✅ include it here
  updateInvestorStatus, // ✅ Add this
};
