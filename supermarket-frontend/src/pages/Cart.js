import React from 'react';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const { cartItems, removeFromCart, cartTotal, clearCart } = useCart();

  if (cartItems.length === 0) {
    return <div className="p-5"><h2>Your Cart is Empty!</h2></div>;
  }

  return (
    <div className="cart-container" style={{ padding: '20px' }}>
      <h2>Shopping Cart</h2>
      <table className="table" style={{ width: '100%', marginTop: '20px' }}>
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
              <td>{item.name}</td>
              <td>Rs. {item.price}</td>
              <td>{item.quantity}</td>
              <td>Rs. {item.price * item.quantity}</td>
              <td>
                <button 
                  onClick={() => removeFromCart(item.id)}
                  style={{ backgroundColor: 'red', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer' }}
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ marginTop: '20px', textAlign: 'right' }}>
        <h3>Total Amount: Rs. {cartTotal}</h3>
        <button 
          onClick={clearCart}
          style={{ marginRight: '10px', padding: '10px', backgroundColor: '#6c757d', color: 'white', border: 'none' }}
        >
          Clear Cart
        </button>
        <button 
          style={{ padding: '10px 20px', backgroundColor: '#28a745', color: 'white', border: 'none' }}
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;