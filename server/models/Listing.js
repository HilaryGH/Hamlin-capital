const mongoose = require("mongoose");

const ListingSchema = new mongoose.Schema({
  listingType: {
    type: String,
    required: true,
    enum: ["business", "debt", "equity", "real-estate", "venture"],
  },
  businessName: String,
  industry: String,
  subIndustry: String,
  realEstate: String,
  companySize: String,
  guarantee: String,
  ttmRevenue: String,
  exitStrategy: String,
  governance: String,
  brokerOrDirect: String,
  capitalNeeded: String,

  // Debt-specific
  country: String,
  primaryUse: String,
  openToUse: String,
  companyStage: String,
  revenue: String,

  // Equity-specific
  equityOffered: String,
  valuation: String,

  // Real estate-specific
  investmentFocus: String,
  legalStructure: String,
  irrTrack: String,

  // Venture-specific
  fundingRound: String,
});

module.exports = mongoose.model("Listing", ListingSchema);



