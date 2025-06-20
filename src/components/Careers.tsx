import { useState, useEffect } from "react";
import type { ChangeEvent, FormEvent } from "react";
import axios from "axios";

type Job = {
  _id: string;
  title: string;
  description?: string;
  location?: string;
  type?: string;
};

const Careers = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [selectedJob, setSelectedJob] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    coverLetter: "",
  });
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fileInputKey, setFileInputKey] = useState(Date.now()); // for resetting file input

  // Fetch jobs from backend
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/jobs")
      .then((response) => setJobs(response.data))
      .catch((err) => {
        console.error("Failed to fetch jobs:", err);
        setJobs([]);
      });
  }, []);

  // Handle form text input changes
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle resume file selection with validation
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      // Max 5MB
      const maxFileSize = 5 * 1024 * 1024;
      const allowedTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];

      if (file.size > maxFileSize) {
        alert("File size should be less than 5MB.");
        setResumeFile(null);
        setFileInputKey(Date.now()); // reset file input
        return;
      }

      if (!allowedTypes.includes(file.type)) {
        alert("Only PDF or Word documents are allowed.");
        setResumeFile(null);
        setFileInputKey(Date.now()); // reset file input
        return;
      }

      setResumeFile(file);
    }
  };

  // Submit application with resume
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!selectedJob) {
      alert("Please select a job before submitting the application.");
      return;
    }

    if (!resumeFile) {
      alert("Please upload your resume.");
      return;
    }

    setIsSubmitting(true);

    const payload = new FormData();
    payload.append("fullName", formData.fullName);
    payload.append("email", formData.email);
    payload.append("coverLetter", formData.coverLetter);
    payload.append("jobTitle", selectedJob);
    payload.append("resume", resumeFile);

    try {
      await axios.post("http://localhost:5000/api/applications", payload, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert(`Application submitted successfully for ${selectedJob}`);
      setSelectedJob(null);
      setFormData({ fullName: "", email: "", coverLetter: "" });
      setResumeFile(null);
      setFileInputKey(Date.now()); // reset file input after successful submit
    } catch (error: any) {
      console.error("Application submission failed:", error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        alert(`Submission failed: ${error.response.data.message}`);
      } else {
        alert("Something went wrong while submitting your application.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-xl md:text-3xl  text-blue-900 text-center mb-4">
        We're looking for great people to join our growing team
      </h1>

      <h2 className="text-xl text-blue-900 font-semibold mt-8 mb-4">
        Our Openings
      </h2>

      {jobs.length === 0 ? (
        <p>No job openings available at the moment.</p>
      ) : (
        <ul className="space-y-4">
          {jobs.map((job) => (
            <li
              key={job._id}
              className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition"
            >
              <h3 className="text-lg font-medium">{job.title}</h3>
              <p className="text-sm text-gray-600 mb-2">{job.description}</p>
              <button
                onClick={() => setSelectedJob(job.title)}
                className="mt-2 inline-block bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
                disabled={isSubmitting}
              >
                Apply Now
              </button>

              {selectedJob === job.title && (
                <form onSubmit={handleSubmit} className="mt-4 space-y-3">
                  <input
                    type="text"
                    name="fullName"
                    placeholder="Full Name"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    className="w-full border rounded px-3 py-2"
                    disabled={isSubmitting}
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full border rounded px-3 py-2"
                    disabled={isSubmitting}
                  />
                  <textarea
                    name="coverLetter"
                    placeholder="Cover Letter"
                    value={formData.coverLetter}
                    onChange={handleChange}
                    rows={4}
                    className="w-full border rounded px-3 py-2"
                    disabled={isSubmitting}
                  />
                  <input
                    key={fileInputKey} // use key to reset input when needed
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    required
                    className="w-full border rounded px-3 py-2"
                    disabled={isSubmitting}
                  />
                  <button
                    type="submit"
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Submitting..." : "Submit Application"}
                  </button>
                </form>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Careers;
