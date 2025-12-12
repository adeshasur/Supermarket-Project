import React, { useEffect, useState } from 'react';
import axios from 'axios';

function PaymentList({ refreshKey, searchTerm }) {
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCustomer, setSelectedCustomer] = useState(null);

    // --- Microservice URLs ---
    const PAYMENT_SERVICE_URL = "http://localhost:8085/payment";
    const ORDER_SERVICE_URL = "http://localhost:8084/api/orders";
    const CUSTOMER_SERVICE_URL = "http://localhost:8083/customers";

    // --- Inline Modal Styles ---
    const modalOverlayStyle = {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0, 0, 0, 0.6)', 
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000, 
    };

    const modalContentStyle = {
        background: 'white',
        padding: '30px',
        borderRadius: '8px',
        boxShadow: '0 5px 15px rgba(0, 0, 0, 0.3)',
        maxWidth: '400px',
        width: '90%',
        zIndex: 1001,
    };
    // ---------------------------

    // Fetch payments
    const fetchPayments = async () => {
        try {
            setLoading(true);
            let res;
            if (searchTerm) {
                res = await axios.get(`${PAYMENT_SERVICE_URL}/get`, { params: { id: searchTerm } });
                setPayments(res.data ? [res.data] : []);
            } else {
                res = await axios.get(`${PAYMENT_SERVICE_URL}/getAll`);
                setPayments(res.data || []);
            }
            setLoading(false);
        } catch (err) {
            console.error("Error fetching payments:", err);
            setPayments([]);
            setLoading(false);
        }
    };

    // Delete payment
    const deletePayment = async (id) => {
        if (window.confirm("Are you sure you want to delete this payment?")) {
            try {
                await axios.delete(`${PAYMENT_SERVICE_URL}/delete`, { params: { id } });
                fetchPayments();
            } catch (err) {
                console.error("Delete failed:", err);
                alert("Failed to delete payment.");
            }
        }
    };

    // View customer details (FINAL FIXES APPLIED)
    const viewCustomer = async (orderId) => {
        setSelectedCustomer(null); 
        
        console.log(`Attempting to fetch Order ID: ${orderId} for customer lookup.`);

        try {
            // 1. Fetch Order details
            const orderRes = await axios.get(`${ORDER_SERVICE_URL}/${orderId}`);
            
            // 2. CRITICAL FIX: Extract customer ID using the correct JSON field name 'customerId'
            const customerId = orderRes.data?.customerId; 
            
            if (!customerId) {
                alert(`Error: Order ID ${orderId} was found, but the customer ID field is missing or null in the Order Service response.`);
                return; 
            }

            // 3. Fetch Customer details
            console.log(`Found Customer ID: ${customerId}. Fetching customer details...`);
            const customerRes = await axios.get(`${CUSTOMER_SERVICE_URL}/${customerId}`);
            
            // 4. Set the customer details to state to display the modal
            setSelectedCustomer(customerRes.data);
            
        } catch (err) {
            console.error(`Failed to fetch details for order ID ${orderId}:`, err);
            
            const status = err.response ? err.response.status : 'N/A';
            const url = err.config ? err.config.url : 'N/A';
            
            if (status === 500) {
                alert(`CRITICAL ERROR: Order ID ${orderId} does not exist in the Order Database (Status 500: Order Not Found). Check the console for the failing ID.`);
            } else if (status === 404) {
                // If this triggers, the customer ID found in the order exists, but not in the Customer Service.
                alert(`Customer ID not found in Customer Service (Status 404). Check customer data integrity.`);
            } else {
                 alert(`Failed to fetch customer details. API Status: ${status}. Check service at ${url}.`);
            }
        }
    };

    // Close modal
    const closeModal = () => setSelectedCustomer(null);

    useEffect(() => { fetchPayments(); }, [refreshKey, searchTerm]);

    if (loading) return <p>Loading payments...</p>;
    if (payments.length === 0) return <p>No payments found.</p>;

    return (
        <div className="app-table-container">
            <table className="app-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr style={{ background: '#f8f8f8' }}>
                        <th style={{ padding: '12px 15px', borderBottom: '1px solid #ddd' }}>Order ID</th>
                        {/* REMOVED: Order ID column was here */}
                        <th style={{ padding: '12px 15px', borderBottom: '1px solid #ddd' }}>Amount (Rs.)</th>
                        <th style={{ padding: '12px 15px', borderBottom: '1px solid #ddd' }}>Payment Status</th>
                        <th style={{ padding: '12px 15px', borderBottom: '1px solid #ddd' }}>Transaction ID</th>
                        <th style={{ padding: '12px 15px', borderBottom: '1px solid #ddd' }}>Payment Date</th>
                        <th style={{ padding: '12px 15px', borderBottom: '1px solid #ddd' }}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {payments.map((p) => (
                        <tr key={p.id} style={{ borderBottom: '1px solid #eee' }}>
                            <td style={{ padding: '12px 15px' }}>{p.id}</td>
                            {/* REMOVED: p.orderId data cell was here */}
                            <td style={{ padding: '12px 15px' }}>{p.amount?.toFixed(2) || '0.00'}</td>
                            <td 
                                style={{ 
                                    padding: '12px 15px', 
                                    fontWeight: 'bold', 
                                    color: p.paymentStatus === 'SUCCESS' ? 'green' : (p.paymentStatus === 'FAILED' ? 'red' : 'orange') 
                                }}
                            >
                                {p.paymentStatus || 'PENDING'}
                            </td>
                            <td style={{ padding: '12px 15px' }}>{p.transactionId || 'N/A'}</td>
                            <td style={{ padding: '12px 15px' }}>{p.paymentDate ? new Date(p.paymentDate).toLocaleString() : 'N/A'}</td>
                            <td style={{ padding: '12px 15px' }}>
                                <button
                                    onClick={() => deletePayment(p.id)}
                                    style={{ padding: '5px 10px', background: '#dc3545', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', marginRight: '5px' }}
                                >
                                    Delete
                                </button>
                                <button
                                    // FINAL FIX: Using p.id (Payment ID) as the lookup Order ID
                                    onClick={() => viewCustomer(p.id)} 
                                    style={{ padding: '5px 10px', background: '#0d6efd', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
                                >
                                    View Customer
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Modal for customer details */}
            {selectedCustomer && (
                <div style={modalOverlayStyle}>
                    <div style={modalContentStyle}>
                        <h3>Customer Details</h3>
                        <p><strong>Name:</strong> {selectedCustomer.name}</p>
                        <p><strong>Email:</strong> {selectedCustomer.email}</p>
                        <p><strong>Phone:</strong> {selectedCustomer.phone || 'N/A'}</p>
                        <p><strong>Address:</strong> {selectedCustomer.address}</p>

                        <button
                            onClick={closeModal}
                            style={{ padding: '5px 10px', background: '#6c757d', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', marginTop: '10px' }}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default PaymentList;