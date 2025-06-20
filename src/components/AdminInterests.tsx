// AdminInterests.tsx
import { useEffect, useState } from "react";
import axios from "axios";

type Interest = {
  _id: string;
  user: {
    name: string;
    email: string;
  };
  listing: {
    _id: string;
    businessName: string;
  };
  createdAt: string;
};

const AdminInterests = () => {
  const [interests, setInterests] = useState<Interest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInterests = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/interests");
        setInterests(res.data);
      } catch (err) {
        console.error("Failed to fetch interests", err);
      } finally {
        setLoading(false);
      }
    };

    fetchInterests();
  }, []);

  return (
    <div className="max-w-3xl text-dark mx-auto p-6">
      {loading ? (
        <p>Loading...</p>
      ) : interests.length === 0 ? (
        <p>No interests found.</p>
      ) : (
        <table className="w-full border-collapse border text-sm">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="p-2 border">#</th>
              <th className="p-2 border">Listing</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Date</th>
            </tr>
          </thead>
          <tbody>
            {interests.map((i, index) => (
              <tr key={i._id} className="hover:bg-gray-50">
                <td className="p-2 border">{index + 1}</td>
                <td className="p-2 border">
                  {i.listing?.businessName || "N/A"}
                </td>
                <td className="p-2 border">{i.user?.email || "N/A"}</td>
                <td className="p-2 border">{i.user?.name || "N/A"}</td>

                <td className="p-2 border">
                  {new Date(i.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminInterests;
