import { useEffect, useState } from "react";
import type { FormEvent, ChangeEvent } from "react";
import axios from "axios";

type Post = {
  _id: string;
  name: string;
  message: string;
  location?: string;
  createdAt: string;
};

const CommunityBoard = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    message: "",
    location: "",
  });
  const [editingPostId, setEditingPostId] = useState<string | null>(null);

  const fetchPosts = async () => {
    try {
      const res = await axios.get(
        "https://hamlin-backend.onrender.com/api/community-posts"
      );
      setPosts(res.data);
    } catch (err) {
      console.error("Failed to fetch posts", err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      if (editingPostId) {
        await axios.put(
          `https://hamlin-backend.onrender.com/api/community-posts/${editingPostId}`,
          formData
        );
        setEditingPostId(null);
      } else {
        await axios.post(
          "https://hamlin-backend.onrender.com/api/community-posts",
          formData
        );
      }

      setFormData({ name: "", message: "", location: "" });
      fetchPosts();
    } catch (err) {
      alert("Failed to submit post.");
    }
  };

  const handleEdit = (post: Post) => {
    setFormData({
      name: post.name,
      message: post.message,
      location: post.location || "",
    });
    setEditingPostId(post._id);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this post?")) return;

    try {
      await axios.delete(
        `https://hamlin-backend.onrender.com/api/community-posts/${id}`
      );
      fetchPosts();
    } catch (err) {
      alert("Failed to delete post.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-12 px-4 sm:px-6">
      <h2 className="text-center text-base sm:text-2xl font-bold text-blue-900 mb-6">
        🗣️ Community Posting Board
      </h2>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white border border-gray-200 rounded-lg shadow p-6 space-y-4 mb-8"
      >
        <div className="space-y-2">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            name="message"
            placeholder="What would you like to share?"
            value={formData.message}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm min-h-[80px] focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="location"
            placeholder="Location (optional)"
            value={formData.location}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center gap-3">
          <button
            type="submit"
            className="bg-blue-600 text-white text-sm px-5 py-2 rounded-md hover:bg-blue-700 transition"
          >
            {editingPostId ? "Update Post" : "Post"}
          </button>
          {editingPostId && (
            <button
              type="button"
              className="bg-gray-200 text-gray-800 text-sm px-4 py-2 rounded-md hover:bg-gray-300"
              onClick={() => {
                setFormData({ name: "", message: "", location: "" });
                setEditingPostId(null);
              }}
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* Posts */}
      <div className="space-y-6">
        {posts.map((post) => (
          <div
            key={post._id}
            className="bg-gray-50 border border-gray-200 p-5 rounded-lg shadow-sm hover:shadow-md transition"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm sm:text-base font-semibold text-gray-800">
                  {post.name}
                  {post.location && (
                    <span className="text-gray-500"> from {post.location}</span>
                  )}
                </p>
                <p className="text-xs text-gray-500">
                  {new Date(post.createdAt).toLocaleDateString()}
                </p>
              </div>

              <div className="flex gap-3 text-sm">
                <button
                  onClick={() => handleEdit(post)}
                  className="text-blue-600 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(post._id)}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>
              </div>
            </div>

            <p className="mt-3 text-sm text-gray-700 whitespace-pre-line">
              {post.message}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommunityBoard;
