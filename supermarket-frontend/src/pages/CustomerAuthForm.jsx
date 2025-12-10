import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Lock, MapPin, Eye, EyeOff } from 'lucide-react';
import '../styles/CustomerAuthForm.css';

export default function CustomerAuthForm() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    address: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setMessage({ text: '', type: '' });
  };

  const handleSubmit = async () => {
  setLoading(true);
  setMessage({ text: '', type: '' });

  try {
    const endpoint = isLogin ? '/customers/login' : '/customers';
    const payload = isLogin
      ? { email: formData.email, password: formData.password }
      : formData;

    const response = await fetch(`http://localhost:8083${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const data = await response.json();

    // SUCCESS when backend returns a Customer object
    if (data && data.cid) {

      setMessage({
        text: isLogin
          ? `Welcome back, ${data.name}!`
          : "Registration successful!",
        type: "success"
      });

      // Save customer
      localStorage.setItem("customer", JSON.stringify({
        id: data.cid,
        name: data.name,
        email: data.email,
        address: data.address
      }));

      // Redirect after success
      setTimeout(() => {
        navigate('/customer-dashboard');
      }, 1000);

      // Reset form
      setFormData({ name: '', email: '', password: '', address: '' });
    } 
    else {
      // FAILED login or registration
      setMessage({
        text: "Invalid email or password",
        type: "error"
      });
    }

  } catch (error) {
    setMessage({
      text: 'Connection error. Please try again.',
      type: 'error'
    });
  }

  setLoading(false);
};



  const toggleForm = () => {
    setIsLogin(!isLogin);
    setFormData({ name: '', email: '', password: '', address: '' });
    setMessage({ text: '', type: '' });
    setShowPassword(false);
  };

  return (
    <div className="customer-auth-page">
      <div className="customer-auth-container">
        <div className="customer-auth-card">
          {/* Header */}
          <div className="customer-auth-header">
            <h2 className="customer-auth-title">
              {isLogin ? 'Customer Login' : 'Customer Registration'}
            </h2>
            <p className="customer-auth-subtitle">
              {isLogin ? 'Sign in to your account' : 'Create a new account'}
            </p>
          </div>

          {/* Form Fields */}
          <div className="customer-auth-form">
            {/* Name field - only for registration */}
            {!isLogin && (
              <div className="customer-form-group">
                <label className="customer-form-label">Full Name</label>
                <div className="customer-input-wrapper">
                  <User className="customer-input-icon" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className="customer-form-input"
                  />
                </div>
              </div>
            )}

            {/* Email field */}
            <div className="customer-form-group">
              <label className="customer-form-label">Email Address</label>
              <div className="customer-input-wrapper">
                <Mail className="customer-input-icon" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="customer-form-input"
                />
              </div>
            </div>

            {/* Password field */}
            <div className="customer-form-group">
              <label className="customer-form-label">Password</label>
              <div className="customer-input-wrapper">
                <Lock className="customer-input-icon" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className="customer-form-input"
                />
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  className="customer-password-toggle"
                  type="button"
                >
                  {showPassword ? <EyeOff className="customer-toggle-icon" /> : <Eye className="customer-toggle-icon" />}
                </button>
              </div>
            </div>

            {/* Address field - only for registration */}
            {!isLogin && (
              <div className="customer-form-group">
                <label className="customer-form-label">Address</label>
                <div className="customer-input-wrapper">
                  <MapPin className="customer-input-icon" />
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Enter your address"
                    className="customer-form-input"
                  />
                </div>
              </div>
            )}

            {/* Message display */}
            {message.text && (
              <div className={`customer-auth-message ${message.type === 'success' ? 'customer-message-success' : 'customer-message-error'}`}>
                {message.text}
              </div>
            )}

            {/* Submit button */}
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="customer-submit-btn"
            >
              {loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Create Account')}
            </button>
          </div>

          {/* Toggle form */}
          <div className="customer-auth-footer">
            <p className="customer-footer-text">
              {isLogin ? "Don't have an account? " : 'Already have an account? '}
              <button onClick={toggleForm} className="customer-toggle-link">
                {isLogin ? 'Sign Up' : 'Sign In'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}