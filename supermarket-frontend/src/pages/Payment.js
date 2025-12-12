import React, { useState } from 'react';
import PaymentList from '../components/PaymentList';
import '../styles/App.css'; // make sure to keep styles if needed

function Payment() {
  const [refreshKey, setRefreshKey] = useState(0);
  const [inputTerm, setInputTerm] = useState('');
  const [finalSearchTerm, setFinalSearchTerm] = useState('');

  const handleSearchClick = () => {
    setFinalSearchTerm(inputTerm);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearchClick();
    }
  };

  return (
    <div className="inventory-page">
      <h1 className="page-title">Payment Management</h1>

      {/* Search Bar */}
      <div className="inventory-search-group">
        <input
          type="number"
          placeholder="Search by Order ID..."
          className="inventory-search-input"
          value={inputTerm}
          onChange={(e) => setInputTerm(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button className="search-btn" onClick={handleSearchClick}>
          Search
        </button>
      </div>

      {/* List Section */}
      <div className="inventory-content">
        <div className="inventory-list-section">
          <PaymentList
            refreshKey={refreshKey}
            searchTerm={finalSearchTerm}
          />
        </div>
      </div>
    </div>
  );
}

export default Payment;
