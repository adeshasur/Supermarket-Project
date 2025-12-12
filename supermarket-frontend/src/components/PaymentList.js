import React, { useEffect, useState } from 'react';
import axios from 'axios';

function PaymentList({ refreshKey, searchTerm }) {
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);

    const PAYMENT_SERVICE_URL = "http://localhost:8085/payment"; // ✅ Backend port fixed

    // Fetch payments from backend
    const fetchPayments = async () => {
        try {
            setLoading(true);
            let res;

            if (searchTerm) {
                // Search by ID
                res = await axios.get(`${PAYMENT_SERVICE_URL}/get`, { params: { id: searchTerm } });
                setPayments(res.data ? [res.data] : []);
            } else {
                // Get all payments
                res = await axios.get(`${PAYMENT_SERVICE_URL}/getAll`);
                setPayments(res.data || []);
            }

            setLoading(false);
        } catch (error) {
            console.error("Error fetching payments:", error);
            setPayments([]);
            setLoading(false);
        }
    };

    // Delete payment
    const deletePayment = async (id) => {
        if(window.confirm("Are you sure you want to delete this payment?")) {
            try {
                await axios.delete(`${PAYMENT_SERVICE_URL}/delete`, { params: { id } });
                fetchPayments(); // refresh table
            } catch (err) {
                console.error("Delete failed:", err);
                alert("Failed to delete payment.");
            }
        }
    };

    // Fetch payments on mount and when refreshKey or searchTerm changes
    useEffect(() => {
        fetchPayments();
    }, [refreshKey, searchTerm]);

    if (loading) return <p>Loading payments...</p>;
    if (payments.length === 0) return <p>No payments found.</p>;

    return (
        <div className="app-table-container">
            <table className="app-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Order ID</th>
                        <th>Amount (Rs.)</th>
                        <th>Payment Status</th>
                        <th>Transaction ID</th>
                        <th>Payment Date</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {payments.map((p) => (
                        <tr key={p.id}>
                            <td>{p.id}</td>
                            <td>{p.orderId}</td>
                            <td>{p.amount ? p.amount.toFixed(2) : '0.00'}</td>
                            <td style={{ fontWeight: 'bold', color: p.paymentStatus === 'SUCCESS' ? 'green' : 'orange' }}>
                                {p.paymentStatus || 'PENDING'}
                            </td>
                            <td>{p.transactionId || 'N/A'}</td>
                            <td>{p.paymentDate ? new Date(p.paymentDate).toLocaleString() : 'N/A'}</td>
                            <td>
                                <button
                                    onClick={() => deletePayment(p.id)}
                                    style={{
                                        padding: '5px 10px',
                                        background: '#dc3545',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '5px',
                                        cursor: 'pointer'
                                    }}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default PaymentList;
