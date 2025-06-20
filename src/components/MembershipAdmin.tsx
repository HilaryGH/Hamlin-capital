import React, { useEffect, useState } from "react";

type Member = {
  _id: string;
  name: string;
  email: string;
  planId: string;
  createdAt: string;
};

const MembershipAdmin: React.FC = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/memberships");
        if (!res.ok)
          throw new Error(`Fetch failed: ${res.status} ${res.statusText}`);

        const data = await res.json();
        if (!Array.isArray(data)) throw new Error("Response is not an array");

        setMembers(data);
      } catch (err: any) {
        console.error("Error fetching members:", err);
        setError(err.message || "Something went wrong.");
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold text-blue-900 mb-6">
        🛠️ Admin Dashboard – Members
      </h1>

      {loading && (
        <div className="text-gray-600 text-lg animate-pulse">Loading...</div>
      )}

      {error && (
        <div className="text-red-600 bg-red-100 p-4 rounded-md border border-red-300 mb-4">
          ⚠️ Error: {error}
        </div>
      )}

      {!loading && !error && members.length === 0 && (
        <p className="text-gray-500 italic">No members joined yet.</p>
      )}

      {!loading && !error && members.length > 0 && (
        <div className="overflow-x-auto rounded-xl shadow-md border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200 bg-white">
            <thead className="bg-blue-100 text-blue-900 text-sm uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4 text-left">Name</th>
                <th className="px-6 py-4 text-left">Email</th>
                <th className="px-6 py-4 text-left">Plan</th>
                <th className="px-6 py-4 text-left">Joined At</th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-700">
              {members.map((m, i) => (
                <tr
                  key={m._id}
                  className={i % 2 === 0 ? "bg-gray-50" : "bg-white"}
                >
                  <td className="px-6 py-4 font-medium">{m.name}</td>
                  <td className="px-6 py-4">{m.email}</td>
                  <td className="px-6 py-4 capitalize">{m.planId}</td>
                  <td className="px-6 py-4">
                    {new Date(m.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MembershipAdmin;
