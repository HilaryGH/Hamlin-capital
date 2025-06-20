const mongoose = require("mongoose");

const DebtDealSchema = new mongoose.Schema({
  title: String,
  description: String,
  country: String,
  industry: String,
  subIndustry: String,
  primaryUse: String,
  openToUse: String,
  companyStage: String,
  revenue: String,
});

module.exports = mongoose.model("DebtDeal", DebtDealSchema);
