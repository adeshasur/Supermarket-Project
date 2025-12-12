import React, { useState } from 'react';
import OrderList from '../components/OrderList';
import '../styles/App.css';

function Orders() {
  const [refreshKey, setRefreshKey] = useState(0);
  const [inputTerm, setInputTerm] = useState('');
  const [finalSearchTerm, setFinalSearchTerm] = useState('');

  const handleOrderUpdate = () => {
    setRefreshKey(prev => prev + 1);
  };

  const handleSearchClick = () => {
    setFinalSearchTerm(inputTerm);
  };

  const handleClearSearch = () => {
    setInputTerm('');
    setFinalSearchTerm('');
  };

  return (
    <div className="inventory-page">
      <h1 className="page-title">Customer Orders Management</h1>

      {/* Search Bar */}
      <div className="inventory-search-group">
        <input 
          type="text" 
          placeholder="Search by Customer ID..." 
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
            searchTerm={finalSearchTerm}
          />
        </div>
      </div>
    </div>
  );
}

export default Orders;
