// CartContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

// Create the CartContext
const CartContext = createContext();

// Export the provider component
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [user, setUser] = useState(null);

  // Load cart and user from localStorage on mount
  useEffect(() => {
    const storedCart = localStorage.getItem("cartItems");
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }

    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Save cart and user to localStorage whenever they change
  useEffect(() => {
    if (cartItems) {
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }
  }, [cartItems]);

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    }
  }, [user]);

  // Add item to cart
  const addToCart = (item) => {
    setCartItems((prev) => [...prev, { ...item, quantity: 1 }]);
  };

  // Remove item from cart by index
  const removeFromCart = (index) => {
    const updated = [...cartItems];
    updated.splice(index, 1);
    setCartItems(updated);
  };

  // Clear the cart
  const clearCart = () => {
    setCartItems([]);
  };

  // Set user data
  const setUserData = (userData) => {
    setUser(userData);
  };

  // Get customer type from localStorage
  const isReturningCustomer = localStorage.getItem("isNewCustomer") === "false";

  return (
    <CartContext.Provider
      value={{
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        clearCart,
        user,
        setUserData,
        isReturningCustomer,  // Expose isReturningCustomer flag
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use the cart and user
export const useCart = () => useContext(CartContext);
