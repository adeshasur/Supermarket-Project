import React, { useEffect, useState } from 'react';
import axios from 'axios';

function OrderList({ refreshKey }) {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    // 🔥 FIX 1: Add missing adminName
    const adminName = "Admin";

    // 🔥 FIX 2: Add missing modal states
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [selectedCustomer, setSelectedCustomer] = useState(null);

    // 🔥 FIX 3: Add missing closeModal function
    const closeModal = () => {
        setSelectedOrder(null);
        setSelectedCustomer(null);
    };

    const ORDER_SERVICE_URL = "http://localhost:8084/api/orders"; 

    // Fetch all orders
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
            try { 
                await axios.delete(`${ORDER_SERVICE_URL}/${id}`); 
                fetchOrders(); 
            } 
            catch (err) { 
                alert("Error deleting order"); 
            }
        }
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

                            {/* Payment Status */}
                            <td style={{ fontWeight: 'bold', color: order.paymentStatus === 'SUCCESS' ? 'green' : 'orange' }}>
                                {order.paymentStatus || 'PENDING'}
                            </td>

                            <td>{order.orderItems ? order.orderItems.length : 0} Items</td>
                            <td>
                                <button 
                                    onClick={() => handleDelete(order.id)} 
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

            {/* Modal */}
            {selectedOrder && selectedCustomer && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h3>Order Details #{selectedOrder.id}</h3>

                        <h4>Customer Info</h4>
                        <p>Name: {selectedCustomer.name}</p>
                        <p>Email: {selectedCustomer.email}</p>
                        <p>Phone: {selectedCustomer.phone || 'N/A'}</p>
                        <p>Address: {selectedCustomer.address}</p>

                        <h4>Order Info</h4>
                        <p>Status: {selectedOrder.orderStatus}</p>
                        <p>Payment: {selectedOrder.paymentStatus}</p>
                        <p>Total: Rs. {selectedOrder.totalAmount}</p>

                        <h4>Items</h4>
                        <ul>
                            {selectedOrder.orderItems.map(item => (
                                <li key={item.id}>
                                    Product #{item.productId} — Qty: {item.quantity} — Price: {item.price}
                                </li>
                            ))}
                        </ul>

                        <button 
                            onClick={closeModal} 
                            style={{ 
                                padding: '5px 10px',
                                background: '#6c757d',
                                color: 'white',
                                border: 'none',
                                borderRadius: '5px',
                                cursor: 'pointer'
                            }}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default OrderList;
