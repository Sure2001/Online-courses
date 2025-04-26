import React, { useState } from "react";
import { Link } from "react-router-dom";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleReset = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, newPassword }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Password updated successfully!");
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (err) {
      console.error("Reset error:", err);
      alert("Something went wrong.");
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleReset} style={styles.form}>
        <h2 style={styles.title}>Reset <span style={styles.span}>Password</span></h2>

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={styles.input}
        />

        <input
          type="password"
          placeholder="New password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
          style={styles.input}
        />

        <button type="submit" style={styles.button}>Reset Password</button>
        <p>Go to <Link to="/signin">Sign in</Link></p>
      </form>
    </div>
  );
};

const styles = {
  container: {
    minHeight: "85vh",
    background: "linear-gradient(180deg, #eb4dc9, #af55d9)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  form: {
    backgroundColor: "#ffffff",
    padding: "2rem",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    width: "100%",
    maxWidth: "400px",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  title: {
    fontSize: "1.5rem",
    textAlign: "center",
    color: "#1f2937",
  },
  span: {
    background: "linear-gradient(180deg, #eb4dc9, #af55d9)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    fontWeight: "bold",
  },
  input: {
    padding: "0.75rem 1rem",
    fontSize: "1rem",
    border: "1px solid #ccc",
    borderRadius: "8px",
    outline: "none",
  },
  button: {
    background: "linear-gradient(180deg, #eb4dc9, #af55d9)",
    color: "#ffffff",
    padding: "0.75rem",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "1rem",
  },
};

export default ForgotPasswordPage;
