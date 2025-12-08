import React, { useState } from 'react';
import InventoryList from '../components/InventoryList';
import StockUpdateForm from '../components/StockUpdateForm';
import '../styles/App.css'; // Global Styles

function Inventory() {
  const [refreshKey, setRefreshKey] = useState(0); 
  const [inputTerm, setInputTerm] = useState('');
  const [finalSearchTerm, setFinalSearchTerm] = useState('');

  // Form eken update ekak unama list eka auto refresh karanna
  const handleStockUpdate = () => {
    setRefreshKey(oldKey => oldKey + 1);
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
      <h1 className="page-title">Inventory Management</h1>
      
      {/* Search Bar */}
      <div className="inventory-search-group">
        <input 
          type="text" 
          placeholder="Search by Product Name..." 
          className="inventory-search-input"
          value={inputTerm}
          onChange={(e) => setInputTerm(e.target.value)}
        />
        <button 
            className="search-btn" 
            onClick={handleSearchClick}
        >
            Search
        </button>
        {finalSearchTerm && (
            <button 
                className="clear-btn"
                onClick={handleClearSearch}
            >
                Clear
            </button>
        )}
      </div>
      
      {/* Split Layout: Form Left, List Right */}
      <div className="inventory-content">
        
        {/* Left Side: Form */}
        <div className="inventory-form-section">
          <StockUpdateForm onStockUpdated={handleStockUpdate} />
        </div>
        
        {/* Right Side: List */}
        <div className="inventory-list-section">
          <InventoryList 
            refreshKey={refreshKey} 
            searchTerm={finalSearchTerm} 
          />
        </div>
      </div>
    </div>
  );
}

export default Inventory;