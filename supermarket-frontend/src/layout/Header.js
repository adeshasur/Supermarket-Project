import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function Header() {
  const { cartItems } = useCart();
  
  // Dropdown eka palanaya karana State eka
  const [showProfile, setShowProfile] = useState(false);

  // Dropdown Toggle Function
  const toggleProfile = () => {
    setShowProfile(!showProfile);
  };

  return (
    <header className="app-header">
      <div className="header-left">
        <h3>👋 Welcome Back, Admin</h3>
      </div>

      <div className="header-right">
        {/* Notifications */}
        <div className="icon-wrapper">
          <span className="icon">🔔</span>
          <span className="badge">3</span>
        </div>
        
        {/* Cart */}
        <Link to="/cart" className="icon-wrapper" style={{ textDecoration: 'none', color: 'inherit' }}>
          <span className="icon">🛒</span>
          {cartItems.length > 0 && (
            <span className="badge">{cartItems.length}</span>
          )}
        </Link>

        {/* Profile Section (Dropdown Logic Added) */}
        <div 
          className="profile-section" 
          onClick={toggleProfile} // Click event eka methana
          style={{ 
            cursor: 'pointer', 
            position: 'relative', // Dropdown eka hariyata thana ganna meka one
            display: 'flex', 
            alignItems: 'center', 
            gap: '10px' 
          }}
        >
          <div className="profile-pic">👤</div>
          <span className="profile-name">Manager</span>

          {/* --- DROPDOWN MENU START --- */}
          {showProfile && (
            <div style={{
                position: 'absolute',
                top: '50px', // Header eken pahalata
                right: '0',
                width: '200px',
                backgroundColor: 'white',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                borderRadius: '8px',
                padding: '15px',
                zIndex: 9999, // Anith ewata wada uding thiyaganna
                border: '1px solid #eee',
                color: '#333',
                textAlign: 'left'
            }}>
                {/* User Info inside Dropdown */}
                <div style={{ borderBottom: '1px solid #eee', paddingBottom: '10px', marginBottom: '10px' }}>
                    <strong style={{ display: 'block' }}>System Admin</strong>
                    <span style={{ fontSize: '12px', color: '#888' }}>admin@shop.com</span>
                </div>

                {/* --- MENU ITEMS LINKED --- */}
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    
                    {/* My Profile Link */}
                    <li style={{ padding: '8px 0' }}>
                        <Link 
                            to="/profile" 
                            style={{ textDecoration: 'none', color: '#555', display: 'block', fontSize: '14px' }}
                        >
                            👤 My Profile
                        </Link>
                    </li>

                    {/* Settings Link */}
                    <li style={{ padding: '8px 0' }}>
                        <Link 
                            to="/settings" 
                            style={{ textDecoration: 'none', color: '#555', display: 'block', fontSize: '14px' }}
                        >
                            ⚙️ Settings
                        </Link>
                    </li>
                    
                </ul>
                {/* ------------------------- */}

                {/* Logout Button */}
                <button 
                    onClick={(e) => {
                        e.stopPropagation(); // Dropdown eka wahenne nathi wenna (optional)
                        alert("Logging out...");
                    }}
                    style={{
                        width: '100%',
                        marginTop: '10px',
                        padding: '8px',
                        background: '#ffe5e7',
                        color: '#d63384',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontWeight: 'bold'
                    }}
                >
                    Logout
                </button>
            </div>
          )}
          {/* --- DROPDOWN MENU END --- */}

        </div>
      </div>
    </header>
  );
}

export default Header;