import { useEffect, useState } from "react";
import axios from "axios";

type Job = {
  _id: string;
  title: string;
  description?: string;
  location?: string;
  type?: string;
};

const JobList = () => {
  const [jobs, setJobs] = useState<Job[]>([]);

  const fetchJobs = async () => {
    const res = await axios.get("http://localhost:5000/api/jobs");
    setJobs(res.data);
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-xl font-semibold mb-4">Open Positions</h2>
      <ul className="space-y-4">
        {jobs.map((job) => (
          <li
            key={job._id}
            className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition"
          >
            <h3 className="text-lg font-medium">{job.title}</h3>
            <p className="text-sm text-gray-600">{job.location}</p>
            <p className="text-sm italic text-gray-500">{job.type}</p>
            <button className="mt-2 inline-block bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700">
              Apply Now
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default JobList;
