import React, { useEffect, useState } from 'react';
import axios from 'axios';

function PaymentList({ refreshKey, searchTerm }) {
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchPayments = async () => {
        try {
            setLoading(true);
            const res = await axios.get("http://localhost:8083/payment/get", {
                params: { id: searchTerm || 0 }
            });

            // Backend returns a single PaymentGeneralDto, not a list
            if (res.data) {
                setPayments([res.data]); // convert to array for table
            } else {
                setPayments([]);
            }

            setLoading(false);
        } catch (error) {
            console.error("Error fetching payments:", error);
            setPayments([]);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPayments();
    }, [refreshKey, searchTerm]);

    const deletePayment = async (id) => {
        try {
            await axios.delete("http://localhost:8083/payment/delete", {
                params: { id }
            });
            fetchPayments();
        } catch (err) {
            console.error("Delete failed:", err);
        }
    };

    return (
        <div>
            {loading ? (
                <p>Loading payments...</p>
            ) : payments.length === 0 ? (
                <p>No payments found.</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Order ID</th>
                            <th>Amount</th>
                            <th>Date</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {payments.map((p, index) => (
                            <tr key={index}>
                                <td>{p.id}</td>
                                <td>{p.orderId}</td>
                                <td>{p.amount}</td>
                                <td>{p.date}</td>
                                <td>
                                    <button onClick={() => deletePayment(p.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default PaymentList;
