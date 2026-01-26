import { useState } from "react";

function App() {
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");

  const addJob = async () => {
    await fetch("http://localhost:5000/api/jobs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ company, role })
    });

    alert("Job Added!");
    setCompany("");
    setRole("");
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
    </div>
  );
}

export default App;
