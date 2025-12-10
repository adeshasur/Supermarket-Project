import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './Sidebar.css';

function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.removeItem("admin");
      navigate("/admin-login");
    }
  };

  return (
    <nav className="sidebar">
      <div className="sidebar-header">
        <span className="logo-dot"></span>
        Supermarket
      </div>

      <ul className="sidebar-menu">
        <li>
          <NavLink to="/admin/dashboard">
            <span>📊</span> Dashboard
          </NavLink>
        </li>

        <li>
          <NavLink to="/admin/products">
            <span>📦</span> Products
          </NavLink>
        </li>

        <li>
          <NavLink to="/admin/inventory">
            <span>📋</span> Inventory
          </NavLink>
        </li>

        <li>
          <NavLink to="/admin/orders">
            <span>🛒</span> Orders
          </NavLink>
        </li>

        <li>
          <NavLink to="/admin/users">
            <span>👥</span> Users
          </NavLink>
        </li>

        <li>
          <NavLink to="/admin/payment">
            <span>💳</span> Payment
          </NavLink>
        </li>
      </ul>

      <button className="logout-btn" onClick={handleLogout}>
        <span>🚪</span> Logout
      </button>
    </nav>
  );
}

export default Sidebar;
