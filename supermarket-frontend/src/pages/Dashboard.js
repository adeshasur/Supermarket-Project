import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Dashboard() {
  // --- 1. Data States (Backend එකෙන් එන දත්ත) ---
  const [stats, setStats] = useState({
    income: 0,
    orders: 0,
    users: 0,
    lowStock: 0
  });

  const [loading, setLoading] = useState(true);

  // --- Date Logic (අද දිනය) ---
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // --- 2. Data Fetching Logic (FIXED) ---
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // A. Orders Service (Port 8084)
        const ordersRes = await axios.get('http://localhost:8084/api/orders');
        const allOrders = ordersRes.data;
        
        // Income ගණනයට SUCCESSFUL Payment වූ Orders පමණක් ගන්නවා
        const successfulOrders = allOrders.filter(order => order.paymentStatus === 'SUCCESS');
        
        const totalIncome = successfulOrders.reduce((sum, order) => sum + (order.totalAmount || 0), 0);

        // B. Inventory Service (Port 8082) for Low Stock Count
        // Product Service වෙනුවට Inventory Service එකෙන් Stock ගන්නවා
        const inventoryRes = await axios.get('http://localhost:8082/api/inventory'); 
        const inventoryItems = inventoryRes.data;
        
        // Stock 20ට අඩු Items ගණන් කරනවා
        const lowStockCount = inventoryItems.filter(item => (item.quantity || 0) < 20).length;

        // C. User Service (Port 8083)
        const usersRes = await axios.get('http://localhost:8083/api/customers');
        const userCount = usersRes.data.length;

        setStats({
          income: totalIncome,
          orders: allOrders.length,
          lowStock: lowStockCount,
          users: userCount
        });

      } catch (error) {
        console.error("Dashboard Data Loading Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // --- Styles Objects (Dark Mode Compatible) ---
  const statCardStyle = {
    background: 'var(--card-bg)', 
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 10px rgba(0,0,0,0.05)',
    flex: 1,
    minWidth: '200px',
    textAlign: 'center',
    color: 'var(--text-color)' 
  };

  return (
    <div>
      <h1 className="page-title" style={{ marginBottom: '5px' }}>Dashboard Overview</h1>
      
      <p style={{ marginTop: '0', marginBottom: '30px', color: 'var(--text-color)', opacity: 0.7, fontSize: '0.95rem' }}>
        📅 {currentDate} &nbsp;|&nbsp; Here is what's happening with your store today.
      </p>

      {/* ================= STATS CARDS SECTION (Dynamic Data) ================= */}
      <div style={{ display: 'flex', gap: '20px', marginBottom: '40px', flexWrap: 'wrap' }}>

        {/* Total Income */}
        <div style={{ ...statCardStyle, borderTop: '4px solid #28a745' }}>
          <h3 style={{ margin: 0, color: 'var(--text-color)', fontSize: '0.9rem', opacity: 0.8 }}>Total Income</h3>
          <h2 style={{ margin: '10px 0', fontSize: '2rem', color: '#28a745' }}>
            Rs. {loading ? '...' : stats.income.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </h2>
        </div>

        {/* Total Orders */}
        <div style={{ ...statCardStyle, borderTop: '4px solid #007aff' }}>
          <h3 style={{ margin: 0, color: 'var(--text-color)', fontSize: '0.9rem', opacity: 0.8 }}>Total Orders</h3>
          <h2 style={{ margin: '10px 0', fontSize: '2rem', color: '#007aff' }}>
            {loading ? '...' : stats.orders}
          </h2>
        </div>

        {/* Low Stock Items */}
        <div style={{ ...statCardStyle, borderTop: '4px solid #dc3545' }}>
          <h3 style={{ margin: 0, color: 'var(--text-color)', fontSize: '0.9rem', opacity: 0.8 }}>Low Stock Items</h3>
          <h2 style={{ margin: '10px 0', fontSize: '2rem', color: '#dc3545' }}>
            {loading ? '...' : stats.lowStock}
          </h2>
        </div>

        {/* Active Users */}
        <div style={{ ...statCardStyle, borderTop: '4px solid #ffc107' }}>
          <h3 style={{ margin: 0, color: 'var(--text-color)', fontSize: '0.9rem', opacity: 0.8 }}>Active Users</h3>
          <h2 style={{ margin: '10px 0', fontSize: '2rem', color: '#ffc107' }}>
            {loading ? '...' : stats.users}
          </h2>
        </div>

      </div>

      {/* ================= NAVIGATION CARDS (Quick Access Links Fixed) ================= */}
      <h3 style={{ marginBottom: '20px', color: 'var(--text-color)' }}>Quick Access</h3>
      <div className="dashboard-grid">
        {/* ✅ FIX: /admin prefix එක එකතු කළා */}
        <Link to="/admin/products" className="card">
          <h2>📦</h2>
          <h3>Products</h3>
          <p>Manage Catalog</p>
        </Link>
        <Link to="/admin/inventory" className="card">
          <h2>📋</h2>
          <h3>Inventory</h3>
          <p>Update Stock</p>
        </Link>
        <Link to="/admin/orders" className="card">
          <h2>🛒</h2>
          <h3>Orders</h3>
          <p>Process Orders</p>
        </Link>
        <Link to="/admin/users" className="card">
          <h2>👥</h2>
          <h3>Users</h3>
          <p>Customer Details</p>
        </Link>
        <Link to="/admin/payment" className="card">
          <h2>💳</h2>
          <h3>Payments</h3>
          <p>Transactions</p>
        </Link>
      </div>
    </div>
  );
}

export default Dashboard;