import React, { createContext, useContext, useState, useEffect } from 'react';

// 1. Create the CartContext
const CartContext = createContext();

// 2. Export the provider component
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [user, setUser] = useState(null);  // State to store user info

  // ✅ Load cart from localStorage on mount
  useEffect(() => {
    const storedCart = localStorage.getItem("cartItems");
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  // ✅ Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // ✅ Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  // ✅ Save user to localStorage whenever it changes
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
    setCartItems([]); // Clear the cart items
  };

  // Set user data
  const setUserData = (userData) => {
    setUser(userData);  // Save user data in state
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        clearCart,    // Expose clearCart function
        user,         // Expose user data
        setUserData,  // Expose function to set user data
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// 6. Custom hook to use the cart and user
export const useCart = () => useContext(CartContext);
