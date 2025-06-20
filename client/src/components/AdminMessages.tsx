import { useState } from "react";
import axios from "axios";

interface ContactMessage {
  _id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
  updatedAt?: string;
}

function AdminMessages() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [showMessages, setShowMessages] = useState(false);
  const [loading, setLoading] = useState(false);

  const toggleMessages = async () => {
    if (!showMessages) {
      // Fetch only when showing messages
      setLoading(true);
      try {
        const res = await axios.get<ContactMessage[]>(
          "https://hamlin-backend.onrender.com/api/contact"
        );
        setMessages(res.data);
      } catch (err) {
        console.error("Failed to fetch messages", err);
      }
      setLoading(false);
    }
    setShowMessages(!showMessages); // toggle visibility
  };

  return (
    <div className="p-6 text-gray-700 max-w-4xl mx-auto">
      <button
        onClick={toggleMessages}
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        {showMessages ? "Hide Messages" : "Show Messages"}
      </button>

      {loading && <p>Loading messages...</p>}

      {showMessages && !loading && (
        <>
          {messages.length === 0 ? (
            <p>No messages yet.</p>
          ) : (
            <div className="space-y-4">
              {messages.map((msg) => (
                <div key={msg._id} className="p-4 border rounded shadow-sm">
                  <p>
                    <strong>Name:</strong> {msg.name}
                  </p>
                  <p>
                    <strong>Email:</strong> {msg.email}
                  </p>
                  <p>
                    <strong>Message:</strong> {msg.message}
                  </p>
                  <p className="text-sm text-gray-500">
                    {new Date(msg.createdAt).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default AdminMessages;
