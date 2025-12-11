import React, { useState } from 'react';
import OrderList from '../components/OrderList';
// import OrderForm from '../components/OrderForm'; // ❌ Create Order Form එක අයින් කළා
import OrderItemForm from '../components/OrderItemForm'; // ✅ Add Item Form එක තියාගත්තා
import '../styles/App.css'; // Styles

function Orders() {
  const [refreshKey, setRefreshKey] = useState(0);
  const [inputTerm, setInputTerm] = useState('');
  const [finalSearchTerm, setFinalSearchTerm] = useState('');
  const [ordersList, setOrdersList] = useState([]); 

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

      {/* ✅ MAIN SPLIT LAYOUT (Form Left | List Right) */}
      <div className="inventory-content">
        {/* --- LEFT COLUMN: Forms --- */}
        <div className="inventory-form-section">

          {/* ❌ REMOVED: Create Order Form */}

          {/* 2. Add Item Form (KEPT) */}
          <OrderItemForm 
            orders={ordersList} 
            onItemAdded={handleOrderUpdate} 
          />

        </div>

        {/* --- RIGHT COLUMN: List --- */}
        <div className="inventory-list-section">
          <OrderList
            refreshKey={refreshKey}
            searchTerm={finalSearchTerm}
            setOrdersForForm={setOrdersList} // List එකෙන් එන Orders Forms වලට යවනවා
          />
        </div>
      </div>
    </div>
  );
}

export default Orders;