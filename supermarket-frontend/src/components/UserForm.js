import React, { useState } from 'react';
import axios from 'axios';
import '../styles/FormStyles.css';

function UserForm({ onUserAdded }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [submitting, setSubmitting] = useState(false);
    const [message, setMessage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setMessage(null);

        const payload = { name, email, password };

        try {
            await axios.post('http://localhost:8083/api/admins', payload);
            setMessage('Admin Registered Successfully! ✅');

            // Clear form
            setName(''); 
            setEmail(''); 
            setPassword('');

            if (onUserAdded) onUserAdded();
            setTimeout(() => setMessage(null), 3000);
        } catch (err) {
            console.error(err);
            setMessage('Error: Failed to register. Check Backend.');
        }
        setSubmitting(false);
    };

    return (
        <div className="form-container">
            <h3>Register Admin</h3>
            <p>Enter admin details.</p>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Name:</label>
                    <input type="text" value={name} onChange={e => setName(e.target.value)} required placeholder="Full Name" />
                </div>
                <div className="form-group">
                    <label>Email:</label>
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="example@mail.com" />
                </div>
                <div className="form-group">
                    <label>Password:</label>
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} required placeholder="Secret Password" />
                </div>
                <button type="submit" className="submit-btn" disabled={submitting}>
                    {submitting ? 'Saving...' : 'Register admin'}
                </button>
            </form>

            {message && <div className={`popup-toast ${message.includes('Error') ? 'error-toast' : 'success-toast'}`}>{message}</div>}
        </div>
    );
}

export default UserForm;
