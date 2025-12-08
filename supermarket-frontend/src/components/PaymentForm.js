import React, { useEffect, useState } from 'react';
import axios from 'axios';
import API_BASE_URLS from '../config/api'; // <--- 1. Gateway Config Import kala
import '../styles/TableStyles.css';

function PaymentForm({ onPaymentAdded }) {
    const [orderId, setOrderId] = useState('');
    const [amount, setAmount] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [message, setMessage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setMessage(null);

        const payload = {
            orderId: parseInt(orderId),
            amount: parseFloat(amount)
        };

        try {
            // Backend URL (Assuming Port 8085)
            await axios.post('http://localhost:8085/api/payments', payload);

            setMessage('Payment Successful! ✅');
            setOrderId('');
            setAmount('');

            if (onPaymentAdded) onPaymentAdded();
            setTimeout(() => setMessage(null), 3000);

        } catch (err) {
            console.error(err);
            setMessage('Payment Failed. Check Backend (8085).');
        }
        setSubmitting(false);
    };

    return (
        <div className="form-container">
            <h3>Make Payment</h3>
            <p>Enter Order ID and Amount.</p>
            <form onSubmit={handleSubmit}>

                <div className="form-group">
                    <label>Order ID:</label>
                    <input
                        type="number"
                        value={orderId}
                        onChange={(e) => setOrderId(e.target.value)}
                        required
                        placeholder="e.g. 101"
                    />
                </div>

                <div className="form-group">
                    <label>Amount (LKR):</label>
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        required
                        placeholder="0.00"
                        step="0.01"
                    />
                </div>

                <button type="submit" className="submit-btn" disabled={submitting}>
                    {submitting ? 'Processing...' : 'Pay Now'}
                </button>
            </form>

            {message && <div className="popup-toast success-toast" style={{ background: message.includes('Failed') ? '#dc3545' : '#28a745' }}>{message}</div>}
        </div>
    );
}

export default PaymentForm;