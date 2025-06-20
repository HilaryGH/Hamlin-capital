import { useEffect, useState } from "react";
import axios from "axios";

// Define Notification type
interface Notification {
  _id: string;
  userId: string;
  title: string;
  message: string;
  dealType: string;
  read: boolean;
  createdAt: string;
  updatedAt: string;
}

const UserNotifications = () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const userId = user.id || user._id;

  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    if (userId) {
      axios
        .get(`http://localhost:5000/api/usernotifications/${userId}`)
        .then((res) => setNotifications(res.data))
        .catch((err) => console.error("Failed to fetch notifications", err));
    }
  }, [userId]);

  return (
    <div className="bg-white rounded-xl shadow p-4 mt-4">
      <h2 className="text-lg font-semibold mb-3">🔔 Notifications</h2>
      <ul className="space-y-2">
        {notifications.length === 0 ? (
          <p className="text-sm text-gray-500">No notifications yet.</p>
        ) : (
          notifications.map((n) => (
            <li key={n._id} className="border p-2 rounded hover:bg-gray-50">
              <strong>{n.title}</strong>
              <p className="text-sm text-gray-600">{n.message}</p>
              <p className="text-xs text-right text-gray-400">
                {new Date(n.createdAt).toLocaleString()}
              </p>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default UserNotifications;
