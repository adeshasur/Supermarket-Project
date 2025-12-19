import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../Styles/FormStyles.css';

function StockUpdateForm({ onStockUpdated }) {
  const [productId, setProductId] = useState('');
  const [quantity, setQuantity] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState(null);
  const [isError, setIsError] = useState(false);
  const [productList, setProductList] = useState([]); // store all valid product IDs

  // 1️⃣ Fetch all products from Product microservice
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('http://localhost:8081/api/products'); // product microservice
        // Convert IDs to numbers for proper comparison
        const ids = res.data.map(p => Number(p.id));
        setProductList(ids);
      } catch (err) {
        console.error('Failed to fetch products:', err);
      }
    };

    fetchProducts();
  }, []);

  // 2️⃣ Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage(null);
    setIsError(false);

    const id = Number(productId.trim()); // convert input to number
    const qty = Number(quantity.trim());

    // Helper function for quick error display
    const showError = (msg) => {
      setIsError(true);
      setMessage(msg);
      setSubmitting(false);
      setTimeout(() => setMessage(null), 3000);
    };

    // 2a. Validate input
    if (isNaN(id) || isNaN(qty)) {
      showError('Please enter valid numbers.');
      return;
    }

    // ⭐ NEW VALIDATION: Check for negative quantity ⭐
    if (qty < 0) {
      showError('Quantity cannot be a negative number.');
      return;
    }
    // ⭐ END NEW VALIDATION ⭐

    // 2b. Check if product exists
    if (!productList.includes(id)) {
      showError('Invalid Product ID. Cannot update.');
      return;
    }

    // 2c. Send update request to Inventory microservice
    try {
      const res = await axios.put('http://localhost:8082/api/inventory/update', {
        productId: id,
        quantity: qty
      });

      setProductId('');
      setQuantity('');
      setMessage('Stock Updated Successfully!');
      setIsError(false);

      if (onStockUpdated) onStockUpdated(); // refresh inventory list
      setTimeout(() => setMessage(null), 3000);

    } catch (err) {
      setIsError(true);
      console.error('Update Error:', err);

      // Show backend error message if available
      const errorMsg = err.response?.data || 'Update failed. Check Product ID or Connection.';
      setMessage(errorMsg);
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

      {message && (
        <div className={`popup-toast ${isError ? 'error-toast' : 'success-toast'}`}>
          {message}
        </div>
      )}
    </div>
  );
}

export default StockUpdateForm;