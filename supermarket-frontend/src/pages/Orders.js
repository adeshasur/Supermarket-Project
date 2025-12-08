import React, { useState } from 'react';
import OrderList from '../components/OrderList';
import OrderForm from '../components/OrderForm';
import OrderItemForm from '../components/OrderItemForm'; // 1. Import New Form


function Orders() {
  const [refreshKey, setRefreshKey] = useState(0);
  const [inputTerm, setInputTerm] = useState('');
  const [finalSearchTerm, setFinalSearchTerm] = useState('');
  const [ordersList, setOrdersList] = useState([]);

  const handleOrderUpdate = () => setRefreshKey(prev => prev + 1);
  const handleSearchClick = () => setFinalSearchTerm(inputTerm);

  return (
    <div className="orders-page">
      <h1>Order Management</h1>

      <div className="search-group">
        <input
          type="number"
          placeholder="Search by Customer ID..."
          value={inputTerm}
          onChange={(e) => setInputTerm(e.target.value)}
        />
        <button onClick={handleSearchClick}>Search</button>
      </div>

      <div className="content">
        <div className="forms-section">
          <OrderForm onOrderUpdate={handleOrderUpdate} />
          <div style={{ height: '20px' }}></div>
          <OrderItemForm orders={ordersList} onItemAdded={handleOrderUpdate} />
        </div>

        <div className="list-section">
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
