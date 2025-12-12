import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Add 'searchTerm' to props
function OrderList({ refreshKey, searchTerm }) {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [selectedCustomer, setSelectedCustomer] = useState(null);

    const ORDER_SERVICE_URL = "http://localhost:8084/api/orders";
    const CUSTOMER_SERVICE_URL = "http://localhost:8083/customers";

    // Fetch orders (MODIFIED TO HANDLE SEARCH TERM)
    const fetchOrders = async () => {
        try {
            setLoading(true);
            let res;

            if (searchTerm && !isNaN(Number(searchTerm))) {
                // Mode 1: Search by specific Order ID
                console.log(`Searching for Order ID: ${searchTerm}`);
                try {
                    res = await axios.get(`${ORDER_SERVICE_URL}/${searchTerm}`);
                    // If successful, wrap the single order object in an array
                    setOrders([res.data]); 
                } catch (searchError) {
                    // Handle 404 (Not Found) or other errors during single lookup
                    console.error(`Order ID ${searchTerm} not found.`, searchError);
                    setOrders([]);
                }
            } else {
                // Mode 2: Fetch all orders
                console.log("Fetching all orders.");
                res = await axios.get(ORDER_SERVICE_URL);
                setOrders(res.data);
            }
            
            setLoading(false);
        } catch (error) {
            console.error("Error fetching orders:", error);
            setLoading(false);
            setOrders([]);
        }
    };

    // Add searchTerm to dependency array so search triggers a new fetch
    useEffect(() => { fetchOrders(); }, [refreshKey, searchTerm]);

    // Delete order (no change needed here)
    const handleDelete = async (id) => {
        if (window.confirm("Delete this order?")) {
            try {
                await axios.delete(`${ORDER_SERVICE_URL}/${id}`);
                // Use fetchOrders() to refresh based on the current search context
                fetchOrders(); 
            } catch (err) {
                alert("Error deleting order");
            }
        }
    };

    // View order + customer details (no change needed here)
    const viewDetails = async (orderId) => {
        try {
            const orderRes = await axios.get(`${ORDER_SERVICE_URL}/${orderId}`);
            setSelectedOrder(orderRes.data);

            const customerId = orderRes.data.customerId;
            const customerRes = await axios.get(`${CUSTOMER_SERVICE_URL}/${customerId}`);
            setSelectedCustomer(customerRes.data);
        } catch (err) {
            alert("Failed to fetch order details");
        }
    };

    // Close modal (no change needed here)
    const closeModal = () => {
        setSelectedOrder(null);
        setSelectedCustomer(null);
    };

    if (loading) return <p>Loading Orders...</p>;
    
    // Check if searching returned zero results
    if (orders.length === 0) {
        return <p>{searchTerm ? `No orders found for ID: ${searchTerm}.` : 'No orders found.'}</p>;
    }


    return (
        <div className="app-table-container">
            <table className="app-table">
                <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>Date</th>
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
                            <td style={{ fontWeight: 'bold', color: order.paymentStatus === 'SUCCESS' ? 'green' : 'orange' }}>
                                {order.paymentStatus || 'PENDING'}
                            </td>
                            <td>{order.orderItems ? order.orderItems.length : 0} Items</td>
                            <td>
                                <button onClick={() => handleDelete(order.id)} style={{ padding: '5px 10px', background: '#dc3545', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                                    Delete
                                </button>
                                <button onClick={() => viewDetails(order.id)} style={{ padding: '5px 10px', marginLeft: '5px', background: '#0d6efd', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                                    View
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
                                <li key={item.id}>Product #{item.productId} — Qty: {item.quantity} — Price: {item.price}</li>
                            ))}
                        </ul>

                        <button onClick={closeModal} style={{ padding: '5px 10px', background: '#6c757d', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default OrderList;