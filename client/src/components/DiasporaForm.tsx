import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import axios from "axios";

type Props = {
  onSubmitSuccess: () => void;
};

const DiasporaForm = ({ onSubmitSuccess }: Props) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    country: "",
    interests: "",
    message: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        interests: formData.interests.split(",").map((i) => i.trim()),
      };
      await axios.post(
        "https://hamlin-backend.onrender.com/api/diaspora",
        payload
      );
      alert("Thank you for joining!");
      setFormData({
        fullName: "",
        email: "",
        country: "",
        interests: "",
        message: "",
      });
      onSubmitSuccess();
    } catch (err) {
      alert("Error submitting form");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xs mx-auto bg-white p-3 shadow-md rounded-xl mt-6 text-xs"
    >
      <h3 className="text-sm md:text-xl font-semibold text-center mb-3">
        Join the Diaspora Network
      </h3>

      <div className="mb-2">
        <label htmlFor="fullName" className="block mb-1">
          Full Name
        </label>
        <input
          type="text"
          id="fullName"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded px-2 py-1"
        />
      </div>

      <div className="mb-2">
        <label htmlFor="email" className="block mb-1">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded px-2 py-1"
        />
      </div>

      <div className="mb-2">
        <label htmlFor="country" className="block mb-1">
          Country
        </label>
        <input
          type="text"
          id="country"
          name="country"
          value={formData.country}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded px-2 py-1"
        />
      </div>

      <div className="mb-2">
        <label htmlFor="interests" className="block mb-1">
          Interests
        </label>
        <input
          type="text"
          id="interests"
          name="interests"
          value={formData.interests}
          onChange={handleChange}
          placeholder="e.g. business, culture"
          className="w-full border border-gray-300 rounded px-2 py-1"
        />
      </div>

      <div className="mb-2">
        <label htmlFor="message" className="block mb-1">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={3}
          className="w-full border border-gray-300 rounded px-2 py-1"
          placeholder="Brief message"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-1 rounded mt-2 text-xs"
      >
        Submit
      </button>
    </form>
  );
};

export default DiasporaForm;
