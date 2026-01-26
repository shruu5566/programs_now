import { useState } from "react";

function App() {
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");

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
      <button>Add Job</button>
    </div>
  );
}

export default App;
