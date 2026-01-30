import JobCard from "./JobCard";
import "../styles/JobList.css";

function JobList({ jobs, onEdit, onDelete }) {
  if (jobs.length === 0) {
    return (
      <div className="empty-state">
        <p>No jobs found. Add your first job application!</p>
      </div>
    );
  }

  return (
    <div className="job-list">
      {jobs.map((job) => (
        <JobCard
          key={job._id}
          job={job}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

export default JobList;
