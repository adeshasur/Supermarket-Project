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

  // --- 2. UI States (Dropdown Menu එක පාලනය කරන්න) ---
  const [showProfile, setShowProfile] = useState(false);

  // --- 3. Data Fetching Logic (useEffect) ---
  useEffect(() => {
    const fetchData = async () => {
      try {
        // A. Orders Service (Port 8084)
        const ordersRes = await axios.get('http://localhost:8084/api/orders');
        const orders = ordersRes.data;
        // Total Income ගණනය කිරීම
        const totalIncome = orders.reduce((sum, order) => sum + (order.totalAmount || order.amount || 0), 0);

        // B. Product Service (Port 8081)
        const productsRes = await axios.get('http://localhost:8081/products');
        const products = productsRes.data;
        // Low Stock (20 ට අඩු) ගණනය කිරීම
        const lowStockCount = products.filter(p => (p.stock || p.quantity || 0) < 20).length;

        // C. User Service (Port 8083)
        const usersRes = await axios.get('http://localhost:8083/api/customers');
        const userCount = usersRes.data.length;

        // State Update
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

  // Dropdown Toggle Function
  const toggleProfile = () => {
    setShowProfile(!showProfile);
  };

  // --- Styles Objects (CSS) ---
  const statCardStyle = {
    background: 'white',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 10px rgba(0,0,0,0.05)',
    flex: 1,
    minWidth: '200px',
    textAlign: 'center'
  };

  return (
    <div style={{ position: 'relative' }}>
      
      {/* ================= HEADER SECTION ================= */}
      <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          padding: '10px 0', 
          marginBottom: '30px',
          borderBottom: '1px solid #eee'
      }}>
          {/* Left Side: Welcome Message */}
          <div>
            <h1 className="page-title" style={{ margin: 0 }}>Dashboard Overview</h1>
            <p style={{ margin: '5px 0 0 0', color: '#666', fontSize: '0.9rem' }}>
              Welcome back! Here is what's happening with your store today.
            </p>
          </div>

          {/* Right Side: Manager Profile Dropdown */}
          <div 
            className="profile-section" 
            onClick={toggleProfile} 
            style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '15px', position: 'relative' }}
          >
            {/* Notification Icon */}
            <div style={{ fontSize: '1.2rem' }}>🔔</div>
            
            {/* Manager Badge */}
            <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '10px', 
                background: 'white', 
                padding: '8px 15px', 
                borderRadius: '30px', 
                boxShadow: '0 2px 5px rgba(0,0,0,0.1)' 
            }}>
                <img 
                    src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" 
                    alt="User" 
                    style={{ width: '35px', height: '35px', borderRadius: '50%' }}
                />
                <div style={{ textAlign: 'left' }}>
                    <span style={{ display: 'block', fontWeight: 'bold', color: '#333', fontSize: '0.9rem' }}>Admin</span>
                    <span style={{ display: 'block', color: '#888', fontSize: '0.75rem' }}>Manager</span>
                </div>
            </div>

            {/* --- DROPDOWN MENU (Popup) --- */}
            {showProfile && (
                <div style={{
                    position: 'absolute',
                    top: '60px',
                    right: '0',
                    width: '220px',
                    background: 'white',
                    boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
                    borderRadius: '10px',
                    padding: '15px',
                    zIndex: 100,
                    border: '1px solid #f0f0f0'
                }}>
                    <div style={{ textAlign: 'center', marginBottom: '10px' }}>
                         <p style={{ margin: 0, fontWeight: 'bold' }}>System Admin</p>
                         <p style={{ margin: 0, fontSize: '0.8rem', color: '#888' }}>admin@shop.com</p>
                    </div>
                    <hr style={{ border: 'none', borderTop: '1px solid #eee', margin: '10px 0' }}/>
                    
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                        <li style={{ padding: '8px', cursor: 'pointer', color: '#555' }}>👤 My Profile</li>
                        <li style={{ padding: '8px', cursor: 'pointer', color: '#555' }}>⚙️ Settings</li>
                    </ul>

                    <hr style={{ border: 'none', borderTop: '1px solid #eee', margin: '10px 0' }}/>
                    
                    <button 
                        onClick={(e) => {
                            e.stopPropagation(); // Dropdown එක වැසීම වලක්වන්න (Optional)
                            alert("Logging out...");
                        }}
                        style={{
                            width: '100%',
                            padding: '8px',
                            background: '#ffe5e7',
                            color: '#d63384',
                            border: 'none',
                            borderRadius: '5px',
                            fontWeight: 'bold',
                            cursor: 'pointer'
                        }}
                    >
                        Logout
                    </button>
                </div>
            )}
          </div>
      </div>

      {/* ================= STATS CARDS SECTION ================= */}
      <div style={{ display: 'flex', gap: '20px', marginBottom: '40px', flexWrap: 'wrap' }}>

        {/* Total Income */}
        <div style={{ ...statCardStyle, borderTop: '4px solid #28a745' }}>
          <h3 style={{ margin: 0, color: '#666', fontSize: '0.9rem' }}>Total Income</h3>
          <h2 style={{ margin: '10px 0', fontSize: '2rem', color: '#28a745' }}>
            Rs. {loading ? '...' : stats.income.toLocaleString()}
          </h2>
        </div>

        {/* Total Orders */}
        <div style={{ ...statCardStyle, borderTop: '4px solid #007aff' }}>
          <h3 style={{ margin: 0, color: '#666', fontSize: '0.9rem' }}>Total Orders</h3>
          <h2 style={{ margin: '10px 0', fontSize: '2rem', color: '#007aff' }}>
            {loading ? '...' : stats.orders}
          </h2>
        </div>

        {/* Low Stock Items */}
        <div style={{ ...statCardStyle, borderTop: '4px solid #dc3545' }}>
          <h3 style={{ margin: 0, color: '#666', fontSize: '0.9rem' }}>Low Stock Items</h3>
          <h2 style={{ margin: '10px 0', fontSize: '2rem', color: '#dc3545' }}>
            {loading ? '...' : stats.lowStock}
          </h2>
        </div>

        {/* Active Users */}
        <div style={{ ...statCardStyle, borderTop: '4px solid #ffc107' }}>
          <h3 style={{ margin: 0, color: '#666', fontSize: '0.9rem' }}>Active Users</h3>
          <h2 style={{ margin: '10px 0', fontSize: '2rem', color: '#ffc107' }}>
            {loading ? '...' : stats.users}
          </h2>
        </div>

      </div>

      {/* ================= NAVIGATION CARDS ================= */}
      <h3 style={{ marginBottom: '20px', color: '#333' }}>Quick Access</h3>
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