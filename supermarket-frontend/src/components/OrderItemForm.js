import React, { useState } from 'react';
import axios from 'axios';
import API_BASE_URLS from '../config/api'; // <--- 1. Config Import
import '../styles/FormStyles.css';

function OrderItemForm({ orders, onItemAdded }) {
    const [selectedOrderId, setSelectedOrderId] = useState('');
    const [productId, setProductId] = useState('');
    const [quantity, setQuantity] = useState('');
    const [price, setPrice] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [message, setMessage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedOrderId) {
            alert("Please select an Order ID first!");
            return;
        }

        setSubmitting(true);
        setMessage(null);

        const payload = {
            productId: parseInt(productId),
            quantity: parseInt(quantity),
            price: parseFloat(price)
        };

        try {
            // <--- 2. Gateway URL Update
            // Pattern: http://localhost:8080/orders/api/orders/{orderId}/items
            await axios.post(`${API_BASE_URLS.ORDERS}/api/orders/${selectedOrderId}/items`, payload);

            setMessage('Item Added Successfully! ✅');
            setProductId('');
            setQuantity('');
            setPrice('');

            if (onItemAdded) onItemAdded();
            setTimeout(() => setMessage(null), 3000);

        } catch (err) {
            console.error(err);
            setMessage('Failed to add item. Check Gateway.');
        }
        setSubmitting(false);
    };

    return (
        <div className="form-container">
            <h3>Add Items</h3>
            <p>Add products to an existing order.</p>
            <form onSubmit={handleSubmit}>

                {/* Order Selection Dropdown */}
                <div className="form-group">
                    <label>Order ID:</label>
                    <select
                        value={selectedOrderId}
                        onChange={(e) => setSelectedOrderId(e.target.value)}
                        required
                        style={{ width: '100%', padding: '10px', border: '1px solid #ced4da', borderRadius: '8px' }}
                    >
                        <option value="">Select Order</option>
                        {orders.map(order => (
                            <option key={order.id} value={order.id}>
                                Order #{order.id} (Customer: {order.customerId})
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label>Product ID:</label>
                    <input
                        type="number"
                        placeholder="Product ID"
                        value={productId}
                        onChange={(e) => setProductId(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Quantity:</label>
                    <input
                        type="number"
                        placeholder="Qty"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Price (Per Unit):</label>
                    <input
                        type="number"
                        placeholder="Price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                    />
                </div>

                <button type="submit" className="submit-btn" disabled={submitting}>
                    {submitting ? 'Adding...' : 'Add Item'}
                </button>
            </form>
            {message && <div className="popup-toast success-toast" style={{ background: message.includes('Failed') ? '#dc3545' : '#28a745' }}>{message}</div>}
        </div>
    );
}

export default OrderItemForm;