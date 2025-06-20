import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

type InvestorData = {
  _id: string;
  fullName: string;
  email: string;
  company: string;
  investmentType: string;
  investmentVehicle: string;
  mnaServices: string[];
  advisoryServices: string[];
  status: string;
};

const InvestorDashboard: React.FC = () => {
  const [data, setData] = useState<InvestorData | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    axios
      .get("https://hamlin-backend.onrender.com/api/investors/me", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setData(res.data.investor);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch investor data", err);
        setLoading(false);
      });
  }, [navigate, token]);

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 mt-10 bg-white rounded-xl shadow-md border border-gray-200">
      <h2 className="text-xl sm:text-2xl font-semibold text-blue-900 mb-6 text-center">
        🧾 Your Investment Submission
      </h2>

      {loading ? (
        <p className="text-gray-500 italic text-center">
          Loading your details...
        </p>
      ) : !data ? (
        <p className="text-sm text-gray-500 text-center">
          No submission found.
        </p>
      ) : (
        <div className="space-y-4 text-gray-800 text-sm sm:text-base">
          <ResponsiveRow label="Full Name:" value={data.fullName} />
          <ResponsiveRow label="Email:" value={data.email} />
          <ResponsiveRow label="Company:" value={data.company} />
          <ResponsiveRow label="Investment Type:" value={data.investmentType} />
          <ResponsiveRow label="Vehicle:" value={data.investmentVehicle} />
          <ResponsiveRow
            label="Status:"
            value={
              <span className="text-blue-700 font-semibold">{data.status}</span>
            }
          />
          <ResponsiveColumn label="M&A Services:" value={data.mnaServices} />
          <ResponsiveColumn
            label="Advisory Services:"
            value={data.advisoryServices}
          />
        </div>
      )}
    </div>
  );
};

// Reusable responsive row
const ResponsiveRow = ({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) => (
  <div className="flex flex-col sm:flex-row justify-between border-b pb-2 gap-1 sm:gap-4">
    <span className="font-medium w-full sm:w-1/2">{label}</span>
    <span className="text-right sm:text-left w-full sm:w-1/2 break-words">
      {value}
    </span>
  </div>
);

// Reusable column for lists
const ResponsiveColumn = ({
  label,
  value,
}: {
  label: string;
  value: string[];
}) => (
  <div className="flex flex-col border-b pb-2">
    <span className="font-medium">{label}</span>
    <span className="mt-1 text-gray-700 break-words">
      {value.length > 0 ? value.join(", ") : "None"}
    </span>
  </div>
);

export default InvestorDashboard;
