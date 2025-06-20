import { useState } from "react";
import axios from "axios";

type ListingFormData = {
  listingType: "business" | "debt" | "equity" | "real-estate" | "venture";
  businessName: string;
  industry: string;
  subIndustry: string;
  realEstate: string;
  companySize: string;
  guarantee: string;
  ttmRevenue: string;
  exitStrategy: string;
  governance: string;
  brokerOrDirect: string;
  capitalNeeded: string;
  equityOffered?: string;
  valuation?: string;
  country?: string;
  primaryUse?: string;
  companyStage?: string;
  investmentFocus?: string;
  legalStructure?: string;
  irrTrack?: string;
  fundingRound?: string;
};

const initialForm: ListingFormData = {
  listingType: "business",
  businessName: "",
  industry: "",
  subIndustry: "",
  realEstate: "",
  companySize: "",
  guarantee: "",
  ttmRevenue: "",
  exitStrategy: "",
  governance: "",
  brokerOrDirect: "",
  capitalNeeded: "",
  equityOffered: "",
  valuation: "",
  country: "",
  primaryUse: "",
  companyStage: "",
  investmentFocus: "",
  legalStructure: "",
  irrTrack: "",
  fundingRound: "",
};

const industries = [
  "Technology",
  "Healthcare",
  "Finance",
  "Energy",
  "Agriculture",
  "Manufacturing",
];
const subIndustries: Record<string, string[]> = {
  Technology: ["AI", "SaaS", "E-commerce"],
  Healthcare: ["Biotech", "MedTech", "Health Services"],
  Finance: ["Fintech", "Insurance Tech", "Lending Platforms"],
  Energy: ["Renewables", "Oil & Gas", "Energy Storage"],
};
const countries = ["Ethiopia", "Kenya", "South Africa", "Nigeria"];
const investmentFocusOptions = [
  "Buy & Hold",
  "Value Add",
  "Opportunistic",
  "Development",
];
const legalStructures = ["LLC", "Partnership", "REIT", "Joint Venture"];
const irrTrackRecords = ["< 5%", "5% - 10%", "10% - 20%", "20%+"];
const companyStages = [
  "Idea",
  "Pre-Seed",
  "Seed",
  "Series A",
  "Series B+",
  "Growth",
];
const fundingRounds = ["Pre-Seed", "Seed", "Series A", "Series B", "Series C+"];
const companySizes = ["1-10", "11-50", "51-200", "201-500", "500+"];
const brokerOptions = ["Broker", "Direct Deal"];
const capitalNeededOptions = [
  "< $100K",
  "$100K - $500K",
  "$500K - $1M",
  "$1M - $5M",
  "$5M+",
];
const guarantees = ["Yes", "No"];
const ttmRevenues = ["< 500K ETB", "500K - 1M ETB", "1M - 5M ETB", "5M+ ETB"];
const exitStrategies = ["Merger", "Acquisition", "IPO", "Private Sale"];
const corporateGovernances = ["Board-led", "Founder-led", "Family Business"];
const realEstateTypes = ["Owned", "Leased", "None"];

const AdminListingForm = () => {
  const [formData, setFormData] = useState<ListingFormData>(initialForm);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "industry" && { subIndustry: "" }),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/listings", formData);
      alert("Listing created successfully");
      setFormData(initialForm);
    } catch (err) {
      console.error(err);
      alert("Error creating listing");
    }
  };

  const isBusiness = formData.listingType === "business";
  const isRealEstate = formData.listingType === "real-estate";
  const isEquity = formData.listingType === "equity";
  const isDebt = formData.listingType === "debt";
  const isVenture = formData.listingType === "venture";

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto p-5 bg-white text-dark shadow rounded space-y-4"
    >
      <h2 className="text-xl text-blue-900 font-bold mb-4">
        Create New Listing
      </h2>

      <select
        name="listingType"
        value={formData.listingType}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      >
        <option value="business">Business</option>
        <option value="debt">Debt</option>
        <option value="equity">Equity</option>
        <option value="real-estate">Real Estate</option>
        <option value="venture">Venture</option>
      </select>

      <input
        name="businessName"
        value={formData.businessName}
        onChange={handleChange}
        placeholder="Title / Project Name"
        className="w-full border p-2 rounded"
      />

      {/* BUSINESS FIELDS */}
      {isBusiness && (
        <>
          <div className="space-y-2">
            <select
              name="industry"
              value={formData.industry}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            >
              <option value="">-- Select Industry --</option>
              {industries.map((industry) => (
                <option key={industry} value={industry}>
                  {industry}
                </option>
              ))}
            </select>

            <select
              name="subIndustry"
              value={formData.subIndustry}
              onChange={handleChange}
              disabled={!formData.industry}
              className="w-full border p-2 rounded"
            >
              <option value="">-- Select Sub Industry --</option>
              {(subIndustries[formData.industry] || []).map((sub) => (
                <option key={sub} value={sub}>
                  {sub}
                </option>
              ))}
            </select>

            <select
              name="realEstate"
              value={formData.realEstate}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            >
              <option value="">-- Real Estate --</option>
              {realEstateTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>

            <select
              name="companySize"
              value={formData.companySize}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            >
              <option value="">-- Company Size --</option>
              {companySizes.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>

            <select
              name="guarantee"
              value={formData.guarantee}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            >
              <option value="">-- Corporate Guarantee --</option>
              {guarantees.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>

            <select
              name="ttmRevenue"
              value={formData.ttmRevenue}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            >
              <option value="">-- TTM Revenue --</option>
              {ttmRevenues.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>

            <select
              name="exitStrategy"
              value={formData.exitStrategy}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            >
              <option value="">-- Exit Strategy --</option>
              {exitStrategies.map((e) => (
                <option key={e} value={e}>
                  {e}
                </option>
              ))}
            </select>

            <select
              name="governance"
              value={formData.governance}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            >
              <option value="">-- Governance --</option>
              {corporateGovernances.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>

            <select
              name="brokerOrDirect"
              value={formData.brokerOrDirect}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            >
              <option value="">-- Broker or Direct --</option>
              {brokerOptions.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>

            <select
              name="capitalNeeded"
              value={formData.capitalNeeded}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            >
              <option value="">-- Capital Needed --</option>
              {capitalNeededOptions.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        </>
      )}

      {/* REAL ESTATE FIELDS */}
      {isRealEstate && (
        <>
          <select
            name="country"
            value={formData.country}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          >
            <option value="">-- Select Country --</option>
            {countries.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>

          <select
            name="industry"
            value={formData.industry}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          >
            <option value="">-- Select Industry --</option>
            {industries.map((i) => (
              <option key={i} value={i}>
                {i}
              </option>
            ))}
          </select>

          <select
            name="subIndustry"
            value={formData.subIndustry}
            onChange={handleChange}
            disabled={!formData.industry}
            className="w-full border p-2 rounded"
            required
          >
            <option value="">-- Select Sub Industry --</option>
            {(subIndustries[formData.industry] || []).map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>

          <select
            name="investmentFocus"
            value={formData.investmentFocus}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          >
            <option value="">-- Select Investment Focus --</option>
            {investmentFocusOptions.map((i) => (
              <option key={i} value={i}>
                {i}
              </option>
            ))}
          </select>

          <select
            name="legalStructure"
            value={formData.legalStructure}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          >
            <option value="">-- Select Legal Structure --</option>
            {legalStructures.map((l) => (
              <option key={l} value={l}>
                {l}
              </option>
            ))}
          </select>

          <select
            name="irrTrack"
            value={formData.irrTrack}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          >
            <option value="">-- Select Historic IRR --</option>
            {irrTrackRecords.map((i) => (
              <option key={i} value={i}>
                {i}
              </option>
            ))}
          </select>
        </>
      )}

      {isEquity && (
        <>
          <input
            name="businessName"
            value={formData.businessName}
            onChange={handleChange}
            placeholder="Project Name"
            className="w-full border p-2 rounded"
          />

          <select
            name="country"
            value={formData.country}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          >
            <option value="">-- Select Country --</option>
            {countries.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>

          <select
            name="industry"
            value={formData.industry}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          >
            <option value="">-- Select Industry --</option>
            {industries.map((i) => (
              <option key={i} value={i}>
                {i}
              </option>
            ))}
          </select>

          <select
            name="subIndustry"
            value={formData.subIndustry}
            onChange={handleChange}
            disabled={!formData.industry}
            className="w-full border p-2 rounded"
          >
            <option value="">-- Select Sub Industry --</option>
            {(subIndustries[formData.industry] || []).map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>

          <select
            name="brokerOrDirect"
            value={formData.brokerOrDirect}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          >
            <option value="">-- Select Broker or Direct --</option>
            {brokerOptions.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>

          <select
            name="capitalNeeded"
            value={formData.capitalNeeded}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          >
            <option value="">-- Select Capital Needed --</option>
            {capitalNeededOptions.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </>
      )}

      {/* DEBT FIELDS */}
      {isDebt && (
        <>
          <select
            name="country"
            value={formData.country}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          >
            <option value="">-- Select Country --</option>
            {countries.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>

          <input
            name="primaryUse"
            value={formData.primaryUse}
            onChange={handleChange}
            placeholder="Primary Use of Funds"
            className="w-full border p-2 rounded"
            required
          />
          <select
            name="companyStage"
            value={formData.companyStage}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          >
            <option value="">-- Select Company Stage --</option>
            {companyStages.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </>
      )}

      {/* VENTURE FIELDS */}
      {isVenture && (
        <>
          <select
            name="industry"
            value={formData.industry}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          >
            <option value="">-- Select Industry --</option>
            {industries.map((i) => (
              <option key={i} value={i}>
                {i}
              </option>
            ))}
          </select>

          <select
            name="subIndustry"
            value={formData.subIndustry}
            onChange={handleChange}
            disabled={!formData.industry}
            className="w-full border p-2 rounded"
            required
          >
            <option value="">-- Select Sub Industry --</option>
            {(subIndustries[formData.industry] || []).map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>

          <select
            name="companySize"
            value={formData.companySize}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          >
            <option value="">-- Select Company Size --</option>
            {companySizes.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>

          <select
            name="companyStage"
            value={formData.companyStage}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          >
            <option value="">-- Select Company Stage --</option>
            {companyStages.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>

          <select
            name="fundingRound"
            value={formData.fundingRound}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          >
            <option value="">-- Select Funding Round --</option>
            {fundingRounds.map((f) => (
              <option key={f} value={f}>
                {f}
              </option>
            ))}
          </select>

          <select
            name="brokerOrDirect"
            value={formData.brokerOrDirect}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          >
            <option value="">-- Select Broker Type --</option>
            {brokerOptions.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>

          <select
            name="capitalNeeded"
            value={formData.capitalNeeded}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          >
            <option value="">-- Select Capital Needed --</option>
            {capitalNeededOptions.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </>
      )}

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-900"
      >
        Submit Listing
      </button>
    </form>
  );
};

export default AdminListingForm;
