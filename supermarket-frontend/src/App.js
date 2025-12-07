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
import Cart from './pages/Cart'; // <--- 1. Aluth Cart Page eka import kala

// Context
import { CartProvider } from './context/CartContext'; // <--- 2. Cart Context eka import kala

import './styles/App.css';

function App() {
  // User kenek innawada balanna State eka (null = no user)
  const [userRole, setUserRole] = useState(null);

  return (
    <Router>
      {/* User kenek nathnam Login Page eka witharak pennanna */}
      {!userRole ? (
        <Login onLogin={(role) => setUserRole(role)} />
      ) : (
        /* User kenek innawa nam Main App eka pennanna */
        
        /* <--- 3. CartProvider eken Main App eka wrap karanna */
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
                  
                  {/* <--- 4. Cart Route eka add kala */}
                  <Route path="/cart" element={<Cart />} />
                  
                  <Route path="*" element={<Navigate to="/" />} />
                </Routes>
              </div>
              <Footer />
            </main>
          </div>
        </CartProvider>
      )}
    </Router>
  );
}

export default App;