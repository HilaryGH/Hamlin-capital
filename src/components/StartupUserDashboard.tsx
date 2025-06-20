import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

type Startup = {
  companyName: string;
  companyType: string;
  companyAge: string;
  annualTurnover?: string;
  status?: string;
  createdAt: string;
};

const StartupUserDashboard: React.FC = () => {
  const [startup, setStartup] = useState<Startup | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    axios
      .get("http://localhost:5000/api/startup/me", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setStartup(res.data.startup);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch startup:", err);
        setLoading(false);
      });
  }, [navigate]);

  if (loading)
    return (
      <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded shadow">
        <p className="text-gray-500 italic">Loading...</p>
      </div>
    );

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md border border-gray-200">
      <h2 className="text-2xl font-semibold text-blue-900 mb-6">
        🚀 Your Startup Submission
      </h2>

      {!startup ? (
        <p className="text-sm text-gray-600">No submission found.</p>
      ) : (
        <div className="space-y-4 text-sm sm:text-base text-gray-800">
          <div className="flex justify-between border-b pb-2">
            <span className="font-medium">Company Name:</span>
            <span>{startup.companyName}</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="font-medium">Type:</span>
            <span>{startup.companyType}</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="font-medium">Age:</span>
            <span>{startup.companyAge}</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="font-medium">Turnover:</span>
            <span>{startup.annualTurnover || "—"}</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="font-medium">Submitted on:</span>
            <span>{new Date(startup.createdAt).toLocaleDateString()}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-medium">Status:</span>
            <span
              className={`text-sm font-semibold px-3 py-1 rounded-full ${
                startup.status === "approved"
                  ? "bg-green-100 text-green-700"
                  : startup.status === "rejected"
                  ? "bg-red-100 text-red-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {startup.status || "Pending"}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default StartupUserDashboard;
