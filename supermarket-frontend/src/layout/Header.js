// Header.js (Final Fixed Version)

import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNotifications } from '../context/NotificationProvider';

// Custom Hook to handle clicks outside the element to close the dropdown
const useOutsideAlerter = (ref, setOpen) => {
    useEffect(() => {
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                setOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref, setOpen]);
};

// Helper function to stop the click from propagating (used on dropdown content)
const stopPropagation = (e) => e.stopPropagation();


function Header({ onLogout }) {
    const { notifications } = useNotifications(); 

    const [showProfile, setShowProfile] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);

    const profileRef = useRef(null);
    useOutsideAlerter(profileRef, setShowProfile);
    
    const notificationRef = useRef(null);
    useOutsideAlerter(notificationRef, setShowNotifications);


    // Handles the click on the Logout button
    const handleLogoutAction = (e) => {
        e.stopPropagation(); 
        
        // This is where the working function (passed from AdminLayout) is called
        if (onLogout) {
            onLogout(); 
        }
        setShowProfile(false); // Close the dropdown menu
    };

    return (
        <header className="app-header">
            <div className="header-left">
                <h3 style={{ margin: 0, color: '#333' }}>👋 Welcome Back, Admin</h3>
            </div>

            <div className="header-right">

                {/* NOTIFICATIONS SECTION */}
                <div 
                    className="icon-wrapper" 
                    style={{ position: 'relative', cursor: 'pointer' }}
                    ref={notificationRef} 
                >
                    <span className="icon" onClick={() => setShowNotifications(!showNotifications)}>🔔</span>
                    {notifications.length > 0 && <span className="badge">{notifications.length}</span>}

                    {showNotifications && (
                        <div 
                            onClick={stopPropagation} 
                            style={{
                                position: 'absolute', top: '45px', right: '-50px', width: '280px', background: 'white', borderRadius: '8px', boxShadow: '0 5px 15px rgba(0,0,0,0.2)', zIndex: 1000, border: '1px solid #eee', padding: '0'
                            }}
                        >
                            {/* ... (Notification content) ... */}
                        </div>
                    )}
                </div>

                {/* PROFILE SECTION */}
                <div 
                    style={{ position: 'relative' }}
                    ref={profileRef} 
                >
                    {/* Clickable element to TOGGLE the dropdown */}
                    <div 
                        className="profile-section" 
                        onClick={() => setShowProfile(!showProfile)} // Toggle handler
                        style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px' }}
                    >
                        <div className="profile-pic">👤</div>
                        <span className="profile-name">Manager</span>
                    </div>

                    {showProfile && (
                        <div 
                            // 🌟 CRITICAL FIX: Stops clicks inside the menu from reaching the toggle element.
                            onClick={stopPropagation}
                            style={{
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
                            }}
                        >
                            <div style={{ borderBottom: '1px solid #eee', paddingBottom: '10px', marginBottom: '10px' }}>
                                <strong style={{ display: 'block' }}>System Admin</strong>
                                <span style={{ fontSize: '12px', color: '#888' }}>admin@shop.com</span>
                            </div>

                            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                                <li style={{ padding: '8px 0' }}>
                                    <Link to="/admin/profile" style={{ textDecoration: 'none', color: '#555', display: 'block', fontSize: '14px' }}>
                                        👤 My Profile
                                    </Link>
                                </li>
                                <li style={{ padding: '8px 0' }}>
                                    <Link to="/admin/settings" style={{ textDecoration: 'none', color: '#555', display: 'block', fontSize: '14px' }}>
                                        ⚙️ Settings
                                    </Link>
                                </li>
                            </ul>

                            {/* LOGOUT BUTTON */}
                            <button 
                                onClick={handleLogoutAction} 
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