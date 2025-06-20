import { useState } from "react";
import axios from "axios";

const countries = ["Ethiopia", "Kenya", "Nigeria", "South Africa"];
const industries = ["Healthcare", "Finance", "Education", "Agriculture"];
const subIndustries = {
  Healthcare: ["Pharmaceuticals", "Clinics", "Medical Devices"],
  Finance: ["Banking", "Microfinance", "Investment"],
  Education: ["EdTech", "Schools", "Training"],
  Agriculture: ["Crop", "Livestock", "AgriTech"],
};
const brokerDirect = ["Broker", "Direct"];
const capitalNeededOptions = [
  "< 500K ETB",
  "500K - 1M ETB",
  "1M - 5M",
  "5M+ ETB",
];

type Listing = {
  _id: string;
  businessName: string;
  capitalNeeded: string;
  country?: string;
  industry?: string;
  subIndustry?: string;
  brokerOrDirect?: string;
};

const PrivateEquityFilter = () => {
  const [filters, setFilters] = useState({
    keyword: "",
    country: "",
    industry: "",
    subIndustry: "",
    brokerOrDirect: "",
    capitalNeeded: "",
  });

  const [results, setResults] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const params = {
      listingType: "equity",
      ...filters,
    };

    try {
      const res = await axios.get(
        "https://hamlin-backend.onrender.com/api/listings",
        {
          params,
        }
      );
      setResults(res.data);
    } catch (error) {
      console.error("Error fetching equity listings", error);
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
        "https://hamlin-backend.onrender.com/api/interests",
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
        onSubmit={handleSearch}
        className="bg-soft-gold p-6 rounded-lg shadow max-w-xl mx-auto mt-10"
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        <h2 className="text-center text-base font-semibold text-gray-800">
          Private Equity Deals
        </h2>

        <input
          type="text"
          name="keyword"
          value={filters.keyword}
          onChange={handleChange}
          placeholder="Search by name, deal, keyword..."
          className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-700 placeholder-gray-400 mb-5 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div className="space-y-4">
          <div>
            <label
              htmlFor="country"
              className="block text-xs font-semibold text-gray-700 mb-1"
            >
              Country
            </label>
            <select
              id="country"
              name="country"
              value={filters.country}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            <label
              htmlFor="industry"
              className="block text-xs font-semibold text-gray-700 mb-1"
            >
              Industry
            </label>
            <select
              id="industry"
              name="industry"
              value={filters.industry}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            <label
              htmlFor="subIndustry"
              className="block text-xs font-semibold text-gray-700 mb-1"
            >
              Sub Industry
            </label>
            <select
              id="subIndustry"
              name="subIndustry"
              value={filters.subIndustry}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            <label
              htmlFor="brokerOrDirect"
              className="block text-xs font-semibold text-gray-700 mb-1"
            >
              Broker or Direct
            </label>
            <select
              id="brokerOrDirect"
              name="brokerOrDirect"
              value={filters.brokerOrDirect}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">-- Select --</option>
              {brokerDirect.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="capitalNeeded"
              className="block text-xs font-semibold text-gray-700 mb-1"
            >
              Capital Needed
            </label>
            <select
              id="capitalNeeded"
              name="capitalNeeded"
              value={filters.capitalNeeded}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">-- Select Range --</option>
              {capitalNeededOptions.map((cap) => (
                <option key={cap} value={cap}>
                  {cap}
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
            {loading ? "Searching..." : "Search Private Equity Deals"}
          </button>
        </div>
      </form>

      {/* Results */}
      <div
        className="mt-10 max-w-6xl mx-auto px-4"
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        {loading ? (
          <p className="text-center text-gray-500 text-sm">Loading...</p>
        ) : results.length === 0 ? (
          <p className="text-center text-gray-500 mt-6 text-sm">
            No listings found.
          </p>
        ) : (
          <div className="space-y-6 mt-6">
            {results.map((listing) => (
              <div
                key={listing._id}
                className="bg-white shadow p-4 rounded border border-gray-200"
              >
                <h3 className="font-semibold text-base mb-1 text-gray-900">
                  {listing.businessName}
                </h3>
                <p className="text-xs text-gray-600 mb-0.5">
                  Industry: {listing.industry}
                </p>
                <p className="text-xs text-gray-600 mb-0.5">
                  Sub Industry: {listing.subIndustry}
                </p>
                <p className="text-xs text-gray-600 mb-0.5">
                  Country: {listing.country}
                </p>
                <p className="text-xs text-gray-600 mb-0.5">
                  Capital Needed: {listing.capitalNeeded}
                </p>
                <p className="text-xs text-gray-600">
                  Deal Type: {listing.brokerOrDirect}
                </p>
                <button
                  onClick={() => handleShowInterest(listing._id)}
                  className="mt-3 inline-block bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 text-sm"
                >
                  Show Interest
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default PrivateEquityFilter;
