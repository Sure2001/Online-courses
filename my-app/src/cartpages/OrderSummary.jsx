import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../cartpages/CartContext";
import axios from "axios";

// ✅ Define styles at the top
const styles = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(180deg, #d4b0ff, #fbc2eb)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "1rem",
  },
  summaryCard: {
    backgroundColor: "#fff",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    padding: "2rem",
    maxWidth: "700px",
    width: "100%",
  },
  title: {
    fontSize: "1.8rem",
    marginBottom: "1.5rem",
    textAlign: "center",
    color: "#4b0082",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginBottom: "1.5rem",
  },
  th: {
    background: "#f2f2f2",
    padding: "0.75rem",
    textAlign: "left",
    borderBottom: "1px solid #ddd",
  },
  td: {
    padding: "0.75rem",
    borderBottom: "1px solid #eee",
  },
  empty: {
    textAlign: "center",
    fontSize: "1rem",
    color: "#888",
  },
  orderBtn: {
    display: "block",
    width: "100%",
    padding: "0.75rem",
    background: "linear-gradient(to right, #ff4ecd, #b45eff)",
    color: "#fff",
    fontWeight: "bold",
    fontSize: "1rem",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
};

const OrderSummary = () => {
  const { cartItems, userId } = useCart(); // ✅ Make sure email is available in context
  const navigate = useNavigate();
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  // Filter only current user's cart
  const userCart = cartItems.filter((item) => item.userId === userId);

  const calculateGrandTotal = () => {
    return userCart
      .reduce((acc, item) => acc + parseFloat(item.price) * item.quantity, 0)
      .toFixed(2);
  };

  const handleOrderConfirm = async () => {
    if (userCart.length === 0) return;
  
    const orderData = {
      userId,
      userDetails: userCart, // ✅ include full user object here
      items: userCart,
      totalAmount: calculateGrandTotal(),
      orderDate: new Date().toISOString(),
    };
  
    try {
      setIsPlacingOrder(true);
      const res = await axios.post("http://localhost:5000/api/orders", orderData);
  
      if (res.status === 201) {
        alert("✅ Order placed successfully!");
        navigate("/"); // Redirect to home
      }
    } catch (error) {
      console.error("Order placement failed:", error);
      alert("❌ Failed to place order. Try again.");
    } finally {
      setIsPlacingOrder(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.summaryCard}>
        <h2 style={styles.title}>Order Summary</h2>
        {userCart.length === 0 ? (
          <p style={styles.empty}>Your cart is empty.</p>
        ) : (
          <>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Product</th>
                  <th style={styles.th}>Level</th>
                  <th style={styles.th}>Qty</th>
                  <th style={styles.th}>Price</th>
                  <th style={styles.th}>Total</th>
                </tr>
              </thead>
              <tbody>
                {[...userCart].reverse().map((item, index) => (
                  <tr key={index}>
                    <td style={styles.td}>{item.title}</td>
                    <td style={styles.td}>{item.level}</td>
                    <td style={styles.td}>{item.quantity}</td>
                    <td style={styles.td}>${parseFloat(item.price).toFixed(2)}</td>
                    <td style={styles.td}>
                      ${(parseFloat(item.price) * item.quantity).toFixed(2)}
                    </td>
                  </tr>
                ))}
                <tr>
                  <td colSpan="4" style={{ ...styles.td, fontWeight: "bold", textAlign: "right" }}>
                    Grand Total:
                  </td>
                  <td style={{ ...styles.td, fontWeight: "bold" }}>
                    ${calculateGrandTotal()}
                  </td>
                </tr>
              </tbody>
            </table>

            <button style={styles.orderBtn} onClick={handleOrderConfirm} disabled={isPlacingOrder}>
              {isPlacingOrder ? "Placing Order..." : "Confirm Order"}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default OrderSummary;
