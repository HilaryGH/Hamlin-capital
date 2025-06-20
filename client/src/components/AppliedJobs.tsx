import React, { useEffect, useState } from "react";

type Application = {
  _id: string;
  fullName: string;
  email: string;
  coverLetter?: string;
  jobTitle: string;
  resume?: string;
  createdAt: string;
};

const AppliedJobs: React.FC = () => {
  const [applications, setApplications] = useState<Application[]>([]);

  useEffect(() => {
    fetch("https://hamlin-backend.onrender.com/api/applications")
      .then((res) => res.json())
      .then(setApplications)
      .catch((err) => console.error("Failed to fetch applications", err));
  }, []);

  return (
    <div className="p-6 text-dark max-w-6xl mx-auto">
      {applications.length === 0 ? (
        <p>No applications submitted yet.</p>
      ) : (
        <table className="w-full border-collapse table-auto">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 text-left">Applicant Name</th>
              <th className="p-2 text-left">Email</th>
              <th className="p-2 text-left">Job Title</th>
              <th className="p-2 text-left">Cover Letter</th>
              <th className="p-2 text-left">Resume</th>
              <th className="p-2 text-left">Applied On</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app) => (
              <tr key={app._id} className="border-b hover:bg-gray-50">
                <td className="p-2">{app.fullName}</td>
                <td className="p-2">{app.email}</td>
                <td className="p-2">{app.jobTitle}</td>
                <td className="p-2">{app.coverLetter || "—"}</td>
                <td className="p-2">
                  {app.resume ? (
                    <a
                      href={`https://hamlin-backend.onrender.com/${app.resume}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline"
                    >
                      View Resume
                    </a>
                  ) : (
                    "—"
                  )}
                </td>
                <td className="p-2">
                  {new Date(app.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AppliedJobs;
