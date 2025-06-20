import { useEffect, useState } from "react";
import axios from "axios";

type Job = {
  _id: string;
  title: string;
  description?: string;
  location?: string;
  type?: string;
  createdAt: string;
};

const CareerOpenings = () => {
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    axios
      .get<Job[]>("https://hamlin-backend.onrender.com/api/jobs") // ✅ Corrected route
      .then((res) => setJobs(res.data))
      .catch((err) => console.error("Failed to fetch jobs", err));
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6 text-center">Career Openings</h1>
      {jobs.length === 0 && <p>No current openings.</p>}
      <ul className="space-y-6">
        {jobs.map((job) => (
          <li key={job._id} className="border p-4 rounded shadow">
            <h2 className="text-xl font-semibold">{job.title}</h2>
            {job.location && <p className="italic">Location: {job.location}</p>}
            {job.type && (
              <p className="text-sm text-gray-500">Type: {job.type}</p>
            )}
            {job.description && <p className="mt-2">{job.description}</p>}
            <p className="mt-2 text-sm text-gray-600">
              Posted on: {new Date(job.createdAt).toLocaleDateString()}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CareerOpenings;
