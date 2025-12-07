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

  // --- 2. Data Fetching Logic ---
  useEffect(() => {
    const fetchData = async () => {
      try {
        // A. Orders Service (Port 8084)
        const ordersRes = await axios.get('http://localhost:8084/api/orders');
        const orders = ordersRes.data;
        const totalIncome = orders.reduce((sum, order) => sum + (order.totalAmount || order.amount || 0), 0);

        // B. Product Service (Port 8081)
        const productsRes = await axios.get('http://localhost:8081/products');
        const products = productsRes.data;
        const lowStockCount = products.filter(p => (p.stock || p.quantity || 0) < 20).length;

        // C. User Service (Port 8083)
        const usersRes = await axios.get('http://localhost:8083/api/customers');
        const userCount = usersRes.data.length;

        setStats({
          income: totalIncome,
          orders: orders.length,
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
    background: 'var(--card-bg)', // Dark mode variable
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 10px rgba(0,0,0,0.05)',
    flex: 1,
    minWidth: '200px',
    textAlign: 'center',
    color: 'var(--text-color)' // Text color variable
  };

  return (
    <div>
      <h1 className="page-title" style={{ marginBottom: '5px' }}>Dashboard Overview</h1>
      
      {/* --- මෙතනට දිනය දැම්මා --- */}
      <p style={{ marginTop: '0', marginBottom: '30px', color: 'var(--text-color)', opacity: 0.7, fontSize: '0.95rem' }}>
        📅 {currentDate} &nbsp;|&nbsp; Here is what's happening with your store today.
      </p>

      {/* ================= STATS CARDS SECTION ================= */}
      <div style={{ display: 'flex', gap: '20px', marginBottom: '40px', flexWrap: 'wrap' }}>

        {/* Total Income */}
        <div style={{ ...statCardStyle, borderTop: '4px solid #28a745' }}>
          <h3 style={{ margin: 0, color: 'var(--text-color)', fontSize: '0.9rem', opacity: 0.8 }}>Total Income</h3>
          <h2 style={{ margin: '10px 0', fontSize: '2rem', color: '#28a745' }}>
            Rs. {loading ? '...' : stats.income.toLocaleString()}
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

      {/* ================= NAVIGATION CARDS ================= */}
      <h3 style={{ marginBottom: '20px', color: 'var(--text-color)' }}>Quick Access</h3>
      <div className="dashboard-grid">
        <Link to="/products" className="card">
          <h2>📦</h2>
          <h3>Products</h3>
          <p>Manage Catalog</p>
        </Link>
        <Link to="/inventory" className="card">
          <h2>📋</h2>
          <h3>Inventory</h3>
          <p>Update Stock</p>
        </Link>
        <Link to="/orders" className="card">
          <h2>🛒</h2>
          <h3>Orders</h3>
          <p>Process Orders</p>
        </Link>
        <Link to="/users" className="card">
          <h2>👥</h2>
          <h3>Users</h3>
          <p>Customer Details</p>
        </Link>
        <Link to="/payment" className="card">
          <h2>💳</h2>
          <h3>Payments</h3>
          <p>Transactions</p>
        </Link>
      </div>
    </div>
  );
}

export default Dashboard;