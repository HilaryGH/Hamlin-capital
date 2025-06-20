import { useState } from "react";
import axios from "axios";

const industries = ["Technology", "Healthcare", "Finance", "Energy"];
const subIndustries: Record<string, string[]> = {
  Technology: ["AI", "SaaS", "E-commerce"],
  Healthcare: ["Biotech", "MedTech", "Health Services"],
  Finance: ["Fintech", "Insurance Tech", "Lending Platforms"],
  Energy: ["Renewables", "Oil & Gas", "Energy Storage"],
};
const companySizes = ["1-10", "11-50", "51-200", "201-500", "500+"];
const companyStages = [
  "Idea",
  "Pre-Seed",
  "Seed",
  "Series A",
  "Series B+",
  "Growth",
];
const fundingRounds = ["Pre-Seed", "Seed", "Series A", "Series B", "Series C+"];
const brokerOptions = ["Broker", "Direct Deal"];
const capitalNeeded = [
  "< $100K",
  "$100K - $500K",
  "$500K - $1M",
  "$1M - $5M",
  "$5M+",
];

type Listing = {
  _id: string;
  industry: string;
  subIndustry: string;
  companySize: string;
  companyStage: string;
  fundingRound: string;
  brokerOrDirect: string;
  capitalNeeded: string;
  businessName?: string;
};

const VentureCapitalFilter = () => {
  const [filters, setFilters] = useState({
    industry: "",
    subIndustry: "",
    companySize: "",
    companyStage: "",
    fundingRound: "",
    brokerType: "",
    capitalNeeded: "",
  });

  const [results, setResults] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "industry" ? { subIndustry: "" } : {}),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const params = {
        listingType: "venture",
        industry: filters.industry,
        subIndustry: filters.subIndustry,
        companySize: filters.companySize,
        companyStage: filters.companyStage,
        fundingRound: filters.fundingRound,
        brokerOrDirect: filters.brokerType,
        capitalNeeded: filters.capitalNeeded,
      };

      const res = await axios.get("http://localhost:5000/api/listings", {
        params,
      });

      setResults(res.data);
    } catch (err: any) {
      console.error(err.response?.data || err.message);
      setError("Something went wrong while fetching data.");
    } finally {
      setLoading(false);
    }
  };

  const handleShowInterest = async (listingId: string) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You need to log in first to show interest.");
      return;
    }

    try {
      await axios.post(
        "http://localhost:5000/api/interests",
        { listingId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Your interest has been recorded!");
    } catch (error) {
      console.error("Failed to show interest", error);
      alert("Failed to show interest. Please try again.");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 font-sans">
      <form
        onSubmit={handleSubmit}
        className="bg-soft-gold p-4 rounded-lg shadow space-y-4 text-sm"
      >
        <h2 className="text-center text-base font-semibold text-gray-800">
          Venture Capital Deals
        </h2>

        {/* Industry */}
        <div>
          <label className="block mb-1">Industry</label>
          <select
            name="industry"
            value={filters.industry}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-md"
          >
            <option value="">-- Select Industry --</option>
            {industries.map((i) => (
              <option key={i} value={i}>
                {i}
              </option>
            ))}
          </select>
        </div>

        {/* Sub Industry */}
        <div>
          <label className="block mb-1">Sub Industry</label>
          <select
            name="subIndustry"
            value={filters.subIndustry}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-md"
            disabled={!filters.industry}
          >
            <option value="">-- Select Sub Industry --</option>
            {(subIndustries[filters.industry] || []).map((sub) => (
              <option key={sub} value={sub}>
                {sub}
              </option>
            ))}
          </select>
        </div>

        {/* Company Size */}
        <div>
          <label className="block mb-1">Company Size</label>
          <select
            name="companySize"
            value={filters.companySize}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-md"
          >
            <option value="">-- Select Size --</option>
            {companySizes.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>

        {/* Company Stage */}
        <div>
          <label className="block mb-1">Company Stage</label>
          <select
            name="companyStage"
            value={filters.companyStage}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-md"
          >
            <option value="">-- Select Stage --</option>
            {companyStages.map((stage) => (
              <option key={stage} value={stage}>
                {stage}
              </option>
            ))}
          </select>
        </div>

        {/* Funding Round */}
        <div>
          <label className="block mb-1">Funding Round</label>
          <select
            name="fundingRound"
            value={filters.fundingRound}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-md"
          >
            <option value="">-- Select Round --</option>
            {fundingRounds.map((round) => (
              <option key={round} value={round}>
                {round}
              </option>
            ))}
          </select>
        </div>

        {/* Broker Type */}
        <div>
          <label className="block mb-1">Broker or Direct Deal</label>
          <select
            name="brokerType"
            value={filters.brokerType}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-md"
          >
            <option value="">-- Select Option --</option>
            {brokerOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        {/* Capital Needed */}
        <div>
          <label className="block mb-1">Capital Needed</label>
          <select
            name="capitalNeeded"
            value={filters.capitalNeeded}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-md"
          >
            <option value="">-- Select Capital --</option>
            {capitalNeeded.map((cap) => (
              <option key={cap} value={cap}>
                {cap}
              </option>
            ))}
          </select>
        </div>

        {/* Submit */}
        <div className="text-center pt-3">
          <button
            type="submit"
            className="bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded hover:bg-blue-800"
          >
            {loading ? "Searching..." : "Search"}
          </button>
        </div>

        {error && <p className="text-red-500 text-center">{error}</p>}
      </form>

      {/* Results */}
      <div className="mt-6">
        {loading ? (
          <p className="text-center text-gray-500 text-sm">Loading...</p>
        ) : results.length > 0 ? (
          <div className="space-y-4">
            {results.map((listing) => (
              <div
                key={listing._id}
                className="border p-3 rounded-md bg-white shadow-sm text-sm"
              >
                <h3 className="font-medium text-gray-800">
                  {listing.businessName || "Unnamed Business"}
                </h3>
                <p className="text-gray-600 mt-1">
                  {listing.industry} / {listing.subIndustry}
                </p>
                <p className="text-gray-500">
                  Size: {listing.companySize} | Stage: {listing.companyStage}
                </p>
                <p className="text-gray-500">
                  Round: {listing.fundingRound} | Capital:{" "}
                  {listing.capitalNeeded}
                </p>
                <p className="text-gray-500">Type: {listing.brokerOrDirect}</p>

                <button
                  onClick={() => handleShowInterest(listing._id)}
                  className="mt-3 inline-block bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 text-sm"
                >
                  Show Interest
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-400 text-sm">No results found.</p>
        )}
      </div>
    </div>
  );
};

export default VentureCapitalFilter;
