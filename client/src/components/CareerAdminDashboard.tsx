import React, { useEffect, useState } from "react";
// Comment this line if AppliedJobs is not defined yet

type Job = {
  _id: string;
  title: string;
  description?: string;
  location?: string;
  type?: string;
  createdAt: string;
};

const CareerAdminDashboard: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [jobForm, setJobForm] = useState({
    title: "",
    description: "",
    location: "",
    type: "Full-time",
  });

  // Fetch jobs on load
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch("https://hamlin-backend.onrender.com/api/jobs");
        const data = await res.json();
        setJobs(data || []);
      } catch (err) {
        console.error("Failed to fetch jobs", err);
      }
    };

    fetchJobs();
  }, []);

  const handleJobSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("https://hamlin-backend.onrender.com/api/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(jobForm),
      });

      const newJob = await res.json();

      setJobs((prev) => [newJob, ...prev]);
      setJobForm({
        title: "",
        description: "",
        location: "",
        type: "Full-time",
      });
    } catch (error) {
      alert("Failed to post job");
    }
  };

  const deleteJob = async (id: string) => {
    try {
      await fetch(`https://hamlin-backend.onrender.com/api/jobs/${id}`, {
        method: "DELETE",
      });
      setJobs((prev) => prev.filter((j) => j._id !== id));
    } catch (error) {
      alert("Failed to delete job");
    }
  };

  return (
    <div className="p-6 text-dark max-w-7xl mx-auto">
      <form
        onSubmit={handleJobSubmit}
        className="space-y-4 text-gray-500 max-w-xl mb-10"
      >
        <input
          type="text"
          placeholder="Job Title"
          className="w-full border px-4 py-2 rounded"
          value={jobForm.title}
          onChange={(e) => setJobForm({ ...jobForm, title: e.target.value })}
          required
        />
        <textarea
          placeholder="Job Description"
          className="w-full border px-4 py-2 rounded"
          value={jobForm.description}
          onChange={(e) =>
            setJobForm({ ...jobForm, description: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Location"
          className="w-full border px-4 py-2 rounded"
          value={jobForm.location}
          onChange={(e) => setJobForm({ ...jobForm, location: e.target.value })}
        />
        <select
          className="w-full border px-4 py-2 rounded"
          value={jobForm.type}
          onChange={(e) => setJobForm({ ...jobForm, type: e.target.value })}
        >
          <option value="Full-time">Full-time</option>
          <option value="Part-time">Part-time</option>
          <option value="Contract">Contract</option>
        </select>
        <button
          type="submit"
          className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
        >
          Post Job
        </button>
      </form>

      {jobs.length > 0 ? (
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-2">Title</th>
              <th className="p-2">Type</th>
              <th className="p-2">Location</th>
              <th className="p-2">Posted</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job) => (
              <tr key={job._id} className="border-b hover:bg-gray-50">
                <td className="p-2">{job.title}</td>
                <td className="p-2">{job.type}</td>
                <td className="p-2">{job.location || "—"}</td>
                <td className="p-2">
                  {new Date(job.createdAt).toLocaleDateString()}
                </td>
                <td className="p-2">
                  <button
                    onClick={() => deleteJob(job._id)}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-600">No jobs posted yet.</p>
      )}

      {/* Optional Component */}
      {/* <AppliedJobs /> */}
    </div>
  );
};

export default CareerAdminDashboard;
