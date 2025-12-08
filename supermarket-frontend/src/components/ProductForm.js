import React, { useState } from 'react';
import axios from 'axios';
import API_BASE_URLS from '../config/api'; // <--- 1. Gateway Config Import kala
import '../styles/FormStyles.css'; // Make sure this CSS file exists

function ProductForm({ onProductAdded }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState(null);
  const [isError, setIsError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage(null);
    setIsError(false);

    // Backend Model eka anuwa data hadanawa
    const productData = {
      name: name,
      description: description,
      price: parseFloat(price),
      imageUrl: "" // Image url danata hiswa yawamu
    };

    try {
      // <--- 2. Gateway URL Update
      // Pattern: Gateway (8080) + Service Prefix (/product) + Controller Path (/api/products)
      // Full URL: http://localhost:8080/product/api/products
      await axios.post(`${API_BASE_URLS.PRODUCTS}/api/products`, productData);

      // Success
      setMessage('Product Added Successfully!');
      setName('');
      setDescription('');
      setPrice('');
      
      // List eka refresh karanna parent component ekata kiyanawa
      if (onProductAdded) onProductAdded();

      // Clear message after 3 seconds
      setTimeout(() => setMessage(null), 3000);

    } catch (err) {
      setIsError(true);
      console.error("Add Product Error:", err);
      
      if (err.code === 'ERR_NETWORK') {
        setMessage('Error: Could not connect to Gateway (Port 8080).');
      } else {
        setMessage('Failed to add product. Please try again.');
      }
    }
    setSubmitting(false);
  };

  return (
    <div className="form-container">
      <h3>Add New Product</h3>
      <form onSubmit={handleSubmit}>
        
        {/* Product Name */}
        <div className="form-group">
          <label>Product Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter product name"
            required
          />
        </div>

        {/* Description */}
        <div className="form-group">
          <label>Description:</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Short description"
            required
          />
        </div>

        {/* Price */}
        <div className="form-group">
          <label>Price (LKR):</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="0.00"
            min="0"
            step="0.01"
            required
          />
        </div>

        <button type="submit" className="submit-btn" disabled={submitting}>
          {submitting ? 'Adding...' : 'Add Product'}
        </button>
      </form>

      {/* Success/Error Message Popup */}
      {message && (
        <div className={`popup-toast ${isError ? 'error-toast' : 'success-toast'}`}>
          {message}
        </div>
      )}
    </div>
  );
}

export default ProductForm;