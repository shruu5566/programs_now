import { useState, useEffect } from "react";
import "../styles/JobForm.css";

function JobForm({ onSubmit, initialData, onCancel }) {
  const [formData, setFormData] = useState({
    company: "",
    role: "",
    status: "Applied",
    source: "",
    notes: ""
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({
        company: "",
        role: "",
        status: "Applied",
        source: "",
        notes: ""
      });
    }
  }, [initialData]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.company.trim()) {
      newErrors.company = "Company name is required";
    }

    if (!formData.role.trim()) {
      newErrors.role = "Role is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    onSubmit(formData);

    // Reset form
    setFormData({
      company: "",
      role: "",
      status: "Applied",
      source: "",
      notes: ""
    });
    setErrors({});
  };

  const handleCancel = () => {
    setFormData({
      company: "",
      role: "",
      status: "Applied",
      source: "",
      notes: ""
    });
    setErrors({});
    onCancel();
  };

  return (
    <div className="job-form-container">
      <h2>{initialData ? "Edit Job" : "Add New Job"}</h2>

      <form onSubmit={handleSubmit} className="job-form">
        <div className="form-group">
          <label htmlFor="company">Company Name *</label>
          <input
            id="company"
            type="text"
            name="company"
            placeholder="e.g., Google, Microsoft"
            value={formData.company}
            onChange={handleChange}
            className={errors.company ? "input-error" : ""}
          />
          {errors.company && (
            <span className="error-text">{errors.company}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="role">Role *</label>
          <input
            id="role"
            type="text"
            name="role"
            placeholder="e.g., Software Engineer, Product Manager"
            value={formData.role}
            onChange={handleChange}
            className={errors.role ? "input-error" : ""}
          />
          {errors.role && <span className="error-text">{errors.role}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="status">Status</label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="Applied">Applied</option>
            <option value="Shortlisted">Shortlisted</option>
            <option value="Interview">Interview</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="source">Source / Link</label>
          <input
            id="source"
            type="text"
            name="source"
            placeholder="e.g., LinkedIn, WhatsApp group, Website URL"
            value={formData.source}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="notes">JD / Notes</label>
          <textarea
            id="notes"
            name="notes"
            placeholder="Add any notes about the job, JD details, or interview notes..."
            value={formData.notes}
            onChange={handleChange}
            rows="4"
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="btn-primary">
            {initialData ? "Update Job" : "Add Job"}
          </button>
          {initialData && (
            <button
              type="button"
              className="btn-secondary"
              onClick={handleCancel}
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default JobForm;
