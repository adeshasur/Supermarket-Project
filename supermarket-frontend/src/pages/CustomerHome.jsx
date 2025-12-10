import React, { useState, useEffect, useContext } from 'react'; // ✅ useContext ගත්තා
import { useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, User, Home, Plus, Minus } from 'lucide-react';
import { CartContext } from '../context/CartContext'; // ✅ CartContext එක import කළා
import '../styles/CustomerHome.css';

export default function CustomerHome() {
  const navigate = useNavigate();
  // ✅ Global Cart එකට සම්බන්ධ වුණා
  const { cartItems, addToCart, removeFromCart } = useContext(CartContext);

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  // Products Fetching (Product + Inventory Merge Logic)
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [productRes, inventoryRes] = await Promise.all([
        fetch('http://localhost:8081/api/products'),
        fetch('http://localhost:8082/api/inventory/all')
      ]);

      const productData = await productRes.json();
      const inventoryData = await inventoryRes.json();

      const mergedData = productData.map(product => {
        const stockItem = inventoryData.find(item => item.productId === product.id);
        return {
          ...product,
          quantity: stockItem ? stockItem.quantity : 0
        };
      });

      setProducts(mergedData);
      setFilteredProducts(mergedData);
      setLoading(false);

    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  // Search Logic
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

  // ✅ Helper: Cart එකේ මේ බඩුව කොච්චර තියෙනවද කියලා බලනවා
  const getProductQuantity = (productId) => {
    const item = cartItems.find(item => item.id === productId);
    return item ? item.quantity : 0;
  };

  // ✅ Total items count for badge
  const getCartCount = () => {
    return cartItems.reduce((sum, item) => sum + item.quantity, 0);
  };

  return (
    <div className="customer-home-page">
      {/* Header */}
      <div className="home-header">
        <div className="home-header-content">
          <h1 className="home-title">FreshMart</h1>
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
            {filteredProducts.map(product => {
              const qtyInCart = getProductQuantity(product.id);

              return (
                <div key={product.id} className="product-card">
                  
                  {/* Image */}
                  <div className="product-image">
                    {product.imageUrl ? (
                      <img src={product.imageUrl} alt={product.name} style={{width:'100%', height:'100%', objectFit:'cover'}} />
                    ) : (
                      <div style={{fontSize: '3rem', textAlign: 'center', lineHeight: '150px'}}>🛒</div> 
                    )}
                  </div>

                  {/* Info */}
                  <div className="product-info">
                    <h3 className="product-name">{product.name}</h3>
                    {product.description && (
                      <p className="product-description">{product.description}</p>
                    )}

                    <div className="product-details">
                      <div>
                        <div className="product-price">Rs. {product.price ? product.price.toFixed(2) : '0.00'}</div>
                        <div className="product-stock" style={{ color: product.quantity > 0 ? '#28a745' : '#dc3545' }}>
                          {product.quantity > 0 ? `In Stock: ${product.quantity}` : 'Out of Stock'}
                        </div>
                      </div>
                    </div>

                    {/* Cart Controls */}
                    {qtyInCart > 0 ? (
                      <div className="cart-controls">
                        <button onClick={() => removeFromCart(product.id)} className="cart-btn"><Minus size={18} /></button>
                        <span className="cart-count">{qtyInCart}</span>
                        <button 
                          onClick={() => addToCart(product)} 
                          className="cart-btn"
                          disabled={product.quantity <= qtyInCart}
                        >
                          <Plus size={18} />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => addToCart(product)}
                        className="add-to-cart-btn"
                        disabled={product.quantity === 0}
                        style={{ opacity: product.quantity === 0 ? 0.5 : 1, cursor: product.quantity === 0 ? 'not-allowed' : 'pointer' }}
                      >
                        {product.quantity === 0 ? 'Sold Out' : 'Add to Cart'}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Bottom Nav */}
      <div className="bottom-nav">
        <div className="bottom-nav-content">
          <button onClick={() => navigate('/customer-home')} className="nav-btn nav-btn-active">
            <Home size={24} /><span className="nav-label">Home</span>
          </button>
          <button onClick={() => navigate('/customer-cart')} className="nav-btn">
            <ShoppingCart size={24} />
            {getCartCount() > 0 && <span className="cart-badge">{getCartCount()}</span>}
            <span className="nav-label">Cart</span>
          </button>
          <button onClick={() => navigate('/customer-profile')} className="nav-btn">
            <User size={24} /><span className="nav-label">Profile</span>
          </button>
        </div>
      </div>
    </div>
  );
}