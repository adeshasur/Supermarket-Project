import React, { createContext, useState, useEffect, useContext } from 'react';

// ✅ FIX: මෙතන 'export' වචනය අනිවාර්යයෙන්ම ඕන
export const CartContext = createContext();

// Custom hook to use the cart context easily
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  // Cart items load from local storage if available
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('cartItems');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Save to local storage whenever cart changes
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  // Add Item Function
  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const itemExists = prevItems.find((item) => item.id === product.id);
      if (itemExists) {
        return prevItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  // Remove Item Function
  const removeFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  // Clear Cart Function
  const clearCart = () => {
    setCartItems([]);
  };

  // Calculate Total
  const cartTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, cartTotal }}>
      {children}
    </CartContext.Provider>
  );
};