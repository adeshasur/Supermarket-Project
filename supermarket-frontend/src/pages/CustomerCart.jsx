import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { Trash2, ArrowLeft, CreditCard } from 'lucide-react';
import '../styles/TableStyles.css';

export default function CustomerCart() {
  const navigate = useNavigate();
  const { cartItems, removeFromCart } = useContext(CartContext);

  const totalAmount = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  // ✅ Checkout Function එක
  const handleCheckout = () => {
    if (cartItems.length === 0) return;
    
    // Payment Page එකට යනවා, Total එකත් අරගෙන
    navigate('/payment', { state: { total: totalAmount } });
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
        <button onClick={() => navigate('/customer-home')} style={{ background: 'none', border: 'none', cursor: 'pointer', marginRight: '10px' }}>
          <ArrowLeft size={24} />
        </button>
        <h2>My Shopping Cart</h2>
      </div>

      {cartItems.length === 0 ? (
        <div style={{ textAlign: 'center', marginTop: '50px', color: '#666' }}>
          <h3>Your cart is empty</h3>
          <button 
            onClick={() => navigate('/customer-home')}
            style={{ marginTop: '20px', padding: '10px 20px', background: '#28a745', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
          >
            Go to Shop
          </button>
        </div>
      ) : (
        <>
          <div className="app-table-container">
            <table className="app-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Qty</th>
                  <th>Total</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        {item.imageUrl && <img src={item.imageUrl} alt={item.name} style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '5px' }} />}
                        <span>{item.name}</span>
                      </div>
                    </td>
                    <td>Rs. {item.price.toFixed(2)}</td>
                    <td style={{ textAlign: 'center' }}>{item.quantity}</td>
                    <td>Rs. {(item.price * item.quantity).toFixed(2)}</td>
                    <td style={{ textAlign: 'center' }}>
                      <button onClick={() => removeFromCart(item.id)} style={{ background: '#ff4757', color: 'white', border: 'none', padding: '5px', borderRadius: '5px', cursor: 'pointer' }}>
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div style={{ marginTop: '30px', padding: '20px', background: '#f8f9fa', borderRadius: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <span style={{ fontSize: '1.2rem', color: '#666' }}>Total Amount:</span>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#333' }}>
                Rs. {totalAmount.toFixed(2)}
              </div>
            </div>
            
            {/* ✅ Checkout Button */}
            <button 
              onClick={handleCheckout}
              style={{ padding: '15px 30px', background: '#007bff', color: 'white', border: 'none', borderRadius: '8px', fontSize: '1.1rem', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px' }}
            >
              <CreditCard size={20} />
              Checkout Now
            </button>
          </div>
        </>
      )}
    </div>
  );
}