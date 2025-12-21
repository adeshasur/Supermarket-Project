import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Home, ShoppingCart, User, LogOut } from 'lucide-react';
import { CartContext } from '../context/CartContext';
import '../Styles/CustomerSidebar.css';

function CustomerSidebar() {
  const navigate = useNavigate();
  const { cartItems } = useContext(CartContext);

  const getCartCount = () => {
    return cartItems.reduce((sum, item) => sum + item.quantity, 0);
  };

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.removeItem("customer");
      navigate("/");
    }
  };

  // Get customer name from localStorage
  const customer = JSON.parse(localStorage.getItem("customer") || "{}");
  const customerName = customer.name || "Customer";

  return (
    <nav className="customer-sidebar">
      <div className="sidebar-header">
        <span className="logo-dot"></span>
        FreshMart
      </div>

      {/* Customer Info */}
      <div className="customer-info">
        <div className="customer-avatar">
          <User size={24} />
        </div>
        <div className="customer-name">{customerName}</div>
      </div>

      <ul className="sidebar-menu">
        <li>
          <NavLink to="/customer-home">
            <Home size={20} />
            <span>Home</span>
          </NavLink>
        </li>

        <li>
          <NavLink to="/customer-cart">
            <ShoppingCart size={20} />
            <span>Cart</span>
            {getCartCount() > 0 && (
              <span className="cart-badge">{getCartCount()}</span>
            )}
          </NavLink>
        </li>

        <li>
          <NavLink to="/customer-profile">
            <User size={20} />
            <span>Profile</span>
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

export default CustomerSidebar;
