import React, { useEffect, useState } from "react";

type Startup = {
  _id: string;
  companyName: string;
  companyAge: string;
  companyType: string;
  annualTurnover?: string;
  registrationFile?: string;
  pitchDeck?: string;
  businessPlan?: string;
  financialModel?: string;
  founderProfile?: string;
  status?: string;
  createdAt: string;
};

const StartupAdminDashboard: React.FC = () => {
  const [startups, setStartups] = useState<Startup[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("http://localhost:5000/api/startup", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Unauthorized");
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setStartups(data);
        } else if (Array.isArray(data.startups)) {
          setStartups(data.startups);
        } else {
          console.warn("Unexpected response format", data);
          setStartups([]);
        }
      })
      .catch((err) => {
        console.error("Error fetching startups", err);
        alert(
          "Unable to load startup data. Please check your login or server."
        );
      })
      .finally(() => setLoading(false));
  }, []);

  const updateStatus = (id: string, status: string) => {
    const token = localStorage.getItem("token");

    fetch(`http://localhost:5000/api/startup/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to update status");
        setStartups((prev) =>
          prev.map((s) => (s._id === id ? { ...s, status } : s))
        );
      })
      .catch((err) => {
        console.error(err);
        alert("Failed to update status");
      });
  };

  if (loading) return <div className="p-8 text-gray-600">Loading...</div>;

  return (
    <div className="p-4 sm:p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800">
        Startup Applications Dashboard
      </h1>

      <div className="overflow-x-auto bg-white rounded-lg shadow-md border border-gray-200">
        <table className="min-w-[1000px] w-full text-sm text-left text-gray-700">
          <thead className="bg-gray-100 text-xs uppercase text-gray-600">
            <tr>
              <th className="p-3">Company</th>
              <th className="p-3">Age</th>
              <th className="p-3">Type</th>
              <th className="p-3">Turnover</th>
              <th className="p-3">Submitted</th>
              <th className="p-3">Files</th>
              <th className="p-3">Status</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {startups.length === 0 ? (
              <tr>
                <td
                  colSpan={8}
                  className="p-6 text-center text-gray-500 italic"
                >
                  No startup applications found.
                </td>
              </tr>
            ) : (
              startups.map((s) => (
                <tr
                  key={s._id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="p-3 font-medium text-gray-900">
                    {s.companyName}
                  </td>
                  <td className="p-3">{s.companyAge}</td>
                  <td className="p-3">{s.companyType}</td>
                  <td className="p-3">{s.annualTurnover || "—"}</td>
                  <td className="p-3">
                    {new Date(s.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-3 space-y-1 text-blue-600 text-xs">
                    {s.registrationFile && (
                      <a
                        href={`http://localhost:5000/uploads/${s.registrationFile}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block hover:underline"
                      >
                        📄 Registration
                      </a>
                    )}
                    {s.pitchDeck && (
                      <a
                        href={`http://localhost:5000/uploads/${s.pitchDeck}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block hover:underline"
                      >
                        📄 Pitch Deck
                      </a>
                    )}
                    {s.businessPlan && (
                      <a
                        href={`http://localhost:5000/uploads/${s.businessPlan}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block hover:underline"
                      >
                        📄 Business Plan
                      </a>
                    )}
                    {s.financialModel && (
                      <a
                        href={`http://localhost:5000/uploads/${s.financialModel}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block hover:underline"
                      >
                        📄 Financial Model
                      </a>
                    )}
                    {s.founderProfile && (
                      <a
                        href={`http://localhost:5000/uploads/${s.founderProfile}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block hover:underline"
                      >
                        📄 Founder Profile
                      </a>
                    )}
                  </td>
                  <td className="p-3">
                    <span
                      className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${
                        s.status === "approved"
                          ? "bg-green-100 text-green-700"
                          : s.status === "rejected"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {s.status || "Pending"}
                    </span>
                  </td>
                  <td className="p-3 space-y-1 sm:space-y-0 sm:space-x-2 sm:flex sm:items-center">
                    <button
                      onClick={() => updateStatus(s._id, "approved")}
                      className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-xs"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => updateStatus(s._id, "rejected")}
                      className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-xs"
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StartupAdminDashboard;
