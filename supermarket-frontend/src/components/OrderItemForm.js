import React, { useState } from 'react';
import axios from 'axios';
import '../styles/FormStyles.css';

function OrderItemForm({ orders, onItemAdded }) {
  const [itemForm, setItemForm] = useState({
    orderId: '',
    productId: '',
    quantity: '',
    price: ''
  });

  const API = "http://localhost:8084/api/orders";

  const handleAddItem = async () => {
    const { orderId, productId, quantity, price } = itemForm;
    if (!orderId || !productId || !quantity || !price) return alert("Fill all item fields");
    try {
      await axios.post(`${API}/${orderId}/items`, {
        productId: Number(productId),
        quantity: Number(quantity),
        price: Number(price)
      });
      setItemForm({ orderId: '', productId: '', quantity: '', price: '' });
      onItemAdded(); // refresh list
    } catch (err) {
      console.error(err);
      alert("Failed to add item.");
    }
  };

  return (
    <div className="form-container">
      <h3>Add Item to Order</h3>
      <p>Select an order and enter product details</p>
      <div className="form-group">
        <label>Select Order</label>
        <select
          value={itemForm.orderId}
          onChange={(e) => setItemForm({ ...itemForm, orderId: e.target.value })}
        >
          <option value="">-- Select Order --</option>
          {orders.map((o) => (
            <option key={o.id} value={o.id}>
              Order #{o.id} (Cust {o.customerId})
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label>Product ID</label>
        <input
          type="number"
          value={itemForm.productId}
          onChange={(e) => setItemForm({ ...itemForm, productId: e.target.value })}
          placeholder="Enter Product ID"
        />
      </div>
      <div className="form-group">
        <label>Quantity</label>
        <input
          type="number"
          value={itemForm.quantity}
          onChange={(e) => setItemForm({ ...itemForm, quantity: e.target.value })}
          placeholder="Enter Quantity"
        />
      </div>
      <div className="form-group">
        <label>Price</label>
        <input
          type="number"
          value={itemForm.price}
          onChange={(e) => setItemForm({ ...itemForm, price: e.target.value })}
          placeholder="Enter Price"
        />
      </div>
      <button className="submit-btn" onClick={handleAddItem}>Add Item</button>
    </div>
  );
}

export default OrderItemForm;
