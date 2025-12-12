// Remove this entire file
import React, { useState } from 'react';
import axios from 'axios';
import '../styles/FormStyles.css';

function OrderForm({ onOrderUpdate }) {
  const [customerId, setCustomerId] = useState('');
  const API = "http://localhost:8084/api/orders";

  const handleCreateOrder = async () => {
    if (!customerId) return alert("Enter Customer ID");
    try {
      await axios.post(API, { customerId: Number(customerId) });
      setCustomerId('');
      onOrderUpdate(); // refresh orders list
    } catch (err) {
      console.error(err);
      alert("Failed to create order.");
    }
  };

  return (
    <div className="form-container">
      <h3>Create Order</h3>
      <p>Enter Customer ID to create a new order</p>
      <div className="form-group">
        <label>Customer ID</label>
        <input
          type="number"
          value={customerId}
          onChange={(e) => setCustomerId(e.target.value)}
          placeholder="Enter Customer ID"
        />
      </div>
      <button className="submit-btn" onClick={handleCreateOrder}>Create Order</button>
    </div>
  );
}

export default OrderForm;
