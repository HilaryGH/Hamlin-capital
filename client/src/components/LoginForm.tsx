import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

type LoginFormData = {
  email: string;
  password: string;
};

function LoginForm() {
  const [form, setForm] = useState<LoginFormData>({
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
        "https://hamlin-backend.onrender.com/api/login",
        form
      );
      localStorage.setItem("token", res.data.token);

      const payload = JSON.parse(atob(res.data.token.split(".")[1]));
      localStorage.setItem("role", payload.role);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      if (payload.role === "admin") {
        navigate("/admin-dashboard");
      } else {
        navigate("/dashboard");
      }
    } catch (err: any) {
      const errorMsg =
        err.response?.data?.message ||
        "Something went wrong. Please try again.";
      setMessage(errorMsg);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-50 font-inter px-4">
      <div className="w-full max-w-md bg-soft-gold rounded-xl shadow-md p-8 space-y-6">
        <h2 className="text-2xl font-poppins font-semibold text-gray-800 text-center">
          Welcome to Hamlin Capital
        </h2>
        <p className="text-sm text-gray-500 text-center">
          Please login to your account
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email Address
            </label>
            <input
              name="email"
              type="email"
              onChange={handleChange}
              required
              placeholder="e.g. your@email.com"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              name="password"
              type="password"
              onChange={handleChange}
              required
              placeholder="••••••••"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition text-sm"
            />
          </div>

          {message && (
            <p className="text-red-600 text-sm text-center">{message}</p>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2.5 rounded-md transition"
          >
            Login
          </button>
        </form>

        <p className="text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-blue-600 hover:underline font-medium"
          >
            Register
          </Link>
        </p>
      </div>
    </section>
  );
}

export default LoginForm;
