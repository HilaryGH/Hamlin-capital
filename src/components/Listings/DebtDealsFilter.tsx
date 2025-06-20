import { useState } from "react";
import axios from "axios";

type Listing = {
  _id: string;
  businessName?: string;
  industry?: string;
  subIndustry?: string;
  primaryUse?: string;
  openToUse?: string;
  companyStage?: string;
  revenue?: string;
  ttmRevenue?: string;
};

const countries = ["Ethiopia", "Kenya", "Nigeria", "South Africa"];
const industries = ["Healthcare", "Finance", "Education", "Agriculture"];
const subIndustries = {
  Healthcare: ["Pharmaceuticals", "Clinics", "Medical Devices"],
  Finance: ["Banking", "Microfinance", "Investment"],
  Education: ["EdTech", "Schools", "Training"],
  Agriculture: ["Crop", "Livestock", "AgriTech"],
};

const primaryUses = [
  "Working Capital",
  "Expansion",
  "Equipment Purchase",
  "Refinancing",
];
const openUses = ["Yes", "No"];
const companyStages = ["Startup", "Growth", "Mature"];
const revenueRanges = ["< 1M ETB", "1M - 5M ETB", "5M - 10M ETB", "10M+ ETB"];

const DebtDealsFilter = () => {
  const [filters, setFilters] = useState({
    keyword: "",
    country: "",
    industry: "",
    subIndustry: "",
    primaryUse: "",
    openToUse: "",
    companyStage: "",
    revenue: "",
  });
  const [results, setResults] = useState<Listing[]>([]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.get("http://localhost:5000/api/listings", {
        params: { ...filters, listingType: "debt" },
      });
      setResults(response.data);
    } catch (err) {
      console.error("Error fetching filtered listings", err);
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
    <>
      <form
        onSubmit={handleSubmit}
        className="bg-soft-gold p-6 rounded-lg shadow max-w-xl mx-auto mt-10"
      >
        <h2 className="text-center text-base font-semibold text-gray-800">
          Debt Deals
        </h2>

        <input
          type="text"
          name="keyword"
          value={filters.keyword}
          onChange={handleChange}
          placeholder="Search by deal, keyword..."
          className="w-full border border-gray-300 rounded px-3 py-2 text-xs mb-5 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* All filters stacked vertically */}
        <div className="space-y-5">
          <div>
            <label className="block text-xs font-semibold mb-1 text-gray-700">
              Country
            </label>
            <select
              name="country"
              value={filters.country}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">-- Select Country --</option>
              {countries.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold mb-1 text-gray-700">
              Industry
            </label>
            <select
              name="industry"
              value={filters.industry}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">-- Select Industry --</option>
              {industries.map((ind) => (
                <option key={ind} value={ind}>
                  {ind}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold mb-1 text-gray-700">
              Sub Industry
            </label>
            <select
              name="subIndustry"
              value={filters.subIndustry}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={!filters.industry}
            >
              <option value="">-- Select Sub Industry --</option>
              {(
                subIndustries[filters.industry as keyof typeof subIndustries] ||
                []
              ).map((sub) => (
                <option key={sub} value={sub}>
                  {sub}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold mb-1 text-gray-700">
              Primary Use of Funds
            </label>
            <select
              name="primaryUse"
              value={filters.primaryUse}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">-- Select --</option>
              {primaryUses.map((use) => (
                <option key={use} value={use}>
                  {use}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold mb-1 text-gray-700">
              Open to Other Use of Funds?
            </label>
            <select
              name="openToUse"
              value={filters.openToUse}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">-- Select --</option>
              {openUses.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold mb-1 text-gray-700">
              Company Stage
            </label>
            <select
              name="companyStage"
              value={filters.companyStage}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">-- Select Stage --</option>
              {companyStages.map((stage) => (
                <option key={stage} value={stage}>
                  {stage}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold mb-1 text-gray-700">
              Revenue
            </label>
            <select
              name="revenue"
              value={filters.revenue}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">-- Select Revenue --</option>
              {revenueRanges.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="text-center pt-3">
          <button
            type="submit"
            className="bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded hover:bg-blue-800"
          >
            Search Debt Deals
          </button>
        </div>
      </form>

      <div className="mt-10 max-w-xl mx-auto">
        {results.length === 0 ? (
          <p className="text-gray-500 text-center text-xs">
            No listings found.
          </p>
        ) : (
          results.map((listing) => (
            <div
              key={listing._id}
              className="bg-white shadow p-4 mb-4 rounded border border-gray-200 text-xs"
            >
              <h3 className="font-bold text-sm mb-1">{listing.businessName}</h3>
              <p className="text-gray-600">Industry: {listing.industry}</p>
              <p className="text-gray-600">Sub: {listing.subIndustry}</p>
              <p className="text-gray-600">
                Use of Funds: {listing.primaryUse}
              </p>
              <p className="text-gray-600">
                Company Stage: {listing.companyStage}
              </p>
              <p className="text-gray-600">
                Revenue: {listing.revenue || listing.ttmRevenue}
              </p>
              {/* Show Interest Button INSIDE the listing */}
              <button
                onClick={() => handleShowInterest(listing._id)}
                className="mt-3 inline-block bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 text-sm"
              >
                Show Interest
              </button>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default DebtDealsFilter;
