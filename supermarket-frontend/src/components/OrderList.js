import React, { useEffect, useState } from 'react';
import axios from 'axios';

function OrderList({ refreshKey }) {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const ORDER_SERVICE_URL = "http://localhost:8084/api/orders"; 

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

    const handleDelete = async (id) => {
        if(window.confirm("Delete this order?")) {
            try { await axios.delete(`${ORDER_SERVICE_URL}/${id}`); fetchOrders(); } 
            catch (err) { alert("Error deleting order"); }
        }
    };

    if (loading) return <p>Loading Orders...</p>;
    if (orders.length === 0) return <p>No orders found.</p>;

    return (
        <div className="app-table-container">
            <table className="app-table">
                <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>Date</th>
                        <th>Total Amount</th>
                        <th>Payment Status</th> {/* ✅ අලුත් Column එක */}
                        <th>Items</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order) => (
                        <tr key={order.id}>
                            <td>#{order.id}</td>
                            <td>{order.orderDate ? new Date(order.orderDate).toLocaleString() : 'N/A'}</td>
                            <td>Rs. {order.totalAmount ? order.totalAmount.toFixed(2) : '0.00'}</td>
                            
                            {/* ✅ Payment Status පෙන්නනවා */}
                            <td style={{ fontWeight: 'bold', color: order.paymentStatus === 'SUCCESS' ? 'green' : 'orange' }}>
                                {order.paymentStatus || 'PENDING'}
                            </td>

                            <td>{order.orderItems ? order.orderItems.length : 0} Items</td>
                            <td>
                                <button onClick={() => handleDelete(order.id)} style={{ padding: '5px 10px', background: '#dc3545', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
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

export default OrderList;