import "../styles/JobCard.css";

function JobCard({ job, onEdit, onDelete }) {
  const getStatusBadgeClass = (status) => {
    return `status-badge status-${status.toLowerCase()}`;
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="job-card">
      <div className="card-header">
        <div className="company-role">
          <h3 className="company-name">{job.company}</h3>
          <p className="role">{job.role}</p>
        </div>
        <span className={getStatusBadgeClass(job.status)}>{job.status}</span>
      </div>

      <div className="card-body">
        {job.source && (
          <div className="job-field">
            <strong>Source:</strong>
            <p>{job.source}</p>
          </div>
        )}

        {job.notes && (
          <div className="job-field">
            <strong>Notes:</strong>
            <p className="notes-text">{job.notes}</p>
          </div>
        )}
      </div>

      <div className="card-footer">
        <span className="date">{formatDate(job.createdAt)}</span>
        <div className="card-actions">
          <button
            className="btn-edit"
            onClick={() => onEdit(job)}
            title="Edit job"
          >
            Edit
          </button>
          <button
            className="btn-delete"
            onClick={() => onDelete(job._id)}
            title="Delete job"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default JobCard;
