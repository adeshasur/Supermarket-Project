import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import SupermarketLanding from "./pages/SupermarketLanding.jsx";
import CustomerAuthForm from "./pages/CustomerAuthForm.jsx";
import AdminLoginForm from "./pages/AdminLoginForm.jsx";
import CustomerHome from './pages/CustomerHome.jsx';


import Sidebar from "./layout/Sidebar";
import Header from "./layout/Header";
import Footer from "./layout/Footer";

import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Inventory from "./pages/Inventory";
import Orders from "./pages/Orders";
import Users from "./pages/Users";
import Payment from "./pages/Payment";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";

import { CartProvider } from "./context/CartContext";
import { ThemeProvider } from "./context/ThemeContext";

import "./styles/App.css";

function App() {
  const [userRole, setUserRole] = useState(null);
  const [checkingAuth, setCheckingAuth] = useState(true);

  // Keep admin logged in after refresh
  useEffect(() => {
    const admin = localStorage.getItem("admin");
    if (admin) {
      setUserRole("admin");
    }
    setCheckingAuth(false);
  }, []);

  if (checkingAuth) {
    return null; // prevent flash redirect before auth loads
  }

  return (
    <ThemeProvider>
      <Router>
        <Routes>

          {/* Public Routes */}
          <Route path="/" element={<SupermarketLanding />} />
          <Route path="/auth" element={<CustomerAuthForm />} />
          <Route path="/customer-home" element={<CustomerHome />} />
          <Route
            path="/admin-login"
            element={<AdminLoginForm onLogin={() => setUserRole("admin")} />}
          />

          {/* Protected Admin Routes */}
          {userRole && (
            <Route
              path="/admin/*"
              element={
                <CartProvider>
                  <div className="app-container">
                    <Sidebar />
                    <main className="page-content">
                      <Header />
                      <div className="content-wrapper">
                        <Routes>
                          <Route path="dashboard" element={<Dashboard />} />
                          <Route path="products" element={<Products />} />
                          <Route path="inventory" element={<Inventory />} />
                          <Route path="orders" element={<Orders />} />
                          <Route path="users" element={<Users />} />
                          <Route path="payment" element={<Payment />} />
                          <Route path="cart" element={<Cart />} />
                          <Route path="profile" element={<Profile />} />
                          <Route path="settings" element={<Settings />} />
                          <Route path="*" element={<Navigate to="/admin/dashboard" />} />
                        </Routes>
                      </div>
                      <Footer />
                    </main>
                  </div>
                </CartProvider>
              }
            />
          )}

          {/* Redirect unauthorized users */}
          {!userRole && (
            <Route path="/admin/*" element={<Navigate to="/admin-login" />} />
          )}

        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
