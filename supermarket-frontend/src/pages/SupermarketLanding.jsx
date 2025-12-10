import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, Clock, MapPin, Phone, Mail, Truck, CreditCard, Shield, ChevronRight, Facebook, Instagram, Twitter } from 'lucide-react';
import '../styles/SupermarketLanding.css';

export default function SupermarketLanding() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/auth');
  };

  const handleAdminLogin = () => {
    navigate('/admin-login');
  };

  return (
    <div className="landing-page">
      {/* Header/Navigation */}
      <header className="header">
        <div className="header-container">
          <div className="logo">
            <ShoppingCart className="logo-icon" />
            <h1 className="logo-text">FreshMart</h1>
          </div>
          <nav className="nav-menu">
            <a href="#home" className="nav-link">Home</a>
            <a href="#services" className="nav-link">Services</a>
            <a href="#about" className="nav-link">About Us</a>
            <a href="#contact" className="nav-link">Contact</a>
          </nav>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button onClick={handleGetStarted} className="login-btn">
              Customer Login
            </button>
            <button onClick={handleAdminLogin} className="login-btn" style={{ background: '#7c3aed' }}>
              Admin Login
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="hero-section">
        <div className="hero-container">
          <div className="hero-content">
            <h2 className="hero-title">
              Fresh Groceries<br />
              <span className="hero-highlight">Delivered to Your Door</span>
            </h2>
            <p className="hero-description">
              Shop from the comfort of your home. We deliver quality products across Sri Lanka with the freshest produce from local farms.
            </p>
            <button onClick={handleGetStarted} className="hero-btn">
              <span>Continue to Shop</span>
              <ChevronRight className="btn-icon" />
            </button>
          </div>
          <div className="hero-image">
            <img
              src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&h=400&fit=crop"
              alt="Fresh Groceries"
              className="hero-img"
            />
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="services-section">
        <div className="section-container">
          <h2 className="section-title">Our Services</h2>
          <p className="section-subtitle">Why choose FreshMart?</p>
          
          <div className="services-grid">
            <div className="service-card service-card-green">
              <Truck className="service-icon" />
              <h3 className="service-title">Island-wide Delivery</h3>
              <p className="service-description">
                Free delivery for orders above Rs. 5,000 across Colombo, Gampaha, and Kalutara districts.
              </p>
            </div>

            <div className="service-card service-card-blue">
              <Clock className="service-icon" />
              <h3 className="service-title">Same Day Delivery</h3>
              <p className="service-description">
                Order before 2 PM and get your groceries delivered the same day in Colombo metro area.
              </p>
            </div>

            <div className="service-card service-card-purple">
              <Shield className="service-icon" />
              <h3 className="service-title">Quality Guaranteed</h3>
              <p className="service-description">
                Fresh produce from local farms. Not satisfied? We offer full refund within 24 hours.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="about-section">
        <div className="section-container">
          <div className="about-container">
            <div className="about-image">
              <img
                src="https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=600&h=400&fit=crop"
                alt="About FreshMart"
                className="about-img"
              />
            </div>
            <div className="about-content">
              <h2 className="about-title">About FreshMart</h2>
              <p className="about-text">
                Founded in 2020 in Colombo, FreshMart has grown to become one of Sri Lanka's most trusted online supermarkets. We partner with over 200 local farmers and suppliers across the island to bring you the freshest produce at competitive prices.
              </p>
              <p className="about-text">
                Our mission is to make grocery shopping convenient and accessible for every Sri Lankan family. From fresh vegetables from Nuwara Eliya to spices from Matale, we source the best products from across the country.
              </p>
              <p className="about-text">
                With over 50,000 satisfied customers and growing, FreshMart is committed to supporting local agriculture while providing excellent service to our community.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Payment Methods */}
      <section className="payment-section">
        <div className="section-container">
          <h3 className="payment-title">Secure Payment Options</h3>
          <div className="payment-methods">
            <div className="payment-item">
              <CreditCard className="payment-icon" />
              <span className="payment-text">Credit/Debit Cards</span>
            </div>
            <div className="payment-text">Visa | Mastercard</div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact-section">
        <div className="section-container">
          <h2 className="contact-title">Contact Us</h2>
          
          <div className="contact-grid">
            <div className="contact-card">
              <MapPin className="contact-icon" />
              <h3 className="contact-heading">Visit Us</h3>
              <p className="contact-text">
                123 Galle Road,<br />
                Colombo 03,<br />
                Sri Lanka
              </p>
            </div>

            <div className="contact-card">
              <Phone className="contact-icon" />
              <h3 className="contact-heading">Call Us</h3>
              <p className="contact-text">
                +94 11 234 5678<br />
                +94 77 123 4567<br />
                24/7 Customer Support
              </p>
            </div>

            <div className="contact-card">
              <Mail className="contact-icon" />
              <h3 className="contact-heading">Email Us</h3>
              <p className="contact-text">
                info@freshmart.lk<br />
                support@freshmart.lk<br />
                Response within 2 hours
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-grid">
            <div className="footer-column">
              <div className="footer-logo">
                <ShoppingCart className="footer-logo-icon" />
                <h3 className="footer-logo-text">FreshMart</h3>
              </div>
              <p className="footer-description">
                Your trusted online supermarket in Sri Lanka. Fresh, fast, and reliable.
              </p>
            </div>

            <div className="footer-column">
              <h4 className="footer-heading">Quick Links</h4>
              <ul className="footer-links">
                <li><a href="#home" className="footer-link">Home</a></li>
                <li><a href="#services" className="footer-link">Services</a></li>
                <li><a href="#about" className="footer-link">About Us</a></li>
                <li><a href="#contact" className="footer-link">Contact</a></li>
              </ul>
            </div>

            <div className="footer-column">
              <h4 className="footer-heading">Follow Us</h4>
              <div className="social-links">
                <a href="#" className="social-link">
                  <Facebook className="social-icon" />
                </a>
                <a href="#" className="social-link">
                  <Instagram className="social-icon" />
                </a>
                <a href="#" className="social-link">
                  <Twitter className="social-icon" />
                </a>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <p>&copy; 2024 FreshMart. All rights reserved. | Proudly serving Sri Lanka</p>
          </div>
        </div>
      </footer>
    </div>
  );
}