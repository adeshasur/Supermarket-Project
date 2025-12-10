import React, { useEffect, useState } from 'react';
import axios from 'axios';
import API_BASE_URLS from '../config/api';
import '../styles/TableStyles.css';

function PaymentList({ refreshKey }) {
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPayments = async () => {
            try {
                setLoading(true);
                setError(null);

                const response = await axios.get(`${API_BASE_URLS.paymentService}/payments`);
                setPayments(response.data);

            } catch (err) {
                console.error(err);
                setError('Could not fetch payments. Is Payment Service running?');
            } finally {
                setLoading(false);
            }
        };

        fetchPayments();
    }, [refreshKey]);

    if (loading) return <div style={{ textAlign: 'center', padding: '50px' }}><h3>Loading Payments...</h3></div>;

    return (
        <div className="inventory-table-container">
            <h3>Payment History</h3>
            {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
            <table className="inventory-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Order ID</th>
                        <th>Amount (LKR)</th>
                        <th>Status</th>
                        <th>Transaction ID</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {payments.length === 0 ? (
                        <tr>
                            <td colSpan="6" style={{ textAlign: 'center' }}>No payments found.</td>
                        </tr>
                    ) : (
                        payments.map(payment => (
                            <tr key={payment.id}>
                                <td>{payment.id}</td>
                                <td>{payment.orderId}</td>
                                <td style={{ textAlign: 'right', fontWeight: 'bold' }}>{payment.amount.toFixed(2)}</td>
                                <td>{payment.paymentStatus}</td>
                                <td>{payment.transactionId}</td>
                                <td>{new Date(payment.paymentDate).toLocaleString()}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default PaymentList;
