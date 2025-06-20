import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const StartupForm: React.FC = () => {
  const [formData, setFormData] = useState({
    companyName: "",
    companyAge: "",
    companyType: "",
    annualTurnover: "",
    registrationFile: null as File | null,
    pitchDeck: null as File | null,
    businessPlan: null as File | null,
    financialModel: null as File | null,
    founderProfile: null as File | null,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccessMessage("");
    setErrorMessage("");

    const data = new FormData();
    data.append("companyName", formData.companyName);
    data.append("companyAge", formData.companyAge);
    data.append("companyType", formData.companyType);
    data.append("annualTurnover", formData.annualTurnover);
    if (formData.registrationFile)
      data.append("registrationFile", formData.registrationFile);
    if (formData.pitchDeck) data.append("pitchDeck", formData.pitchDeck);
    if (formData.businessPlan)
      data.append("businessPlan", formData.businessPlan);
    if (formData.financialModel)
      data.append("financialModel", formData.financialModel);
    if (formData.founderProfile)
      data.append("founderProfile", formData.founderProfile);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setErrorMessage("❌ User not logged in. Token missing.");
        setIsSubmitting(false);
        return;
      }

      const response = await fetch(
        "http://localhost:5000/api/startup/register",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: data,
        }
      );

      const result = await response.json();

      if (response.ok) {
        setSuccessMessage("✅ Registration successful!");
        setFormData({
          companyName: "",
          companyAge: "",
          companyType: "",
          annualTurnover: "",
          registrationFile: null,
          pitchDeck: null,
          businessPlan: null,
          financialModel: null,
          founderProfile: null,
        });
        setTimeout(() => {
          navigate("/thank-you");
        }, 2000);
      } else {
        setErrorMessage(result.message || "❌ Something went wrong.");
      }
    } catch (error) {
      console.error("Network error:", error);
      setErrorMessage("❌ Network error during submission.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow mt-10">
      <h2 className="text-2xl font-bold mb-4">Startup Registration</h2>

      {successMessage && (
        <p className="text-green-600 font-medium mb-4">{successMessage}</p>
      )}
      {errorMessage && (
        <p className="text-red-600 font-medium mb-4">{errorMessage}</p>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <input
          type="text"
          name="companyName"
          placeholder="Company Name"
          value={formData.companyName}
          onChange={handleChange}
          className="w-full border p-3 rounded"
          required
        />

        <input
          type="text"
          name="companyAge"
          placeholder="Company Age"
          value={formData.companyAge}
          onChange={handleChange}
          className="w-full border p-3 rounded"
          required
        />

        <input
          type="text"
          name="companyType"
          placeholder="Company Type"
          value={formData.companyType}
          onChange={handleChange}
          className="w-full border p-3 rounded"
          required
        />

        <input
          type="text"
          name="annualTurnover"
          placeholder="Annual Turnover"
          value={formData.annualTurnover}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <label className="block">
          <span className="text-gray-700">Business Registration & License</span>
          <input
            type="file"
            name="registrationFile"
            onChange={handleFileChange}
            className="block w-full mt-1 border p-2 rounded"
            accept=".pdf,.jpg,.png,.doc,.docx"
            required
          />
        </label>

        <label className="block">
          <span className="text-gray-700">Pitch Deck</span>
          <input
            type="file"
            name="pitchDeck"
            onChange={handleFileChange}
            className="block w-full mt-1 border p-2 rounded"
            accept=".pdf,.ppt,.pptx"
            required
          />
        </label>

        <label className="block">
          <span className="text-gray-700">Business Plan</span>
          <input
            type="file"
            name="businessPlan"
            onChange={handleFileChange}
            className="block w-full mt-1 border p-2 rounded"
            accept=".pdf,.doc,.docx"
            required
          />
        </label>

        <label className="block">
          <span className="text-gray-700">Full-Fledged Financial Model</span>
          <input
            type="file"
            name="financialModel"
            onChange={handleFileChange}
            className="block w-full mt-1 border p-2 rounded"
            accept=".xlsx,.xls,.csv,.pdf"
            required
          />
        </label>

        <label className="block">
          <span className="text-gray-700">Founders' Profile</span>
          <input
            type="file"
            name="founderProfile"
            onChange={handleFileChange}
            className="block w-full mt-1 border p-2 rounded"
            accept=".pdf,.doc,.docx"
            required
          />
        </label>

        <button
          type="submit"
          className="bg-blue-600 text-white py-3 px-6 rounded hover:bg-blue-700 disabled:opacity-50"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit Registration"}
        </button>
      </form>
    </div>
  );
};

export default StartupForm;
