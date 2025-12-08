import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function Header({ onLogout }) {
  const { cartItems } = useCart();
  
  // Dropdown States
  const [showProfile, setShowProfile] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  // Mock Notifications Data
  const notifications = [
    { id: 1, type: 'alert', message: '⚠️ Apple stock is low (5 items left)' },
    { id: 2, type: 'info', message: '🛒 New Order #105 received' },
    { id: 3, type: 'success', message: '✅ Payment for Order #102 confirmed' }
  ];

  return (
    <header className="app-header">
      
      {/* --- වම් පැත්ත (Left Side) - Date අයින් කළා --- */}
      <div className="header-left">
        <h3 style={{ margin: 0, color: '#333' }}>👋 Welcome Back, Admin</h3>
      </div>

      <div className="header-right">
        
        {/* --- 1. NOTIFICATION BELL SECTION --- */}
        <div 
            className="icon-wrapper" 
            style={{ position: 'relative', cursor: 'pointer' }}
            onClick={() => setShowNotifications(!showNotifications)}
        >
          <span className="icon">🔔</span>
          {notifications.length > 0 && <span className="badge">{notifications.length}</span>}

          {/* Notification Dropdown Box */}
          {showNotifications && (
            <div style={{
                position: 'absolute',
                top: '45px',
                right: '-50px',
                width: '280px',
                background: 'white',
                borderRadius: '8px',
                boxShadow: '0 5px 15px rgba(0,0,0,0.2)',
                zIndex: 1000,
                border: '1px solid #eee',
                padding: '0'
            }}>
                <div style={{ padding: '10px 15px', borderBottom: '1px solid #eee', fontWeight: 'bold', color: '#333' }}>
                    Notifications
                </div>
                <ul style={{ listStyle: 'none', margin: 0, padding: 0, maxHeight: '200px', overflowY: 'auto' }}>
                    {notifications.map(note => (
                        <li key={note.id} style={{ 
                            padding: '10px 15px', 
                            borderBottom: '1px solid #f0f0f0', 
                            fontSize: '0.85rem', 
                            color: '#555',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px'
                        }}>
                           <span style={{ 
                               width: '8px', height: '8px', borderRadius: '50%', 
                               background: note.type === 'alert' ? 'red' : note.type === 'success' ? 'green' : 'blue' 
                           }}></span>
                           {note.message}
                        </li>
                    ))}
                </ul>
                <div style={{ padding: '10px', textAlign: 'center', fontSize: '0.8rem', color: '#007aff', cursor: 'pointer', borderTop: '1px solid #eee' }}>
                    View All
                </div>
            </div>
          )}
        </div>

        {/* --- 3. PROFILE SECTION --- */}
        <div 
          className="profile-section" 
          onClick={() => setShowProfile(!showProfile)}
          style={{ 
            cursor: 'pointer', 
            position: 'relative', 
            display: 'flex', 
            alignItems: 'center', 
            gap: '10px' 
          }}
        >
          <div className="profile-pic">👤</div>
          <span className="profile-name">Manager</span>

          {/* Profile Dropdown Menu */}
          {showProfile && (
            <div style={{
                position: 'absolute',
                top: '50px',
                right: '0',
                width: '200px',
                backgroundColor: 'white',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                borderRadius: '8px',
                padding: '15px',
                zIndex: 9999,
                border: '1px solid #eee',
                color: '#333',
                textAlign: 'left'
            }}>
                <div style={{ borderBottom: '1px solid #eee', paddingBottom: '10px', marginBottom: '10px' }}>
                    <strong style={{ display: 'block' }}>System Admin</strong>
                    <span style={{ fontSize: '12px', color: '#888' }}>admin@shop.com</span>
                </div>

                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    <li style={{ padding: '8px 0' }}>
                        <Link to="/profile" style={{ textDecoration: 'none', color: '#555', display: 'block', fontSize: '14px' }}>
                            👤 My Profile
                        </Link>
                    </li>
                    <li style={{ padding: '8px 0' }}>
                        <Link to="/settings" style={{ textDecoration: 'none', color: '#555', display: 'block', fontSize: '14px' }}>
                            ⚙️ Settings
                        </Link>
                    </li>
                </ul>

                <button 
                    onClick={(e) => {
                        e.stopPropagation(); 
                        if (onLogout) onLogout(); 
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
        </div>
      </div>
    </header>
  );
}

export default Header;