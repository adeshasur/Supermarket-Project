import React, { useState } from 'react';
import axios from 'axios';
import './StockUpdateForm.css';

function StockUpdateForm({ onStockUpdated }) {
  const [productId, setProductId] = useState('');
  const [quantity, setQuantity] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState(null); 
  const [isError, setIsError] = useState(false); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage(null);
    setIsError(false);

    const payload = {
      productId: parseInt(productId),
      quantity: parseInt(quantity)
    };

    try {
      await axios.post('http://localhost:8082/inventory/add', payload);
      
      setProductId('');
      setQuantity('');
      // Unique class added here:
      setMessage('Stock Updated Successfully!'); 
      
      onStockUpdated(); 
      
      // Clear success message after 3 seconds
      setTimeout(() => setMessage(null), 3000); 

    } catch (err) {
      setIsError(true);
      if (err.code === 'ERR_NETWORK') {
        setMessage('Error: Could not connect to the backend (Port 8082).');
      } else {
        setMessage('Update failed. Check Product ID and server logs.');
      }
      console.error("Update Error:", err);
    }
    setSubmitting(false);
  };

  return (
    <div className="form-container">
      <h3>Add / Update Stock</h3>
      <p>Enter a Product ID and the new quantity.</p>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="productId">Product ID:</label>
          <input
            id="productId"
            type="number"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
            placeholder="e.g., 1"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="quantity">New Quantity:</label>
          <input
            id="quantity"
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="e.g., 100"
            required
          />
        </div>
        
        {/* The message will render inside a fixed container */}
        <button type="submit" className="submit-btn" disabled={submitting}>
          {submitting ? 'Saving...' : 'Save Stock'}
        </button>
      </form>
      
      {/* This message element will be styled as a popup/toast */}
      {message && <div className={`popup-toast ${isError ? 'error-toast' : 'success-toast'}`}>{message}</div>}
      
    </div>
  );
}

export default StockUpdateForm;