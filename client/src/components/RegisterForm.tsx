import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

type RegisterFormData = {
  name: string;
  email: string;
  password: string;
};

function RegisterForm() {
  const [form, setForm] = useState<RegisterFormData>({
    name: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState<string>("");
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://hamlin-backend.onrender.com/api/register",
        form
      );
      setMessage(res.data.message);
      navigate("/login");
    } catch (err: any) {
      const errorMsg =
        err.response?.data?.message ||
        "Something went wrong. Please try again.";
      setMessage(errorMsg);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="w-full bg-soft-gold max-w-md  p-6 rounded-2xl shadow-lg space-y-5"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Create Your Account
        </h2>

        <input
          name="name"
          onChange={handleChange}
          placeholder="Full Name"
          required
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
        />

        <input
          name="email"
          type="email"
          onChange={handleChange}
          placeholder="Email Address"
          required
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
        />

        <input
          name="password"
          type="password"
          onChange={handleChange}
          placeholder="Password"
          required
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition"
        >
          Register
        </button>

        {message && (
          <p className="text-sm text-center text-red-500 mt-2">{message}</p>
        )}
      </form>
    </div>
  );
}

export default RegisterForm;
