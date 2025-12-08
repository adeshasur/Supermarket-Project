import React, { useState } from 'react';
import OrderForm from '../components/OrderForm';
import OrderItemForm from '../components/OrderItemForm';
import OrderList from '../components/OrderList';

function Orders() {
  const [refreshKey, setRefreshKey] = useState(0);
  const [inputTerm, setInputTerm] = useState('');
  const [finalSearchTerm, setFinalSearchTerm] = useState('');
  const [ordersList, setOrdersList] = useState([]); // For dropdown in OrderItemForm

  const handleOrderUpdate = () => setRefreshKey(prev => prev + 1);
  const handleSearchClick = () => setFinalSearchTerm(inputTerm);

  return (
    <div className="inventory-page">
      <h1 className="page-title">Order Management</h1>

      {/* Search Bar */}
      <div className="inventory-search-group">
        <input 
          type="number"
          placeholder="Search by Customer ID..." 
          className="inventory-search-input"
          value={inputTerm}
          onChange={(e) => setInputTerm(e.target.value)}
        />
        <button className="search-btn" onClick={handleSearchClick}>Search</button>
      </div>

      <div className="inventory-content">
        {/* Left: Forms */}
        <div className="inventory-form-section">
          <OrderForm onOrderUpdate={handleOrderUpdate} />
          <div style={{ height: '20px' }}></div>
          <OrderItemForm orders={ordersList} onItemAdded={handleOrderUpdate} />
        </div>

        {/* Right: Orders List */}
        <div className="inventory-list-section">
          <OrderList
            refreshKey={refreshKey}
            searchTerm={finalSearchTerm}
            setOrdersForForm={setOrdersList}
          />
        </div>
      </div>
    </div>
  );
}

export default Orders;
