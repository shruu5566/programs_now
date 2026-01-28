import { useState } from "react";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    let errors = [];

    // NAME VALIDATION
    const namePattern = /^[A-Za-z\s]+$/;
    if (!namePattern.test(name)) {
      errors.push("Name should contain only alphabets");
    }

    // EMAIL VALIDATION
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      errors.push("Wrong email format");
    }

    // PASSWORD VALIDATION
    if (password.length < 6 || password.length > 18) {
      errors.push("Password should be 6-18 characters");
    }

    // SHOW ALL ERRORS AT ONCE
    if (errors.length > 0) {
      alert(errors.join("\n"));
      return;
    }

    // SEND TO BACKEND
    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, email, password })
      });

      const data = await res.json();
      alert(data.msg);

    } catch (error) {
      alert("Server error");
    }
  };

  return (
    <div>
      <h2>Register</h2>

      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <br /><br />

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <br /><br />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <br /><br />

      <button onClick={handleRegister}>Register</button>
    </div>
  );
}

export default Register;
