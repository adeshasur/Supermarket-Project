import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { Trash2, ArrowLeft, ShoppingBag } from 'lucide-react';
import CustomerSidebar from '../components/CustomerSidebar';

export default function CustomerCart() {
  const navigate = useNavigate();
  const { cartItems, removeFromCart } = useContext(CartContext);

  const totalAmount = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleCheckout = () => {
    if (cartItems.length === 0) return;
    navigate('/payment', { state: { total: totalAmount } });
  };

  return (
    <>
      <CustomerSidebar />
      <div style={{
        padding: '20px',
        maxWidth: '600px',
        margin: '0 auto',
        minHeight: '100vh'
      }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
          <button onClick={() => navigate('/customer-home')} style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            marginRight: '10px',
            color: '#16a34a',
            fontSize: '1rem'
          }}>
            <ArrowLeft size={24} />
          </button>
          <h2 style={{ margin: 0, fontSize: '1.75rem', fontWeight: '700' }}>Cart</h2>
        </div>

        {cartItems.length === 0 ? (
          <div style={{
            background: 'white',
            borderRadius: '12px',
            padding: '60px 24px',
            textAlign: 'center',
            boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
          }}>
            <div style={{ fontSize: '4rem', marginBottom: '16px' }}>🛒</div>
            <h3 style={{ margin: '0 0 12px 0', fontSize: '1.3rem', fontWeight: '600' }}>Your cart is empty</h3>
            <p style={{ color: '#8e8e93', fontSize: '1rem', marginBottom: '24px' }}>Add some items to get started</p>
            <button
              onClick={() => navigate('/customer-home')}
              style={{
                padding: '14px 32px',
                background: '#16a34a',
                color: 'white',
                border: 'none',
                borderRadius: '10px',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer',
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
              }}
            >
              Browse Products
            </button>
          </div>
        ) : (
          <>
            {/* Cart Items - iOS Card Style */}
            <div style={{
              background: 'white',
              borderRadius: '12px',
              overflow: 'hidden',
              marginBottom: '20px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
            }}>
              {cartItems.map((item, index) => (
                <div key={item.id} style={{
                  padding: '16px',
                  borderBottom: index < cartItems.length - 1 ? '1px solid #e5e5ea' : 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px'
                }}>
                  {/* Product Image */}
                  {item.imageUrl && (
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      style={{
                        width: '60px',
                        height: '60px',
                        objectFit: 'cover',
                        borderRadius: '8px'
                      }}
                    />
                  )}

                  {/* Product Info */}
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: '600', fontSize: '1rem', marginBottom: '4px' }}>{item.name}</div>
                    <div style={{ color: '#8e8e93', fontSize: '0.9rem', marginBottom: '4px' }}>
                      Rs. {item.price.toFixed(2)} × {item.quantity}
                    </div>
                    <div style={{ color: '#16a34a', fontSize: '1rem', fontWeight: '600' }}>
                      Rs. {(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>

                  {/* Delete Button */}
                  <button
                    onClick={() => removeFromCart(item.id)}
                    style={{
                      background: '#ff3b30',
                      color: 'white',
                      border: 'none',
                      padding: '8px',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>

            {/* Total  Summary Card */}
            <div style={{
              background: 'white',
              borderRadius: '12px',
              padding: '20px',
              marginBottom: '20px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '4px'
              }}>
                <span style={{ fontSize: '0.9rem', color: '#8e8e93' }}>Subtotal</span>
                <span style={{ fontSize: '1rem', fontWeight: '500' }}>Rs. {totalAmount.toFixed(2)}</span>
              </div>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingTop: '16px',
                marginTop: '16px',
                borderTop: '1px solid #e5e5ea'
              }}>
                <span style={{ fontSize: '1.1rem', fontWeight: '600' }}>Total</span>
                <span style={{ fontSize: '1.5rem', fontWeight: '700', color: '#16a34a' }}>
                  Rs. {totalAmount.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Checkout Button - iOS Style */}
            <button
              onClick={handleCheckout}
              style={{
                width: '100%',
                padding: '16px',
                background: '#16a34a',
                color: 'white',
                border: 'none',
                borderRadius: '10px',
                fontSize: '1.1rem',
                fontWeight: '600',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                boxShadow: '0 2px 8px rgba(22, 163, 74, 0.3)',
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
              }}
            >
              <ShoppingBag size={20} />
              Proceed to Checkout
            </button>
          </>
        )}
      </div>
    </>
  );
}