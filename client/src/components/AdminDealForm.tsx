import { useState } from "react";
import axios from "axios";

const AdminDealForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    message: "",
    dealType: "Equity",
  });

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await axios.post(
        "https://hamlin-backend.onrender.com/api/admin/create-deal",
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setSuccess("Deal created and notifications sent!");
      setError("");
      setFormData({ title: "", message: "", dealType: "Equity" }); // Reset form
    } catch (err) {
      console.error(err);
      setError("Failed to create deal");
      setSuccess("");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-lg text-dark  mx-auto bg-white p-6 rounded shadow mt-8">
      <h2 className="text-xl text-blue-900 font-bold mb-4">Create New Deal</h2>

      {success && <p className="text-green-600">{success}</p>}
      {error && <p className="text-red-600">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Deal Title"
          value={formData.title}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
          disabled={submitting}
        />
        <input
          type="text"
          name="message"
          placeholder="Notification Message"
          value={formData.message}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
          disabled={submitting}
        />
        <select
          name="dealType"
          value={formData.dealType}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          disabled={submitting}
        >
          <option value="Equity">Equity</option>
          <option value="Debt">Debt</option>
          <option value="Sponsor">Sponsor</option>
          <option value="Merger">M&A</option>
        </select>
        <button
          type="submit"
          disabled={submitting}
          className={`bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 ${
            submitting ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {submitting ? "Publishing..." : "Publish Deal"}
        </button>
      </form>
    </div>
  );
};

export default AdminDealForm;
