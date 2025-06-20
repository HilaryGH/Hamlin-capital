import { useState, useEffect } from "react";
import axios from "axios";

const industries = ["Manufacturing", "Retail", "IT Services", "Agriculture"];
const subIndustries = {
  Manufacturing: ["Food", "Textile", "Plastic"],
  Retail: ["Fashion", "Grocery", "Electronics"],
  IT: ["Software", "Support", "Security"],
  Agriculture: ["Livestock", "Crop", "Agri-Tech"],
};
const realEstateTypes = ["Owned", "Leased", "None"];
const companySizes = ["Small (1-10)", "Medium (11-50)", "Large (50+)"];
const guarantees = ["Yes", "No"];
const ttmRevenues = ["< 500K ETB", "500K - 1M ETB", "1M - 5M ETB", "5M+ ETB"];
const exitStrategies = ["Merger", "Acquisition", "IPO", "Private Sale"];
const corporateGovernances = ["Board-led", "Founder-led", "Family Business"];
const brokerDirect = ["Broker", "Direct"];
const capitalNeededOptions = [
  "< 100K ETB",
  "100K - 500K",
  "500K - 1M",
  "1M+ ETB",
];

type Listing = {
  _id: string;
  businessName: string;
  industry?: string;
  subIndustry?: string;
  realEstate?: string;
  companySize?: string;
  guarantee?: string;
  ttmRevenue?: string;
  exitStrategy?: string;
  governance?: string;
  brokerOrDirect?: string;
  capitalNeeded?: string;
};

const BusinessFilter = () => {
  const [filters, setFilters] = useState({
    keyword: "",
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
  });

  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "industry" && { subIndustry: "" }),
    }));
  };

  const fetchListings = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:5000/api/listings", {
        params: {
          ...filters,
          listingType: "business",
        },
      });
      setListings(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Failed to fetch listings", error);
      setListings([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchListings();
  };

  useEffect(() => {
    fetchListings();
  }, []);
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
    <div className="max-w-xl mx-auto p-4">
      <form
        onSubmit={handleSearch}
        className="bg-soft-gold border border-gray-200 p-6 rounded-xl shadow-sm text-sm space-y-4"
      >
        <h2 className="text-xl font-semibold text-center text-gray-800 mb-4">
          Businesses for sale Listings
        </h2>

        <input
          type="text"
          name="keyword"
          value={filters.keyword}
          onChange={handleChange}
          placeholder="Search by business name or keyword..."
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {[
          { label: "Industry", name: "industry", options: industries },
          {
            label: "Sub Industry",
            name: "subIndustry",
            options:
              subIndustries[filters.industry as keyof typeof subIndustries] ||
              [],
          },
          {
            label: "Real Estate",
            name: "realEstate",
            options: realEstateTypes,
          },
          { label: "Company Size", name: "companySize", options: companySizes },
          {
            label: "Corporate Guarantee",
            name: "guarantee",
            options: guarantees,
          },
          { label: "TTM Revenue", name: "ttmRevenue", options: ttmRevenues },
          {
            label: "Exit Strategy",
            name: "exitStrategy",
            options: exitStrategies,
          },
          {
            label: "Governance",
            name: "governance",
            options: corporateGovernances,
          },
          {
            label: "Broker or Direct",
            name: "brokerOrDirect",
            options: brokerDirect,
          },
          {
            label: "Capital Needed",
            name: "capitalNeeded",
            options: capitalNeededOptions,
          },
        ].map(({ label, name, options }) => (
          <div key={name}>
            <label className="block mb-1 text-gray-700 font-medium">
              {label}
            </label>
            <select
              name={name}
              value={filters[name as keyof typeof filters]}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">-- Select --</option>
              {options.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
        ))}

        <div className="text-center pt-3">
          <button
            type="submit"
            className="bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded hover:bg-blue-800"
          >
            Search Listings
          </button>
        </div>
      </form>

      <div className="mt-8 text-sm">
        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : listings.length === 0 ? (
          <p className="text-center text-gray-500">No listings found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {listings.map((listing) => (
              <div
                key={listing._id}
                className="bg-white border border-gray-200 p-4 rounded-xl shadow-sm"
              >
                <h3 className="text-base font-semibold text-gray-800 mb-2">
                  {listing.businessName}
                </h3>
                <div className="space-y-1 text-gray-600">
                  <p>Industry: {listing.industry || "N/A"}</p>
                  <p>Capital Needed: {listing.capitalNeeded || "N/A"}</p>
                  <p>Revenue: {listing.ttmRevenue || "N/A"}</p>
                </div>

                {/* Show Interest Button INSIDE the listing */}
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
    </div>
  );
};

export default BusinessFilter;
