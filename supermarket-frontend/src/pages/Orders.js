import React, { useState } from 'react';
import OrderList from '../components/OrderList';
import '../styles/TableStyles.css';

function Orders() {
  const [refreshKey, setRefreshKey] = useState(0);

  // Refresh Button එකට
  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div className="inventory-page">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1 className="page-title">Customer Orders Management</h1>
        <button 
          onClick={handleRefresh} 
          className="search-btn"
          style={{ backgroundColor: '#6c757d' }}
        >
          Refresh Orders
        </button>
      </div>

      {/* ✅ මෙතන තිබ්බ Form කෑලි ඔක්කොම අයින් කළා. දැන් List එක විතරයි */}
      <div className="inventory-content">
        <div className="inventory-list-section" style={{ width: '100%' }}>
          <OrderList refreshKey={refreshKey} />
        </div>
      </div>
    </div>
  );
}

export default Orders;