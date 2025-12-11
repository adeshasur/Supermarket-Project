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
  // ... (rest of states: cardNumber, expiry, loading, etc.) ...
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


  // ✅ 1. NEW FUNCTION: Inventory Stock අඩු කරන්න
  const reduceInventory = async () => {
    try {
      // Cart එකේ තියෙන හැම Item එකක්ම Deduct කරන්න වෙන වෙනම Call කරන්න ඕන
      const deductionPromises = cartItems.map(item => {
        const reductionPayload = {
          productId: item.id,
          quantity: item.quantity * -1 // Stock අඩු කරන්න -1 න් ගුණ කරනවා
        };

        // Inventory Service (8082) එකේ 'update' Endpoint එක පාවිච්චි කරනවා යැයි උපකල්පනය කරමු
        return fetch('http://localhost:8082/api/inventory/update', { 
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(reductionPayload)
        });
      });

      // හැම Call එකක්ම ඉවර වෙනකම් ඉන්නවා
      await Promise.all(deductionPromises);
      console.log("Inventory successfully reduced.");

    } catch (error) {
      console.error("Inventory Reduction Failed:", error);
      // මෙතනදී transaction එක rollback කරන්න බැරි නිසා, අපි Alert එකක් දෙනවා.
      alert("WARNING: Stock deduction failed. Manual inventory update may be required.");
    }
  };


  const createOrder = async (paymentData) => {
    // ... (existing createOrder logic remains the same) ...
    try {
      const customer = JSON.parse(localStorage.getItem("customer"));
      const customerId = customer ? customer.id : 1; 

      const orderPayload = {
        customerId: customerId,
        paymentStatus: paymentData.paymentStatus, 
        transactionId: paymentData.transactionId, 
        orderItems: cartItems.map(item => ({
          productId: item.id,
          quantity: item.quantity,
          price: item.price
        }))
      };

      const response = await fetch('http://localhost:8084/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderPayload)
      });

      if (response.ok) {
        console.log("Order saved successfully!");
        return true; // Success return
      } else {
        console.error("Order save failed");
        return false; // Failure return
      }
    } catch (error) {
      console.error("Order Service Error:", error);
      return false; // Failure return
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
      const paymentResponse = await fetch('http://localhost:8085/payment/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(paymentPayload)
      });

      if (paymentResponse.ok) {
        const paymentResult = await paymentResponse.json();

        // Step B: Order එක Save කරනවා
        const orderSuccess = await createOrder({
          paymentStatus: "SUCCESS",
          transactionId: paymentResult.transactionId || "TXN-" + Date.now()
        }); 
        
        // ✅ Step C: Order එක හැදුන නම් Stock අඩු කරනවා
        if(orderSuccess) {
            await reduceInventory();
        }

        alert("Transaction Complete! Stock Updated. 🎉");
        clearCart(); 
        navigate('/customer-home');
      } else {
        alert("Transaction Failed! Payment Service Error.");
      }

    } catch (error) {
      console.error("Process Error:", error);
      alert("Connection Error! Check All Services.");
    } finally {
      setLoading(false);
    }
  };

  return (
    // ... (rest of the PaymentPage UI remains the same) ...
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