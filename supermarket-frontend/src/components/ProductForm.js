import React, { useState } from 'react';
import axios from 'axios'; 
import API_BASE_URLS from '../config/api';
import '../styles/FormStyles.css';

function ProductForm({ onProductAdded }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState(''); // Image URL state
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState(null);
  const [isError, setIsError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage(null);
    setIsError(false);

    // Trim inputs
    const trimmedName = name.trim();
    const trimmedDescription = description.trim();
    const trimmedImageUrl = imageUrl.trim();
    const parsedPrice = parseFloat(price);

    // Frontend validation
    if (!trimmedName || !trimmedDescription || isNaN(parsedPrice) || parsedPrice <= 0) {
      setIsError(true);
      setMessage("Please fill all fields correctly. Price must be positive.");
      setSubmitting(false);
      return;
    }

    const productData = {
      name: trimmedName,
      description: trimmedDescription,
      price: parsedPrice,
      imageUrl: trimmedImageUrl
    };

    try {
      await axios.post(`${API_BASE_URLS.PRODUCTS}/api/products`, productData);

      setMessage('Product Added Successfully!');
      setName('');
      setDescription('');
      setPrice('');
      setImageUrl('');

      if (onProductAdded) onProductAdded();

      setTimeout(() => setMessage(null), 3000);

    } catch (err) {
      setIsError(true);
      console.error("Add Product Error:", err);

      if (err.response && err.response.data) {
        setMessage(`Failed: ${err.response.data}`);
      } else if (err.code === 'ERR_NETWORK') {
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

        {/* Image URL */}
        <div className="form-group">
          <label>Image URL:</label>
          <input
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="Enter image URL"
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
