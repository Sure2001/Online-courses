import React, { createContext, useContext, useState, useEffect } from "react";

// Create context
const CartContext = createContext();
const LOCAL_STORAGE_KEY = "myCartData";

// Provider component
export const CartProvider = ({ children }) => {
  const userId = "12345"; // Replace with actual logged-in user ID if needed

  const [cartItems, setCartItems] = useState(() => {
    const storedCart = localStorage.getItem(LOCAL_STORAGE_KEY);
    return storedCart ? JSON.parse(storedCart) : [];
  });

  // Sync cart with localStorage
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

  // Add to cart
  const addToCart = (newItem) => {
    setCartItems((prevItems) => {
      const existingIndex = prevItems.findIndex(
        (item) =>
          item.title === newItem.title &&
          item.level === newItem.level &&
          item.userId === userId
      );

      if (existingIndex !== -1) {
        const updatedItems = [...prevItems];
        updatedItems[existingIndex].quantity += 1;
        return updatedItems;
      } else {
        return [
          ...prevItems,
          {
            ...newItem,
            quantity: 1,
            userId,
          },
        ];
      }
    });
  };

  // Remove item by index
  const removeFromCart = (index) => {
    setCartItems((prevItems) => {
      const updatedItems = [...prevItems];
      updatedItems.splice(index, 1);
      return updatedItems;
    });
  };

  // Increment or decrement quantity
  const updateQuantity = (index, type) => {
    setCartItems((prevItems) => {
      const updatedItems = [...prevItems];
      if (type === "inc") updatedItems[index].quantity += 1;
      if (type === "dec" && updatedItems[index].quantity > 1) {
        updatedItems[index].quantity -= 1;
      }
      return updatedItems;
    });
  };

  // Count items for user (for cart badge or summary)
  const cartCount = cartItems
    .filter((item) => item.userId === userId)
    .reduce((total, item) => total + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        cartCount,
        userId,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hook
export const useCart = () => useContext(CartContext);
