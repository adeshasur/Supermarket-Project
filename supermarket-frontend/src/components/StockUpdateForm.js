import React, { useState } from 'react';
import axios from 'axios';
import API_BASE_URLS from '../config/api'; 
import '../styles/FormStyles.css';

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
      // URL: http://localhost:8082/inventory/update
      await axios.put(`${API_BASE_URLS.INVENTORY}/inventory/update`, payload);
      
      setProductId('');
      setQuantity('');
      setMessage('Stock Updated Successfully!'); 
      setIsError(false);
      
      // List eka refresh karanna signal eka
      if (onStockUpdated) onStockUpdated(); 
      
      setTimeout(() => setMessage(null), 3000); 

    } catch (err) {
      setIsError(true);
      console.error("Update Error:", err);
      setMessage('Update failed. Check Product ID.');
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
        
        <button type="submit" className="submit-btn" disabled={submitting}>
          {submitting ? 'Saving...' : 'Update Stock'}
        </button>
      </form>
      
      {message && <div className={`popup-toast ${isError ? 'error-toast' : 'success-toast'}`}>{message}</div>}
      
    </div>
  );
}

export default StockUpdateForm;