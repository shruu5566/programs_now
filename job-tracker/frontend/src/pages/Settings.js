import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Settings.css";

function Settings() {
  const [user, setUser] = useState(null);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [jobAlerts, setJobAlerts] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Load user data on mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }

    // Load user preferences from localStorage
    const preferences = localStorage.getItem("userPreferences");
    if (preferences) {
      const prefs = JSON.parse(preferences);
      setEmailNotifications(prefs.emailNotifications !== false);
      setJobAlerts(prefs.jobAlerts !== false);
    }
  }, [navigate]);

  // Handle password change
  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    let errors = [];

    // Validation
    if (!currentPassword.trim()) {
      errors.push("Current password is required");
    }
    if (!newPassword.trim()) {
      errors.push("New password is required");
    }
    if (newPassword.length < 6) {
      errors.push("New password must be at least 6 characters");
    }
    if (newPassword !== confirmPassword) {
      errors.push("Passwords do not match");
    }

    if (errors.length > 0) {
      setError(errors.join(", "));
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:5000/api/auth/change-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          currentPassword,
          newPassword
        })
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.msg || "Failed to change password");
        setLoading(false);
        return;
      }

      setSuccess("Password changed successfully!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setLoading(false);

      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(""), 3000);
    } catch (error) {
      setError("Server error. Please try again.");
      console.error(error);
      setLoading(false);
    }
  };

  // Handle preference changes
  const handlePreferencesChange = () => {
    const preferences = {
      emailNotifications,
      jobAlerts
    };
    localStorage.setItem("userPreferences", JSON.stringify(preferences));
    setSuccess("Preferences updated successfully!");
    setTimeout(() => setSuccess(""), 3000);
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("userPreferences");
    navigate("/login");
  };

  if (!user) {
    return <div className="settings-container"><p>Loading...</p></div>;
  }

  return (
    <div className="settings-container">
      <div className="settings-header">
        <h1>Settings</h1>
        <button onClick={() => navigate("/dashboard")} className="back-button">
          ← Back to Dashboard
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}

      <div className="settings-content">
        {/* Profile Section */}
        <div className="settings-section">
          <h2>Profile</h2>
          <div className="profile-info">
            <div className="info-group">
              <label>Name</label>
              <p>{user.name}</p>
            </div>
            <div className="info-group">
              <label>Email</label>
              <p>{user.email}</p>
            </div>
            <div className="info-group">
              <label>Member Since</label>
              <p>{new Date(user.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
        </div>

        {/* Change Password Section */}
        <div className="settings-section">
          <h2>Change Password</h2>
          <form onSubmit={handlePasswordChange}>
            <div className="form-group">
              <label htmlFor="currentPassword">Current Password</label>
              <input
                id="currentPassword"
                type="password"
                placeholder="Enter current password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="newPassword">New Password</label>
              <input
                id="newPassword"
                type="password"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                id="confirmPassword"
                type="password"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={loading}
              />
            </div>

            <button type="submit" disabled={loading} className="btn-primary">
              {loading ? "Updating..." : "Update Password"}
            </button>
          </form>
        </div>

        {/* Preferences Section */}
        <div className="settings-section">
          <h2>Preferences</h2>
          <div className="preferences-group">
            <div className="preference-item">
              <div className="checkbox-wrapper">
                <input
                  id="emailNotifications"
                  type="checkbox"
                  checked={emailNotifications}
                  onChange={(e) => setEmailNotifications(e.target.checked)}
                />
                <label htmlFor="emailNotifications">Email Notifications</label>
              </div>
              <p className="preference-description">
                Receive email updates about your account activity
              </p>
            </div>

            <div className="preference-item">
              <div className="checkbox-wrapper">
                <input
                  id="jobAlerts"
                  type="checkbox"
                  checked={jobAlerts}
                  onChange={(e) => setJobAlerts(e.target.checked)}
                />
                <label htmlFor="jobAlerts">Job Application Alerts</label>
              </div>
              <p className="preference-description">
                Get notified about new job applications you've submitted
              </p>
            </div>

            <button
              type="button"
              onClick={handlePreferencesChange}
              className="btn-primary"
              style={{ marginTop: "15px" }}
            >
              Save Preferences
            </button>
          </div>
        </div>

        {/* Account Actions Section */}
        <div className="settings-section danger-zone">
          <h2>Account Actions</h2>
          <button
            onClick={handleLogout}
            className="btn-logout"
          >
            Logout
          </button>
          <p className="action-description">
            You will be logged out of your account on all devices.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Settings;
