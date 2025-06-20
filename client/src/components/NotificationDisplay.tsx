// src/components/NotificationDisplay.tsx
import { useEffect, useState } from "react";
import axios from "axios";

interface Notification {
  _id: string;
  message: string;
  createdAt: string;
}

const NotificationDisplay = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Get user from localStorage
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const userId = user?.id || user?._id; // use whichever exists

  useEffect(() => {
    const fetchNotifications = async () => {
      if (!userId) {
        setError("⚠️ Missing user ID. Please log in again.");
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get(
          `https://hamlin-backend.onrender.com/api/notifications/user/${userId}`
        );

        console.log("Fetched notifications:", res.data); // ← Add this to debug
        if (Array.isArray(res.data)) {
          setNotifications(res.data);
        } else {
          setError("⚠️ Unexpected response format.");
        }
      } catch (err) {
        console.error("❌ Failed to fetch notifications:", err);
        setError("❌ Failed to fetch notifications. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, [userId]);

  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow mt-6">
      <h3 className="text-lg font-bold mb-2">Your Notifications</h3>

      {loading && <p>Loading...</p>}

      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && notifications.length === 0 && (
        <p>No new notifications.</p>
      )}

      {!loading && !error && notifications.length > 0 && (
        <ul className="space-y-2">
          {notifications.map((note) => (
            <li
              key={note._id}
              className="bg-white p-3 rounded shadow text-sm text-gray-800"
            >
              <strong>{new Date(note.createdAt).toLocaleString()}</strong>:{" "}
              {note.message}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NotificationDisplay;
