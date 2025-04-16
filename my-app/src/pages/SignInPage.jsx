import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // ✅ Added useNavigate

const SignInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // ✅ To redirect on success

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Login successful!");
        // Redirect to homepage or dashboard
        navigate("/");
      } else {
        alert(`Login failed: ${data.message}`);
      }
    } catch (err) {
      console.error("Error during sign in:", err);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.title}>
          Sign <span style={styles.span}>In</span>
        </h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={styles.input}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={styles.input}
        />

        <div style={styles.forgotPassword}>
          <Link to="/forgot-password">Forgot Password?</Link>
        </div>

        <button type="submit" style={styles.button}>
          Sign In
        </button>

        <div style={styles.register}>
          Don’t have an account?{" "}
          <Link to="/signup" style={styles.registerLink}>
            Register
          </Link>
        </div>
      </form>
    </div>
  );
};

// ✅ Inline styles for simplicity
const styles = {
  container: {
    minHeight: "100vh",
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
  forgotPassword: {
    textAlign: "right",
    fontSize: "0.875rem",
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
  register: {
    textAlign: "center",
    fontSize: "0.9rem",
  },
  registerLink: {
    color: "#eb4dc9",
    textDecoration: "underline",
  },
};

export default SignInPage;
