import React, { useEffect, useState } from "react";

type Investor = {
  _id: string;
  fullName: string;
  email: string;
  company: string;
  investmentType: string;
  investmentVehicle: string;
  mnaServices: string[];
  advisoryServices: string[];
  status?: string;
};

const AdminDashboard: React.FC = () => {
  const [investors, setInvestors] = useState<Investor[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("No token found. Please login.");
      return;
    }

    fetch("https://hamlin-backend.onrender.com/api/investors", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Unauthorized access");
        return res.json();
      })
      .then(setInvestors)
      .catch((err) => {
        console.error("Error fetching investors", err);
        setError("Failed to fetch investor data.");
      });
  }, []);

  const updateStatus = (id: string, status: string) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("No token found. Please login.");
      return;
    }

    fetch(`https://hamlin-backend.onrender.com/api/investors/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to update status");
        return res.json();
      })
      .then(() =>
        setInvestors((prev) =>
          prev.map((inv) => (inv._id === id ? { ...inv, status } : inv))
        )
      )
      .catch((err) => alert(err.message));
  };

  return (
    <div className="p-4 sm:p-6 bg-gray-50 min-h-screen">
      {error && (
        <div className="mb-6 text-red-600 font-semibold bg-red-100 p-4 rounded">
          {error}
        </div>
      )}

      <div className="overflow-x-auto bg-white rounded-lg shadow-md border border-gray-200">
        <table className="min-w-[900px] w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-700 uppercase text-xs tracking-wider">
            <tr>
              <th className="px-4 py-3">Full Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Company</th>
              <th className="px-4 py-3">Investment Type</th>
              <th className="px-4 py-3">Vehicle</th>
              <th className="px-4 py-3">M&A Services</th>
              <th className="px-4 py-3">Advisory Services</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {investors.map((inv) => (
              <tr
                key={inv._id}
                className="hover:bg-gray-50 transition duration-200"
              >
                <td className="px-4 py-3 font-medium text-gray-900">
                  {inv.fullName}
                </td>
                <td className="px-4 py-3 text-blue-600 break-words">
                  {inv.email}
                </td>
                <td className="px-4 py-3">{inv.company || "—"}</td>
                <td className="px-4 py-3">{inv.investmentType}</td>
                <td className="px-4 py-3">{inv.investmentVehicle}</td>
                <td className="px-4 py-3">
                  {inv.mnaServices.length > 0 ? (
                    <ul className="list-disc list-inside text-xs text-gray-700">
                      {inv.mnaServices.map((s, idx) => (
                        <li key={idx}>{s}</li>
                      ))}
                    </ul>
                  ) : (
                    "—"
                  )}
                </td>
                <td className="px-4 py-3">
                  {inv.advisoryServices.length > 0 ? (
                    <ul className="list-disc list-inside text-xs text-gray-700">
                      {inv.advisoryServices.map((s, idx) => (
                        <li key={idx}>{s}</li>
                      ))}
                    </ul>
                  ) : (
                    "—"
                  )}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${
                      inv.status === "approved"
                        ? "bg-green-100 text-green-700"
                        : inv.status === "rejected"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {inv.status || "Pending"}
                  </span>
                </td>
                <td className="px-4 py-3 space-y-1 sm:space-y-0 sm:space-x-2 sm:flex sm:items-center">
                  <button
                    onClick={() => updateStatus(inv._id, "approved")}
                    className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-xs w-full sm:w-auto"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => updateStatus(inv._id, "rejected")}
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-xs w-full sm:w-auto"
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
            {investors.length === 0 && !error && (
              <tr>
                <td
                  colSpan={9}
                  className="px-4 py-6 text-center text-gray-500 italic"
                >
                  No investors registered yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
