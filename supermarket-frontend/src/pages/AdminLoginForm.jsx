import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, Shield } from 'lucide-react';
import '../styles/AdminLoginForm.css';

export default function AdminLoginForm({ onLogin }) {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  // Input change handler
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setMessage({ text: '', type: '' });
  };

  // Submit admin login
  const handleSubmit = async () => {
    setLoading(true);
    setMessage({ text: '', type: '' });

    try {
      const response = await fetch('http://localhost:8083/admins/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok && data) {
        // SUCCESS
        setMessage({ text: "Welcome back, Admin!", type: "success" });

        // Save admin in localStorage
        localStorage.setItem("admin", JSON.stringify(data));

        // Tell App.js that admin is logged in
        if (onLogin) {
          onLogin();
        }

        // Redirect after short delay
        setTimeout(() => {
          navigate('/admin/dashboard');
        }, 800);

      } else {
        // FAIL
        setMessage({ text: "Invalid admin email or password", type: "error" });
      }

    } catch (error) {
      console.log(error);
      setMessage({
        text: "Connection error. Make sure backend (8083) is running!",
        type: "error"
      });
    }

    setLoading(false);
  };

  // Enter key listener
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div className="admin-login-page">
      <div className="admin-login-container">
        <div className="admin-login-card">
          
          {/* Header */}
          <div className="admin-login-header">
            <div className="admin-icon-wrapper">
              <Shield className="admin-shield-icon" />
            </div>
            <h2 className="admin-login-title">Admin Login</h2>
            <p className="admin-login-subtitle">Access the administration panel</p>
          </div>

          {/* Form */}
          <div className="admin-login-form">

            {/* Email */}
            <div className="admin-form-group">
              <label className="admin-form-label">Email Address</label>
              <div className="admin-input-wrapper">
                <Mail className="admin-input-icon" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onKeyPress={handleKeyPress}
                  placeholder="Enter admin email"
                  className="admin-form-input"
                  autoComplete="email"
                />
              </div>
            </div>

            {/* Password */}
            <div className="admin-form-group">
              <label className="admin-form-label">Password</label>
              <div className="admin-input-wrapper">
                <Lock className="admin-input-icon" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  onKeyPress={handleKeyPress}
                  placeholder="Enter admin password"
                  className="admin-form-input"
                  autoComplete="current-password"
                />

                {/* Password toggle */}
                <button
                  type="button"
                  className="admin-password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="admin-toggle-icon" />
                  ) : (
                    <Eye className="admin-toggle-icon" />
                  )}
                </button>
              </div>
            </div>

            {/* Message box */}
            {message.text && (
              <div
                className={`admin-login-message ${
                  message.type === "success"
                    ? "admin-message-success"
                    : "admin-message-error"
                }`}
              >
                {message.text}
              </div>
            )}

            {/* Submit button */}
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="admin-submit-btn"
            >
              {loading ? "Authenticating..." : "Sign In"}
            </button>
          </div>

          {/* Back link */}
          <div className="admin-login-footer">
            <p className="admin-footer-text">
              <button
                onClick={() => navigate('/')}
                className="admin-back-link"
              >
                ← Back to Home
              </button>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
