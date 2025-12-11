import React, { useEffect, useState } from 'react';
import axios from 'axios';

function OrderList({ refreshKey }) {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [adminName, setAdminName] = useState('Admin'); 

    const ORDER_SERVICE_URL = "http://localhost:8084/api/orders"; 

    // Logged-in User (Admin) ගේ නම Local Storage එකෙන් ගන්නවා
    useEffect(() => {
        const adminData = localStorage.getItem('admin');
        if (adminData) {
            try {
                const admin = JSON.parse(adminData);
                setAdminName(admin.name || 'Manager');
            } catch (e) {
                setAdminName('Manager');
            }
        }
    }, []);

    const fetchOrders = async () => {
        try {
            setLoading(true);
            const res = await axios.get(ORDER_SERVICE_URL);
            setOrders(res.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching orders:", error);
            setLoading(false);
        }
    };

    useEffect(() => { fetchOrders(); }, [refreshKey]);

    const handleConfirmOrder = async (orderId) => {
        if (!window.confirm(`Mark Order #${orderId} as PROCESSING?`)) return;

        try {
            // PUT request එක යවනවා
            await axios.put(`${ORDER_SERVICE_URL}/${orderId}/status`, "PROCESSING", {
                headers: { 'Content-Type': 'text/plain' }
            });
            fetchOrders();
            alert(`Order #${orderId} confirmed by ${adminName}!`);
        } catch (err) {
            console.error("Confirmation failed:", err);
            alert("Failed to confirm order status.");
        }
    };
    
    const handleDelete = async (id) => {
        if (!window.confirm("Delete this order?")) return;
        try { await axios.delete(`${ORDER_SERVICE_URL}/${id}`); fetchOrders(); } 
        catch (err) { alert("Error deleting order"); }
    };


    if (loading) return <p>Loading Orders...</p>;
    if (orders.length === 0) return <p>No orders found.</p>;

    return (
        <div className="app-table-container">
            <h4 style={{ marginBottom: '15px' }}>Logged in as: {adminName}</h4> 
            
            <table className="app-table">
                <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>Total Amount</th>
                        <th>Payment Status</th>
                        <th>Order Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order) => {
                        // ✅ FIX: Status එක නැත්නම් 'PAID' විදිහට සලකනවා
                        const currentStatus = order.orderStatus || 'PAID';

                        return (
                            <tr key={order.id}>
                                <td>#{order.id}</td>
                                <td>Rs. {order.totalAmount ? order.totalAmount.toFixed(2) : '0.00'}</td>
                                <td style={{ color: order.paymentStatus === 'SUCCESS' ? 'green' : 'orange' }}>
                                    {order.paymentStatus || 'PAID'}
                                </td>
                                
                                {/* ✅ Order Status Display */}
                                <td style={{ fontWeight: 'bold', color: currentStatus === 'PROCESSING' ? '#17a2b8' : currentStatus === 'PAID' ? 'green' : 'black' }}>
                                    {currentStatus}
                                </td>

                                <td style={{ textAlign: 'center' }}>
                                    {/* ✅ FIX: Confirm Button Visibility (NULL, PAID, PENDING ඔක්කොටම පෙනෙනවා) */}
                                    {currentStatus !== 'PROCESSING' && currentStatus !== 'SHIPPED' && currentStatus !== 'DELIVERED' && (
                                        <button 
                                            onClick={() => handleConfirmOrder(order.id)}
                                            style={{ 
                                                padding: '5px 10px', 
                                                backgroundColor: '#17a2b8', 
                                                color: 'white', 
                                                border: 'none', 
                                                borderRadius: '5px', 
                                                cursor: 'pointer',
                                                marginRight: '5px'
                                            }}
                                        >
                                            Confirm
                                        </button>
                                    )}
                                    
                                    <button 
                                        onClick={() => handleDelete(order.id)}
                                        style={{ padding: '5px 10px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default OrderList;