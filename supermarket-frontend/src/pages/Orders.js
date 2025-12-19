import React, { useState } from 'react';
import OrderList from '../components/OrderList';
import '../Styles/App.css';

function Orders() {
  const [refreshKey, setRefreshKey] = useState(0);
  const [inputTerm, setInputTerm] = useState('');
  const [finalSearchTerm, setFinalSearchTerm] = useState('');

  const handleOrderUpdate = () => {
    setRefreshKey(prev => prev + 1);
  };

  const handleSearchClick = () => {
    // Ensure only numeric input is searched for Order ID lookup
    const numericTerm = inputTerm.trim();
    if (numericTerm === '' || !isNaN(Number(numericTerm))) {
      setFinalSearchTerm(numericTerm);
    } else {
      alert("Please enter a valid numeric Order ID for search.");
      setFinalSearchTerm(''); // Clear previous search if invalid input
    }
  };

  const handleClearSearch = () => {
    setInputTerm('');
    setFinalSearchTerm('');
  };

  return (
    <div className="inventory-page">
      <h1 className="page-title">Customer Orders Management</h1>

      {/* Search Bar - CHANGED PLACEHOLDER */}
      <div className="inventory-search-group">
        <input
          type="text"
          placeholder="Search by Order ID..." // <--- CHANGED TEXT
          className="inventory-search-input"
          value={inputTerm}
          onChange={(e) => setInputTerm(e.target.value)}
        />
        <button className="search-btn" onClick={handleSearchClick}>
          Search
        </button>
        {finalSearchTerm && (
          <button className="clear-btn" onClick={handleClearSearch}>
            Clear
          </button>
        )}
      </div>

      {/* Orders List */}
      <div className="inventory-content">
        <div className="inventory-list-section">
          <OrderList
            refreshKey={refreshKey}
            searchTerm={finalSearchTerm} // Pass the term down
            onOrderUpdated={handleOrderUpdate} // Ensure this prop is available for re-fetching after delete
          />
        </div>
      </div>
    </div>
  );
}

export default Orders;