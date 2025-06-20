import React, { useState } from "react";

type InvestorFormData = {
  fullName: string;
  email: string;
  company: string;
  investmentType: string;
  investmentVehicle: string;
  mnaServices: string[];
  advisoryServices: string[];
};

const mnaOptions = [
  "Buy Side",
  "Sell Side",
  "Valuation & Due Diligence",
  "Deal Negotiation",
];
const advisoryOptions = [
  "Asset & Wealth Management",
  "Capital Restructuring",
  "Strategic Guidance",
];

const InvestorForm: React.FC = () => {
  const [formData, setFormData] = useState<InvestorFormData>({
    fullName: "",
    email: "",
    company: "",
    investmentType: "",
    investmentVehicle: "",
    mnaServices: [],
    advisoryServices: [],
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (
    category: "mnaServices" | "advisoryServices",
    value: string
  ) => {
    setFormData((prev) => {
      const list = prev[category];
      const updatedList = list.includes(value)
        ? list.filter((item) => item !== value)
        : [...list, value];
      return { ...prev, [category]: updatedList };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:5000/api/investors", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // ✅ Include token
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      const data = await response.json();
      alert(data.message || "Form submitted successfully");
      setFormData({
        fullName: "",
        email: "",
        company: "",
        investmentType: "",
        investmentVehicle: "",
        mnaServices: [],
        advisoryServices: [],
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred while submitting the form.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-6">
        Investor Registration Form
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          className="w-full p-2 border rounded"
          value={formData.fullName}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full p-2 border rounded"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="company"
          placeholder="Company"
          className="w-full p-2 border rounded"
          value={formData.company}
          onChange={handleChange}
        />

        <select
          name="investmentType"
          className="w-full p-2 border rounded"
          value={formData.investmentType}
          onChange={handleChange}
          required
        >
          <option value="">Select Investment Type</option>
          <option value="Venture Capital">Venture Capital</option>
          <option value="Private Equity">Private Equity</option>
        </select>

        <select
          name="investmentVehicle"
          className="w-full p-2 border rounded"
          value={formData.investmentVehicle}
          onChange={handleChange}
          required
        >
          <option value="">Select Investment Vehicle</option>
          <option value="Equity">Equity</option>
          <option value="Debt">Debt</option>
          <option value="Hybrid">Hybrid</option>
        </select>

        <div>
          <label className="block font-medium">M&A Services</label>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {mnaOptions.map((service) => (
              <label key={service} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.mnaServices.includes(service)}
                  onChange={() => handleCheckboxChange("mnaServices", service)}
                />
                {service}
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block font-medium">Advisory Services</label>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {advisoryOptions.map((service) => (
              <label key={service} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.advisoryServices.includes(service)}
                  onChange={() =>
                    handleCheckboxChange("advisoryServices", service)
                  }
                />
                {service}
              </label>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default InvestorForm;
