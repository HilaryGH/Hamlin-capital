// routes/diasporaRoutes.js
const express = require("express");
const router = express.Router();
const {
  createDiasporaMember,
  getAllDiaspora,
} = require("../controllers/diasporaController");

router.post("/", createDiasporaMember);
router.get("/", getAllDiaspora);

module.exports = router;
