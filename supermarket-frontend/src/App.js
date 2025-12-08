import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Layouts & Pages
import Sidebar from './layout/Sidebar';
import Header from './layout/Header';
import Footer from './layout/Footer';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import Inventory from './pages/Inventory';
import Orders from './pages/Orders';
import Users from './pages/Users';
import Payment from './pages/Payment';
import Login from './pages/Login';
import Cart from './pages/Cart';

// Pages Import
import Profile from './pages/Profile';
import Settings from './pages/Settings';

// Context Imports
import { CartProvider } from './context/CartContext';
import { ThemeProvider } from './context/ThemeContext'; // <--- 1. ThemeProvider Import කළා

import './styles/App.css';

function App() {
  // User kenek innawada balanna State eka (null = no user)
  const [userRole, setUserRole] = useState(null);

  return (
    // <--- 2. මුළු App එකම ThemeProvider එකෙන් වට කළා (Wrap)
    <ThemeProvider>
      <Router>
        {/* User kenek nathnam Login Page eka witharak pennanna */}
        {!userRole ? (
          <Login onLogin={(role) => setUserRole(role)} />
        ) : (
          /* User kenek innawa nam Main App eka pennanna */
          
          /* CartProvider eken Main App eka wrap karanna */
          <CartProvider> 
            <div className="app-container">
              <Sidebar />
              <main className="page-content">
                <Header />
                <div className="content-wrapper">
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/inventory" element={<Inventory />} />
                    <Route path="/orders" element={<Orders />} />
                    <Route path="/users" element={<Users />} />
                    <Route path="/payment" element={<Payment />} />
                    <Route path="/cart" element={<Cart />} />
                    
                    {/* අලුත් Routes දෙක */}
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/settings" element={<Settings />} />
                    
                    {/* වැරදි URL එකක් ගැහුවොත් Dashboard එකට යවන්න */}
                    <Route path="*" element={<Navigate to="/" />} />
                  </Routes>
                </div>
                <Footer />
              </main>
            </div>
          </CartProvider>
        )}
      </Router>
    </ThemeProvider>
  );
}

export default App;