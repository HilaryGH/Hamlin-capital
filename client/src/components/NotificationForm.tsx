import { useEffect, useState } from "react";
import axios from "axios";
import { BellRing } from "lucide-react";

const NotificationForm = () => {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [dealType, setDealType] = useState("Equity");

  const rawUser = localStorage.getItem("user");
  const user = rawUser ? JSON.parse(rawUser) : null;

  const userId = user?.id || user?._id;

  useEffect(() => {
    const checkSubscription = async () => {
      if (!user?.email) {
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get(
          `https://hamlin-backend.onrender.com/api/notifications/email/${user.email}`
        );
        setIsSubscribed(res.data?.subscribed || false);
      } catch (err) {
        console.error("Failed to check subscription:", err);
      } finally {
        setLoading(false);
      }
    };

    checkSubscription();
  }, [user?.email]);

  const handleSubscribe = async () => {
    if (!user || !userId || !user.name || !user.email) {
      alert("Missing user info. Please log in again.");
      return;
    }

    setSubmitting(true);
    try {
      await axios.post(
        "https://hamlin-backend.onrender.com/api/notifications",
        {
          name: user.name,
          email: user.email,
          dealType,
          userId,
        }
      );
      setIsSubscribed(true);
    } catch (error) {
      console.error("Subscription failed", error);
      alert("Subscription failed");
    } finally {
      setSubmitting(false);
    }
  };

  const handleUnsubscribe = async () => {
    if (!userId) return;

    setSubmitting(true);
    try {
      await axios.delete(
        "https://hamlin-backend.onrender.com/api/notifications/unsubscribe",
        {
          data: { userId, dealType },
        }
      );
      setIsSubscribed(false);
    } catch (error) {
      console.error("Unsubscribe failed", error);
      alert("Unsubscribe failed");
    } finally {
      setSubmitting(false);
    }
  };

  const toggleSubscription = () => {
    if (isSubscribed) {
      handleUnsubscribe();
    } else {
      handleSubscribe();
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-2xl mt-8">
      <div className="flex items-center space-x-4">
        <button
          onClick={toggleSubscription}
          disabled={submitting}
          className={`p-2 rounded-full transition ${
            isSubscribed ? "text-green-500" : "text-blue-600 hover:bg-blue-100"
          }`}
          title={isSubscribed ? "Click to unsubscribe" : "Click to subscribe"}
        >
          <BellRing size={36} />
        </button>
        <div>
          <h2 className="text-lg font-semibold text-gray-800">
            {loading
              ? "Checking subscription..."
              : isSubscribed
              ? "You're subscribed ✅"
              : "Not subscribed yet."}
          </h2>
          {!loading && (
            <p className="text-sm text-gray-500">
              {isSubscribed
                ? "Click the bell to unsubscribe."
                : "Click the bell to subscribe."}
            </p>
          )}
        </div>
      </div>

      {!isSubscribed && !loading && (
        <div className="mt-4">
          <label
            htmlFor="dealType"
            className="block text-sm font-medium text-gray-700"
          >
            Select Deal Type:
          </label>
          <select
            id="dealType"
            value={dealType}
            onChange={(e) => setDealType(e.target.value)}
            className="mt-1 block w-full rounded-md border border-gray-300 p-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none"
          >
            <option value="Equity">Equity Deal</option>
            <option value="Debt">Debt Deal</option>
            <option value="Sponsor">Sponsor Deal</option>
            <option value="Merger">M & A Deal Notification</option>
          </select>
        </div>
      )}
    </div>
  );
};

export default NotificationForm;
