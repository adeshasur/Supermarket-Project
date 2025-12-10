import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, User, Home, Plus, Minus } from 'lucide-react';
import '../styles/CustomerHome.css';

export default function CustomerHome() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState({});

  // Fetch products from API
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:8082/api/products');
      const data = await response.json();
      setProducts(data);
      setFilteredProducts(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
      setLoading(false);
    }
  };

  // Filter products based on search
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (product.description && product.description.toLowerCase().includes(searchQuery.toLowerCase()))
      );
      setFilteredProducts(filtered);
    }
  }, [searchQuery, products]);

  // Add to cart
  const addToCart = (product) => {
    setCart(prev => ({
      ...prev,
      [product.id]: (prev[product.id] || 0) + 1
    }));
  };

  // Remove from cart
  const removeFromCart = (productId) => {
    setCart(prev => {
      const newCart = { ...prev };
      if (newCart[productId] > 1) {
        newCart[productId]--;
      } else {
        delete newCart[productId];
      }
      return newCart;
    });
  };

  // Get cart count
  const getCartCount = () => {
    return Object.values(cart).reduce((sum, count) => sum + count, 0);
  };

  return (
    <div className="customer-home-page">
      {/* Header with Search */}
      <div className="home-header">
        <div className="home-header-content">
          <h1 className="home-title">FreshMart</h1>
          
          {/* Search Bar */}
          <div className="search-container">
            <Search className="search-icon" />
            <input
              type="text"
              placeholder="Search for products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="products-container">
        {loading ? (
          <div className="loading-message">Loading products...</div>
        ) : filteredProducts.length === 0 ? (
          <div className="empty-message">No products found</div>
        ) : (
          <div className="products-grid">
            {filteredProducts.map(product => (
              <div key={product.id} className="product-card">
                {/* Product Image */}
                <div className="product-image">
                  🛒
                </div>

                {/* Product Info */}
                <div className="product-info">
                  <h3 className="product-name">{product.name}</h3>
                  
                  {product.description && (
                    <p className="product-description">{product.description}</p>
                  )}

                  <div className="product-details">
                    <div>
                      <div className="product-price">
                        Rs. {product.price ? product.price.toFixed(2) : '0.00'}
                      </div>
                      <div className="product-stock">
                        Stock: {product.quantity || 0}
                      </div>
                    </div>
                  </div>

                  {/* Add to Cart Controls */}
                  {cart[product.id] ? (
                    <div className="cart-controls">
                      <button
                        onClick={() => removeFromCart(product.id)}
                        className="cart-btn"
                      >
                        <Minus size={18} />
                      </button>
                      <span className="cart-count">{cart[product.id]}</span>
                      <button
                        onClick={() => addToCart(product)}
                        className="cart-btn"
                      >
                        <Plus size={18} />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => addToCart(product)}
                      className="add-to-cart-btn"
                    >
                      Add to Cart
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <div className="bottom-nav">
        <div className="bottom-nav-content">
          <button
            onClick={() => navigate('/customer-home')}
            className="nav-btn nav-btn-active"
          >
            <Home size={24} />
            <span className="nav-label">Home</span>
          </button>

          <button
            onClick={() => navigate('/customer-cart')}
            className="nav-btn"
          >
            <ShoppingCart size={24} />
            {getCartCount() > 0 && (
              <span className="cart-badge">{getCartCount()}</span>
            )}
            <span className="nav-label">Cart</span>
          </button>

          <button
            onClick={() => navigate('/customer-profile')}
            className="nav-btn"
          >
            <User size={24} />
            <span className="nav-label">Profile</span>
          </button>
        </div>
      </div>
    </div>
  );
}