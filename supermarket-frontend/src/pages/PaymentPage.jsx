import React, { useState, useContext, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { CreditCard, Lock, Calendar } from 'lucide-react';
import '../styles/FormStyles.css'; 

export default function PaymentPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { clearCart } = useContext(CartContext);

  // Cart එකෙන් එවපු Total Amount එක (Default 0)
  const totalAmount = location.state?.total || 0;

  // Form States
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [holderName, setHolderName] = useState('');
  
  const [loading, setLoading] = useState(false);

  // Total එක 0 නම් Cart එකට හරවා යවනවා
  useEffect(() => {
    if (totalAmount <= 0) {
      navigate('/customer-cart');
    }
  }, [totalAmount, navigate]);

  const handlePayment = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Backend එකට යවන Data Object එක
    const paymentPayload = {
      orderId: Math.floor(Math.random() * 100000), // දැනට Random ID එකක් (Order Service නැති නිසා)
      amount: totalAmount,
      paymentStatus: "SUCCESS",
      last4: cardNumber.slice(-4) || "0000" // Card එකේ අන්තිම ඉලක්කම් 4
    };

    try {
      // ✅ Port 8085 සහ URL එක '/payment/add'
      const response = await fetch('http://localhost:8085/payment/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(paymentPayload)
      });

      if (response.ok) {
        alert("Payment Successful! 🎉");
        clearCart(); // Cart එක හිස් කරනවා
        navigate('/customer-home'); // Home එකට යවනවා
      } else {
        alert("Payment Failed. Please try again.");
      }

    } catch (error) {
      console.error("Payment Error:", error);
      alert("Connection Error! Is Payment Service (8085) running?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: '50px auto', padding: '20px', border: '1px solid #ddd', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Secure Payment</h2>
      
      <div style={{ background: '#e3f2fd', padding: '15px', borderRadius: '8px', marginBottom: '20px', textAlign: 'center' }}>
        <span style={{ color: '#555' }}>Total to Pay</span>
        <h1 style={{ color: '#007bff', margin: '5px 0' }}>Rs. {totalAmount.toFixed(2)}</h1>
      </div>

      <form onSubmit={handlePayment}>
        {/* Card Number */}
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Card Number</label>
          <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #ccc', borderRadius: '5px', padding: '10px' }}>
            <CreditCard size={20} color="#666" style={{ marginRight: '10px' }} />
            <input 
              type="text" 
              placeholder="0000 0000 0000 0000" 
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              required
              maxLength="16"
              style={{ border: 'none', outline: 'none', width: '100%', fontSize: '16px' }}
            />
          </div>
        </div>

        <div style={{ display: 'flex', gap: '15px', marginBottom: '15px' }}>
          {/* Expiry Date */}
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>Expiry Date</label>
            <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #ccc', borderRadius: '5px', padding: '10px' }}>
              <Calendar size={20} color="#666" style={{ marginRight: '10px' }} />
              <input 
                type="text" 
                placeholder="MM/YY" 
                value={expiry}
                onChange={(e) => setExpiry(e.target.value)}
                required
                maxLength="5"
                style={{ border: 'none', outline: 'none', width: '100%', fontSize: '16px' }}
              />
            </div>
          </div>

          {/* CVC */}
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>CVV</label>
            <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #ccc', borderRadius: '5px', padding: '10px' }}>
              <Lock size={20} color="#666" style={{ marginRight: '10px' }} />
              <input 
                type="password" 
                placeholder="123" 
                value={cvc}
                onChange={(e) => setCvc(e.target.value)}
                required
                maxLength="3"
                style={{ border: 'none', outline: 'none', width: '100%', fontSize: '16px' }}
              />
            </div>
          </div>
        </div>

        {/* Card Holder Name */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Card Holder Name</label>
          <input 
            type="text" 
            placeholder="John Doe" 
            value={holderName}
            onChange={(e) => setHolderName(e.target.value)}
            required
            style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', fontSize: '16px' }}
          />
        </div>

        <button 
          type="submit" 
          disabled={loading}
          style={{ width: '100%', padding: '15px', background: '#28a745', color: 'white', border: 'none', borderRadius: '5px', fontSize: '18px', cursor: 'pointer', opacity: loading ? 0.7 : 1 }}
        >
          {loading ? "Processing Payment..." : `Pay Rs. ${totalAmount.toFixed(2)}`}
        </button>
      </form>
    </div>
  );
}