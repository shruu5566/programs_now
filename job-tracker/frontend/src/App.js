import { Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import JobPortal from "./pages/JobPortal";   // adjust name if different

function App() {
  return (
    <Routes>
      <Route path="/" element={<JobPortal />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default App;
