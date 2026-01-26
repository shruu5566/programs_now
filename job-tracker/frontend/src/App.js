import { useState, useEffect } from "react";

function App() {
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("Applied");
  const [jobs, setJobs] = useState([]);

  const fetchJobs = async () => {
    const res = await fetch("http://localhost:5000/api/jobs");
    const data = await res.json();
    setJobs(data);
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const addJob = async () => {
    await fetch("http://localhost:5000/api/jobs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ company, role, status })
    });

    setCompany("");
    setRole("");
    setStatus("Applied");
    fetchJobs();
  };

  const deleteJob = async (id) => {
    await fetch(`http://localhost:5000/api/jobs/${id}`, {
      method: "DELETE"
    });
    fetchJobs();
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Job Application Tracker</h1>

      <div style={styles.form}>
        <input
          style={styles.input}
          placeholder="Company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />

        <input
          style={styles.input}
          placeholder="Role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        />

        <select
          style={styles.input}
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option>Applied</option>
          <option>Interview</option>
          <option>Rejected</option>
        </select>

        <button style={styles.addBtn} onClick={addJob}>
          Add Job
        </button>
      </div>

      <div>
        {jobs.map((job) => (
          <div key={job._id} style={styles.card}>
            <div>
              <strong>{job.company}</strong>
              <p>{job.role}</p>
              <span style={styles.status}>{job.status}</span>
            </div>

            <button
              style={styles.deleteBtn}
              onClick={() => deleteJob(job._id)}
            >
              ❌
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "450px",
    margin: "auto",
    padding: "20px",
    fontFamily: "Arial"
  },

  title: {
    textAlign: "center"
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    marginBottom: "20px"
  },

  input: {
    padding: "10px",
    fontSize: "14px"
  },

  addBtn: {
    padding: "10px",
    background: "black",
    color: "white",
    border: "none",
    cursor: "pointer"
  },

  card: {
    background: "#f4f4f4",
    padding: "12px",
    borderRadius: "6px",
    marginBottom: "10px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },

  status: {
    fontSize: "12px",
    color: "gray"
  },

  deleteBtn: {
    border: "none",
    background: "transparent",
    fontSize: "16px",
    cursor: "pointer"
  }
};

export default App;
