import { useState, useEffect } from "react";

function App() {
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [jobs, setJobs] = useState([]);

  // Load jobs from backend
  const fetchJobs = async () => {
    const response = await fetch("http://localhost:5000/api/jobs");
    const data = await response.json();
    setJobs(data);
  };

  // Runs once when page loads
  useEffect(() => {
    fetchJobs();
  }, []);

  // Runs when Add Job button clicked
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
    <div>
      <h1>Job Application Tracker</h1>

      <input
        placeholder="Company Name"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
      />

      <br /><br />

      <input
        placeholder="Job Role"
        value={role}
        onChange={(e) => setRole(e.target.value)}
      />

      <br /><br />

      <button onClick={addJob}>Add Job</button>

      <h2>My Jobs</h2>

      {jobs.map((job, index) => (
        <p key={index}>
          {job.company} - {job.role}
        </p>
      ))}
    </div>
  );
}

export default App;
