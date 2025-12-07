import React from 'react';
import { Link } from 'react-router-dom'; // <--- 1. Link Import kala
import { useCart } from '../context/CartContext'; // <--- 2. Context Import kala

function Header() {
  const { cartItems } = useCart(); // <--- 3. Cart data gaththa

  return (
    <header className="app-header">
      <div className="header-left">
        <h3>👋 Welcome Back, Admin</h3>
      </div>

      <div className="header-right">
        {/* Notifications (Meka static wa thiyagaththa) */}
        <div className="icon-wrapper">
          <span className="icon">🔔</span>
          <span className="badge">3</span>
        </div>
        
        {/* Cart */}
        {/* <--- 4. Meka Link ekak kala click karama cart ekata yanna */}
        <Link to="/cart" className="icon-wrapper" style={{ textDecoration: 'none', color: 'inherit' }}>
          <span className="icon">🛒</span>
          
          {/* <--- 5. Cart eke badu thiyenawanm witharak badge eka pennanawa */}
          {cartItems.length > 0 && (
            <span className="badge">{cartItems.length}</span>
          )}
        </Link>

        {/* Profile */}
        <div className="profile-section">
          <div className="profile-pic">👤</div>
          <span className="profile-name">Manager</span>
        </div>
      </div>
    </header>
  );
}

export default Header;