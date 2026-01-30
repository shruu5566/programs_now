import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import JobForm from "../components/JobForm";
import JobList from "../components/JobList";
import "../styles/Dashboard.css";

function JobPortal() {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [sortBy, setSortBy] = useState("latest");
  const [loading, setLoading] = useState(true);
  const [editingJob, setEditingJob] = useState(null);
  const navigate = useNavigate();

  // Check if user is authenticated
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    fetchJobs();
  }, [navigate]);

  // Fetch jobs from backend
  const fetchJobs = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:5000/api/jobs", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (!res.ok) {
        if (res.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          navigate("/login");
        }
        return;
      }

      const data = await res.json();
      setJobs(data);
      applyFiltersAndSort(data, search, statusFilter, sortBy);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching jobs:", error);
      setLoading(false);
    }
  };

  // Apply filters and sort
  const applyFiltersAndSort = (jobList, searchTerm, statusVal, sortVal) => {
    let filtered = jobList;

    // Search by company name
    if (searchTerm) {
      filtered = filtered.filter((job) =>
        job.company.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by status
    if (statusVal) {
      filtered = filtered.filter((job) => job.status === statusVal);
    }

    // Sort
    if (sortVal === "oldest") {
      filtered.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    } else {
      filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    setFilteredJobs(filtered);
  };

  // Handle search
  const handleSearch = (value) => {
    setSearch(value);
    applyFiltersAndSort(jobs, value, statusFilter, sortBy);
  };

  // Handle status filter
  const handleStatusFilter = (value) => {
    setStatusFilter(value);
    applyFiltersAndSort(jobs, search, value, sortBy);
  };

  // Handle sort
  const handleSort = (value) => {
    setSortBy(value);
    applyFiltersAndSort(jobs, search, statusFilter, value);
  };

  // Handle add/update job
  const handleJobSubmit = async (jobData) => {
    try {
      const token = localStorage.getItem("token");
      const url = editingJob
        ? `http://localhost:5000/api/jobs/${editingJob._id}`
        : "http://localhost:5000/api/jobs";

      const method = editingJob ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(jobData)
      });

      if (res.ok) {
        setEditingJob(null);
        fetchJobs();
      }
    } catch (error) {
      console.error("Error saving job:", error);
    }
  };

  // Handle delete job
  const handleDeleteJob = async (jobId) => {
    if (!window.confirm("Are you sure you want to delete this job?")) {
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:5000/api/jobs/${jobId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (res.ok) {
        fetchJobs();
      }
    } catch (error) {
      console.error("Error deleting job:", error);
    }
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="header-content">
          <h1>Job Tracker</h1>
          <div className="user-section">
            <span className="user-name">Welcome, {user.name}</span>
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="dashboard-main">
        <div className="dashboard-content">
          {/* Left Side - Form */}
          <div className="form-section">
            <JobForm
              onSubmit={handleJobSubmit}
              initialData={editingJob}
              onCancel={() => setEditingJob(null)}
            />
          </div>

          {/* Right Side - Jobs List with Filters */}
          <div className="jobs-section">
            <div className="controls">
              <div className="search-bar">
                <input
                  type="text"
                  placeholder="Search by company name..."
                  value={search}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="search-input"
                />
              </div>

              <div className="filters">
                <select
                  value={statusFilter}
                  onChange={(e) => handleStatusFilter(e.target.value)}
                  className="filter-select"
                >
                  <option value="">All Status</option>
                  <option value="Applied">Applied</option>
                  <option value="Shortlisted">Shortlisted</option>
                  <option value="Interview">Interview</option>
                  <option value="Rejected">Rejected</option>
                </select>

                <select
                  value={sortBy}
                  onChange={(e) => handleSort(e.target.value)}
                  className="filter-select"
                >
                  <option value="latest">Latest First</option>
                  <option value="oldest">Oldest First</option>
                </select>
              </div>

              <div className="jobs-count">
                {filteredJobs.length} {filteredJobs.length === 1 ? "job" : "jobs"}
              </div>
            </div>

            <JobList
              jobs={filteredJobs}
              onEdit={setEditingJob}
              onDelete={handleDeleteJob}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default JobPortal;
