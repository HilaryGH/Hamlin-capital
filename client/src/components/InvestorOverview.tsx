import React, { useEffect, useState } from "react";

type Document = {
  filename: string;
  path: string;
  uploadedAt: string;
};

type InvestorOverview = {
  fullName: string;
  email: string;
  company: string;
  investmentType: string;
  status: string;
  documentsCount: number;
  documents: Document[];
};

const InvestorOverview: React.FC = () => {
  const [overview, setOverview] = useState<InvestorOverview | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token"); // Or wherever you store JWT

    fetch("https://hamlin-backend.onrender.com/api/investors/me/overview", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch overview");
        return res.json();
      })
      .then((data) => {
        setOverview(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading overview...</div>;
  if (error) return <div className="text-red-600">Error: {error}</div>;

  if (!overview) return <div>No overview data available.</div>;

  return (
    <div className="p-6 bg-white rounded shadow-md max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Investor Overview</h2>

      <div className="mb-4">
        <h3 className="font-semibold">Profile</h3>
        <p>
          <strong>Name:</strong> {overview.fullName}
        </p>
        <p>
          <strong>Email:</strong> {overview.email}
        </p>
        <p>
          <strong>Company:</strong> {overview.company}
        </p>
        <p>
          <strong>Investment Type:</strong> {overview.investmentType}
        </p>
      </div>

      <div className="mb-4">
        <h3 className="font-semibold">Application Status</h3>
        <p
          className={`font-semibold ${
            overview.status === "approved"
              ? "text-green-600"
              : overview.status === "rejected"
              ? "text-red-600"
              : "text-yellow-600"
          }`}
        >
          {overview.status}
        </p>
      </div>

      <div>
        <h3 className="font-semibold mb-2">
          Uploaded Documents ({overview.documentsCount})
        </h3>
        {overview.documentsCount === 0 ? (
          <p>No documents uploaded yet.</p>
        ) : (
          <ul className="list-disc list-inside max-h-40 overflow-y-auto border p-2 rounded">
            {overview.documents.map((doc) => (
              <li key={doc.filename}>
                <a
                  href={`https://hamlin-backend.onrender.com/${doc.path}`} // serve files statically from backend
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  {doc.filename}
                </a>{" "}
                <span className="text-gray-500 text-sm">
                  (uploaded: {new Date(doc.uploadedAt).toLocaleDateString()})
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default InvestorOverview;
