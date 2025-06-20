const express = require("express");
const router = express.Router();

const {
  createInvestor,
  getAllInvestors,
  getMyInvestorForm,
  updateInvestorStatus,
} = require("../controllers/investorController");

const { protect } = require("../middleware/authMiddleware");

// ✅ Create a new investor form (for logged-in users)
router.post("/", protect, createInvestor);

// ✅ Get all investor submissions (admin only)
router.get("/", protect, getAllInvestors);

// ✅ Get logged-in user's own investor form
router.get("/me", protect, getMyInvestorForm);

// ✅ Add this line to enable updating investor status
router.patch("/:id", protect, updateInvestorStatus);




module.exports = router;


