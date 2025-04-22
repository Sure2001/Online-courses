import React, { createContext, useContext, useState } from 'react';

// 1. Create the CartContext
const CartContext = createContext();

// 2. Export the provider component
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // 3. Function to add item (like course level) to cart
  const addToCart = (item) => {
    setCartItems((prev) => [...prev, { ...item, quantity: 1 }]);
  };

  // 4. Optional: remove item by index
  const removeFromCart = (index) => {
    const updated = [...cartItems];
    updated.splice(index, 1);
    setCartItems(updated);
  };

  // 5. Expose state and functions to consumers
  return (
    <CartContext.Provider
      value={{ cartItems, setCartItems, addToCart, removeFromCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

// 6. Custom hook to use the cart
export const useCart = () => useContext(CartContext);
