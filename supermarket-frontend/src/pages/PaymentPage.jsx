import React, { useState, useContext, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import '../Styles/FormStyles.css';

export default function PaymentPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { cartItems, clearCart } = useContext(CartContext);

  const totalAmount = location.state?.total || 0;
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [holderName, setHolderName] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (totalAmount <= 0) {
      navigate('/customer-cart');
    }
  }, [totalAmount, navigate]);

  // VALIDATIONS
  const validate = () => {
    const newErrors = {};

    // Card Number: 16 digits only
    if (!/^\d{16}$/.test(cardNumber)) {
      newErrors.cardNumber = "Card Number must be 16 digits.";
    }

    // Expiry: MM/YY and not expired
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiry)) {
      newErrors.expiry = "Expiry must be in MM/YY format.";
    } else {
      const [month, year] = expiry.split('/').map(Number);
      const expDate = new Date(2000 + year, month - 1, 1);
      const now = new Date();
      now.setDate(1); // ignore day
      if (expDate < now) newErrors.expiry = "Card is expired.";
    }

    // CVV: 3 digits
    if (!/^\d{3}$/.test(cvc)) {
      newErrors.cvc = "CVV must be 3 digits.";
    }

    // Holder Name: letters and spaces only
    if (!/^[a-zA-Z\s]+$/.test(holderName)) {
      newErrors.holderName = "Card Holder Name is invalid.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const reduceInventory = async () => {
    try {
      const deductionPromises = cartItems.map(item => {
        const reductionPayload = {
          productId: item.id,
          quantity: item.quantity * -1
        };
        return fetch('http://localhost:8082/api/inventory/update', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(reductionPayload)
        });
      });
      await Promise.all(deductionPromises);
      console.log("Inventory successfully reduced.");
    } catch (error) {
      console.error("Inventory Reduction Failed:", error);
      alert("WARNING: Stock deduction failed. Manual inventory update may be required.");
    }
  };

  const createOrder = async (paymentData) => {
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
        return true;
      } else {
        console.error("Order save failed");
        return false;
      }
    } catch (error) {
      console.error("Order Service Error:", error);
      return false;
    }
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    const paymentPayload = {
      orderId: Math.floor(Math.random() * 100000),
      amount: totalAmount,
      paymentStatus: "SUCCESS",
      last4: cardNumber.slice(-4)
    };

    try {
      const paymentResponse = await fetch('http://localhost:8085/payment/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(paymentPayload)
      });

      if (paymentResponse.ok) {
        const paymentResult = await paymentResponse.json();

        const orderSuccess = await createOrder({
          paymentStatus: "SUCCESS",
          transactionId: paymentResult.transactionId || "TXN-" + Date.now()
        });

        if (orderSuccess) await reduceInventory();

        alert("Transaction Complete!");
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
    <div style={{ maxWidth: '500px', margin: '50px auto', padding: '20px', border: '1px solid #ddd', borderRadius: '10px' }}>
      <h2 style={{ textAlign: 'center' }}>Secure Payment</h2>
      <div style={{ textAlign: 'center', margin: '20px 0', color: '#007bff' }}>
        <h1>Rs. {totalAmount.toFixed(2)}</h1>
      </div>

      <form onSubmit={handlePayment}>
        <input type="text" placeholder="Card Number" value={cardNumber} onChange={e => setCardNumber(e.target.value)} required style={inputStyle} maxLength="16" />
        {errors.cardNumber && <p style={errorStyle}>{errors.cardNumber}</p>}

        <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
          <input type="text" placeholder="MM/YY" value={expiry} onChange={e => setExpiry(e.target.value)} required style={inputStyle} maxLength="5" />
          <input type="password" placeholder="CVV" value={cvc} onChange={e => setCvc(e.target.value)} required style={inputStyle} maxLength="3" />
        </div>
        {errors.expiry && <p style={errorStyle}>{errors.expiry}</p>}
        {errors.cvc && <p style={errorStyle}>{errors.cvc}</p>}

        <input type="text" placeholder="Card Holder Name" value={holderName} onChange={e => setHolderName(e.target.value)} required style={{ ...inputStyle, marginTop: '10px' }} />
        {errors.holderName && <p style={errorStyle}>{errors.holderName}</p>}

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
const errorStyle = { color: 'red', fontSize: '14px', marginTop: '3px' };
