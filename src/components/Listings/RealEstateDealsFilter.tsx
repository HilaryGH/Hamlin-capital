import { useState } from "react";
import axios from "axios";

const countries = ["Ethiopia", "Kenya", "South Africa", "Nigeria"];
const industries = [
  "Real Estate Development",
  "Property Management",
  "Construction",
];
const subIndustries = {
  "Real Estate Development": ["Residential", "Commercial", "Mixed-Use"],
  "Property Management": ["Office Spaces", "Retail Spaces"],
  Construction: ["Affordable Housing", "Luxury Projects"],
};
const investmentFocusOptions = [
  "Buy & Hold",
  "Value Add",
  "Opportunistic",
  "Development",
];
const legalStructures = ["LLC", "Partnership", "REIT", "Joint Venture"];
const irrTrackRecords = ["< 5%", "5% - 10%", "10% - 20%", "20%+"];

// Listing type
type Listing = {
  _id: string;
  title: string;
  description?: string;
  country?: string;
  industry?: string;
};

const RealEstateDealsFilter = () => {
  const [filters, setFilters] = useState({
    keyword: "",
    country: "",
    industry: "",
    subIndustry: "",
    investmentFocus: "",
    legalStructure: "",
    irrTrack: "",
  });

  const [results, setResults] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "industry" && { subIndustry: "" }),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.get("http://localhost:5000/api/listings", {
        params: {
          ...filters,
          listingType: "real-estate",
        },
      });

      const data = response.data;
      if (Array.isArray(data)) {
        setResults(data);
      } else if (Array.isArray(data.listings)) {
        setResults(data.listings);
      } else {
        setResults([]);
      }
    } catch (err) {
      console.error(err);
      setError("Failed to fetch real estate listings.");
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
          Real Estate Deals
        </h2>

        <input
          type="text"
          name="keyword"
          value={filters.keyword}
          onChange={handleChange}
          placeholder="Search real estate deals..."
          className="w-full border border-gray-300 px-3 py-2 rounded-md"
        />

        <div>
          <label className="block mb-1">Country</label>
          <select
            name="country"
            value={filters.country}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-md"
          >
            <option value="">-- Select Country --</option>
            {countries.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

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

        <div>
          <label className="block mb-1">Sub Industry</label>
          <select
            name="subIndustry"
            value={filters.subIndustry}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-md"
          >
            <option value="">-- Select Sub Industry --</option>
            {(
              subIndustries[filters.industry as keyof typeof subIndustries] ||
              []
            ).map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1">Investment Focus</label>
          <select
            name="investmentFocus"
            value={filters.investmentFocus}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-md"
          >
            <option value="">-- Select Focus --</option>
            {investmentFocusOptions.map((f) => (
              <option key={f} value={f}>
                {f}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1">Legal Structure</label>
          <select
            name="legalStructure"
            value={filters.legalStructure}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-md"
          >
            <option value="">-- Select Structure --</option>
            {legalStructures.map((l) => (
              <option key={l} value={l}>
                {l}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1">Historic IRR Track Record</label>
          <select
            name="irrTrack"
            value={filters.irrTrack}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-md"
          >
            <option value="">-- Select IRR Range --</option>
            {irrTrackRecords.map((i) => (
              <option key={i} value={i}>
                {i}
              </option>
            ))}
          </select>
        </div>

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
                <h3 className="font-medium text-gray-800">{listing.title}</h3>
                {listing.description && (
                  <p className="text-gray-600 mt-1">{listing.description}</p>
                )}
                <p className="text-gray-500 mt-1">
                  {listing.country} | {listing.industry}
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
        ) : (
          <p className="text-center text-gray-400 text-sm">No results found.</p>
        )}
      </div>
    </div>
  );
};

export default RealEstateDealsFilter;
