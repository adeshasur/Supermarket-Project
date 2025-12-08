import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Landing Page + Auth Page
import SupermarketLanding from './pages/SupermarketLanding';
import Login from './pages/Login';

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
import Cart from './pages/Cart';
import Profile from './pages/Profile';
import Settings from './pages/Settings';

// Contexts
import { CartProvider } from './context/CartContext';
import { ThemeProvider } from './context/ThemeContext';

import './styles/App.css';

function App() {
  // ✅ CHANGE IS HERE: We set the default value to 'admin' instead of null.
  // This bypasses the login screen entirely.
  const [userRole, setUserRole] = useState('admin'); 

  return (
    <ThemeProvider>
      <Router>

        <Routes>

          {/* PUBLIC ROUTES */}
          <Route path="/" element={<SupermarketLanding />} />
          <Route path="/auth" element={<Login onLogin={(role) => setUserRole(role)} />} />

          {/* PRIVATE (ADMIN) ROUTES */}
          {userRole && (
            <Route
              path="/*"
              element={
                <CartProvider>
                  <div className="app-container">
                    <Sidebar />
                    <main className="page-content">
                      <Header />
                      <div className="content-wrapper">
                        <Routes>
                          {/* Redirect root to dashboard */}
                          <Route path="/" element={<Navigate to="/dashboard" />} />
                          
                          <Route path="/dashboard" element={<Dashboard />} />
                          <Route path="/products" element={<Products />} />
                          <Route path="/inventory" element={<Inventory />} />
                          <Route path="/orders" element={<Orders />} />
                          <Route path="/users" element={<Users />} />
                          <Route path="/payment" element={<Payment />} />
                          <Route path="/cart" element={<Cart />} />
                          <Route path="/profile" element={<Profile />} />
                          <Route path="/settings" element={<Settings />} />

                          {/* Invalid URL -> go to dashboard */}
                          <Route path="*" element={<Navigate to="/dashboard" />} />
                        </Routes>
                      </div>
                      <Footer />
                    </main>
                  </div>
                </CartProvider>
              }
            />
          )}

          {/* If for some reason userRole becomes null, redirect to auth */}
          {!userRole && (
            <Route path="/dashboard/*" element={<Navigate to="/auth" />} />
          )}

        </Routes>

      </Router>
    </ThemeProvider>
  );
}

export default App;