import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Package, Warehouse, ShoppingBag, Users, CreditCard, LogOut } from 'lucide-react';
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
        FreshMart Admin
      </div>

      <ul className="sidebar-menu">
        <li>
          <NavLink to="/admin/dashboard">
            <LayoutDashboard size={20} />
            <span>Dashboard</span>
          </NavLink>
        </li>

        <li>
          <NavLink to="/admin/products">
            <Package size={20} />
            <span>Products</span>
          </NavLink>
        </li>

        <li>
          <NavLink to="/admin/inventory">
            <Warehouse size={20} />
            <span>Inventory</span>
          </NavLink>
        </li>

        <li>
          <NavLink to="/admin/orders">
            <ShoppingBag size={20} />
            <span>Orders</span>
          </NavLink>
        </li>

        <li>
          <NavLink to="/admin/users">
            <Users size={20} />
            <span>Users</span>
          </NavLink>
        </li>

        <li>
          <NavLink to="/admin/payment">
            <CreditCard size={20} />
            <span>Payment</span>
          </NavLink>
        </li>
      </ul>

      <button className="logout-btn" onClick={handleLogout}>
        <LogOut size={18} />
        Logout
      </button>
    </nav>
  );
}

export default Sidebar;
