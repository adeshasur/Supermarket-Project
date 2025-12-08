import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/Login.css';

function Login({ onLogin }) {
    const [userType, setUserType] = useState('admin');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        // Admin Login (Mock)
        if (userType === 'admin') {
            onLogin('admin');
            return;
        }

        // Customer Login (API)
        if (!email || !password) {
            setError('Please fill in all fields.');
            return;
        }

        setLoading(true);
        const url = 'http://localhost:8083/api/customers/login';
        const payload = { email, password };

        try {
            const response = await axios.post(url, payload);
            
            // Check if response data exists and possibly check a specific property like 'token' or 'success'
            // Adjust this condition based on your actual backend response structure
            if (response.data) { 
                onLogin('customer');
            } else {
                setError('Invalid Email or Password.');
            }
        } catch (err) {
            console.error("Login Error:", err);
            // Customize error message based on error response if available
            if (err.response && err.response.data && err.response.data.message) {
                 setError(err.response.data.message);
            } else {
                 setError('Login failed. Please check your credentials or server connection.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                {/* Title */}
                <h2 className="login-title">👋 Welcome to Supermarket</h2>
                <p className="login-subtitle">Please login to continue</p>

                {/* Toggle Buttons */}
                <div className="user-type-toggle">
                    <button
                        type="button" // Add type="button" to prevent form submission
                        className={`toggle-btn ${userType === 'admin' ? 'active' : ''}`}
                        onClick={() => { setUserType('admin'); setError(''); }} // Clear error on toggle
                    >
                        Admin
                    </button>
                    <button
                        type="button" // Add type="button" to prevent form submission
                        className={`toggle-btn ${userType === 'customer' ? 'active' : ''}`}
                        onClick={() => { setUserType('customer'); setError(''); }} // Clear error on toggle
                    >
                        Customer
                    </button>
                </div>

                {/* Login Form */}
                <form onSubmit={handleSubmit}>
                    {/* Email Field (Customer only) */}
                    {userType === 'customer' && (
                        <div className="form-group">
                            <label>Email Address</label>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                    )}

                    {/* Password Field */}
                    {userType === 'customer' && (
                        <div className="form-group">
                            <label>Password</label>
                            <input
                                type="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                    )}

                    {/* Admin Notice */}
                    {userType === 'admin' && (
                        <div style={{ background: '#e7f5ff', color: '#004085', padding: '15px', borderRadius: '8px', marginBottom: '20px', fontSize: '0.9rem' }}>
                            ℹ️ <b>Admin Access</b><br />No password required for demo.
                        </div>
                    )}

                    {/* Error Message */}
                    {error && <div className="error-msg" style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}

                    {/* Submit Button */}
                    <button type="submit" className="submit-btn" disabled={loading}>
                        {loading ? 'Checking...' : `Login as ${userType.charAt(0).toUpperCase() + userType.slice(1)}`}
                    </button>
                </form>

                {/* Register Link */}
                {userType === 'customer' && (
                    <p className="register-link">
                        Don't have an account? <Link to="/register">Register here</Link>
                    </p>
                )}
            </div>
        </div>
    );
}

export default Login;