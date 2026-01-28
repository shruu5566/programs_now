import { useEffect, useState } from "react";

function JobPortal() {
  const [jobs, setJobs] = useState([]);
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("");

  // Fetch all jobs
  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    const res = await fetch("http://localhost:5000/api/jobs");
    const data = await res.json();
    setJobs(data);
  };

  // Add job
  const addJob = async () => {
    if (!company || !role || !status) {
      alert("All fields required");
      return;
    }

    await fetch("http://localhost:5000/api/jobs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ company, role, status })
    });

    setCompany("");
    setRole("");
    setStatus("");
    fetchJobs();
  };

  // Delete job
  const deleteJob = async (id) => {
    await fetch(`http://localhost:5000/api/jobs/${id}`, {
      method: "DELETE"
    });

    fetchJobs();
  };

  return (
    <div>
      <h1>Job Portal</h1>

      <input
        placeholder="Company"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
      />

      <input
        placeholder="Role"
        value={role}
        onChange={(e) => setRole(e.target.value)}
      />

      <input
        placeholder="Status"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      />

      <button onClick={addJob}>Add Job</button>

      <hr />

      {jobs.map((job) => (
        <div key={job._id}>
          <p>
            {job.company} - {job.role} - {job.status}
          </p>
          <button onClick={() => deleteJob(job._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default JobPortal;
