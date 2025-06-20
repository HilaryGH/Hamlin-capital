import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

type FileItem = {
  filename: string;
  url: string;
};

function UserDash() {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [name, setName] = useState("");
  const [showFiles, setShowFiles] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      setName(payload.name || "User");
    } catch (error) {
      console.error("Invalid token:", error);
      localStorage.removeItem("token");
      navigate("/login");
      return;
    }

    fetchFiles(token);
  }, [navigate]);

  const fetchFiles = (token: string) => {
    axios
      .get("https://hamlin-backend.onrender.com/api/startup/files", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setFiles(res.data.files);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  const handleUpdate = async (filename: string) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const fileInput = document.createElement("input");
    fileInput.type = "file";

    fileInput.onchange = async () => {
      const file = fileInput.files?.[0];
      if (!file) return;

      const formData = new FormData();
      formData.append("file", file);

      try {
        await axios.put(
          `https://hamlin-backend.onrender.com/api/startup/files/${encodeURIComponent(
            filename
          )}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );

        alert("File updated!");
        fetchFiles(token); // Refresh file list
      } catch (err) {
        console.error("File update failed:", err);
      }
    };

    fileInput.click();
  };

  const initials = name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();

  return (
    <div className="bg-soft-gold rounded-xl shadow-md p-6 w-full mx-auto md:mx-0 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-lg shadow">
            {initials}
          </div>
          <p className="text-gray-800 font-medium">
            Welcome, <span className="font-semibold">{name}</span>
          </p>
        </div>
        <button
          onClick={handleLogout}
          className="text-sm px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>

      {/* Uploaded Files */}
      <div>
        <div className="flex gap-10 max-w-xl items-center mt-2">
          <h3 className="text-md font-semibold text-gray-700">
            Uploaded Files
          </h3>
          <button
            onClick={() => setShowFiles((prev) => !prev)}
            className="text-xs px-2 py-1 rounded bg-blue-500 text-white hover:bg-blue-600 transition"
          >
            {showFiles ? "Hide" : "Show"}
          </button>
        </div>

        {showFiles && (
          <div className="mt-4 max-h-64 max-w-[400px] overflow-y-auto pr-1 custom-scrollbar">
            {files.length === 0 ? (
              <p className="text-sm max-w-xl text-gray-500">
                No files uploaded yet.
              </p>
            ) : (
              <ul className="space-y-2">
                {files.map((file) => (
                  <li
                    key={file.filename}
                    className="flex items-center max-w-xl justify-between bg-gray-100 hover:bg-gray-200 p-2 rounded-lg transition"
                  >
                    <a
                      href={`https://hamlin-backend.onrender.com/uploads/${file.filename}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm text-blue-600 underline truncate w-48"
                    >
                      {file.filename}
                    </a>
                    <div>
                      <button
                        onClick={() => handleUpdate(file.filename)}
                        className="text-xs bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600 transition"
                      >
                        Update
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default UserDash;
