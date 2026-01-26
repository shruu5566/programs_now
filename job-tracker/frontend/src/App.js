import { useState, useEffect } from "react";

function App() {
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [jobs, setJobs] = useState([]);

  // Fetch all jobs
  const fetchJobs = async () => {
    const res = await fetch("http://localhost:5000/api/jobs");
    const data = await res.json();
    setJobs(data);
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  // Add new job
  const addJob = async () => {
    await fetch("http://localhost:5000/api/jobs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ company, role })
    });

    setCompany("");
    setRole("");
    fetchJobs();
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto", padding: "20px" }}>

      <h1>Job Application Tracker</h1>

      <input
        style={{ width: "100%", padding: "8px" }}
        placeholder="Company Name"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
      />

      <br /><br />

      <input
        style={{ width: "100%", padding: "8px" }}
        placeholder="Job Role"
        value={role}
        onChange={(e) => setRole(e.target.value)}
      />

      <br /><br />

      <button
        style={{
          width: "100%",
          padding: "10px",
          background: "black",
          color: "white",
          border: "none",
          cursor: "pointer"
        }}
        onClick={addJob}
      >
        Add Job
      </button>

      <h2>My Jobs</h2>

      {jobs.map((job, index) => (
        <div
          key={index}
          style={{
            background: "#f2f2f2",
            padding: "10px",
            marginTop: "10px",
            borderRadius: "5px"
          }}
        >
          {job.company} - {job.role}
        </div>
      ))}

    </div>
  );
}

export default App;
