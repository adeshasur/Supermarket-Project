import React, { useState, useContext, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { CreditCard, Lock, Calendar } from 'lucide-react';
import '../styles/FormStyles.css'; 

export default function PaymentPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { cartItems, clearCart } = useContext(CartContext);

  const totalAmount = location.state?.total || 0;

  // Form States
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [holderName, setHolderName] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (totalAmount <= 0) {
      navigate('/customer-cart');
    }
  }, [totalAmount, navigate]);

  // ✅ Order Create Function (Updated)
  const createOrder = async (paymentData) => {
    try {
      const customer = JSON.parse(localStorage.getItem("customer"));
      const customerId = customer ? customer.id : 1; 

      const orderPayload = {
        customerId: customerId,
        // ✅ Payment විස්තර Order එකට යවනවා
        paymentStatus: paymentData.paymentStatus, 
        transactionId: paymentData.transactionId, 
        orderItems: cartItems.map(item => ({
          productId: item.id,
          quantity: item.quantity,
          price: item.price
        }))
      };

      console.log("Creating Order with Payment Info:", orderPayload);

      // Order Service (8084)
      const response = await fetch('http://localhost:8084/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderPayload)
      });

      if (response.ok) {
        console.log("Order saved successfully!");
      } else {
        console.error("Order save failed");
      }
    } catch (error) {
      console.error("Order Service Error:", error);
    }
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    setLoading(true);

    const paymentPayload = {
      orderId: Math.floor(Math.random() * 100000), 
      amount: totalAmount,
      paymentStatus: "SUCCESS",
      last4: cardNumber.slice(-4) || "0000"
    };

    try {
      // Step A: Payment Service (8085)
      const response = await fetch('http://localhost:8085/payment/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(paymentPayload)
      });

      if (response.ok) {
        const paymentResult = await response.json(); // Payment Service එකෙන් එන උත්තරේ ගන්නවා

        // Step B: Order එක Save කරනවා (Payment Info එක්ක)
        await createOrder({
          paymentStatus: "SUCCESS",
          transactionId: paymentResult.transactionId || "TXN-" + Date.now() // Transaction ID එක
        }); 

        alert("Payment Successful! Order Placed. 🎉");
        clearCart(); 
        navigate('/customer-home');
      } else {
        alert("Payment Failed. Please try again.");
      }

    } catch (error) {
      console.error("Process Error:", error);
      alert("Connection Error! Check Services.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: '50px auto', padding: '20px', border: '1px solid #ddd', borderRadius: '10px' }}>
      <h2 style={{ textAlign: 'center' }}>Secure Payment</h2>
      <div style={{ textAlign: 'center', margin: '20px 0', color: '#007bff' }}>
        <h1>Rs. {totalAmount.toFixed(2)}</h1>
      </div>
      
      <form onSubmit={handlePayment}>
        {/* Simple Form Fields (Card, Date, CVV) */}
        <input type="text" placeholder="Card Number" value={cardNumber} onChange={e => setCardNumber(e.target.value)} required style={inputStyle} maxLength="16"/>
        <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
            <input type="text" placeholder="MM/YY" value={expiry} onChange={e => setExpiry(e.target.value)} required style={inputStyle} maxLength="5"/>
            <input type="password" placeholder="CVV" value={cvc} onChange={e => setCvc(e.target.value)} required style={inputStyle} maxLength="3"/>
        </div>
        <input type="text" placeholder="Card Holder Name" value={holderName} onChange={e => setHolderName(e.target.value)} required style={{...inputStyle, marginTop: '10px'}} />
        
        <button type="submit" disabled={loading} style={btnStyle}>
          {loading ? "Processing..." : "Pay Now"}
        </button>
      </form>
    </div>
  );
}

// Simple Styles
const inputStyle = { width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' };
const btnStyle = { width: '100%', padding: '15px', background: '#28a745', color: 'white', border: 'none', borderRadius: '5px', marginTop: '20px', fontSize: '18px', cursor: 'pointer' };