import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useCart } from "./CartContext"; // Import the CartContext
import "./LoginRegisterPage.css";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginRegisterPage = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart(); // Access addToCart from context
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Handle login action
  const handleLogin = async () => {
    try {
      // Sending login request to the server
      const res = await axios.post("http://localhost:5000/api/login", { email, password });

      if (res.data && res.data.user) {
        // Store user data in localStorage
        localStorage.setItem("user", JSON.stringify(res.data.user));

        // Set 'isNewCustomer' to false for returning customers
        localStorage.setItem("isNewCustomer", "false");

        // Sync user's cart data if it exists
        if (res.data.user.cart) {
          res.data.user.cart.forEach(item => addToCart(item)); // Add items to the cart context
        }

        toast.success("Login successful!");

        // Redirect to order summary page after a delay
        setTimeout(() => {
          navigate("/ordersummary");
        }, 1000);
      } else {
        toast.error("Invalid login response.");
      }
    } catch (err) {
      // Handle login errors
      toast.error(err.response?.data?.message || "Login failed!");
    }
  };

  return (
    <div className="page-container">
      <div className="form-container">
        {/* New Customer Section */}
        <div className="form-box">
          <h2>New Customer</h2>
          <h3>Register Account</h3>
          <p>
            By creating an account you will be able to shop faster, be up to date on an order's status,
            and keep track of the orders you have previously made.
          </p>
          <button className="btn" onClick={() => navigate("/register")}>CONTINUE</button>
        </div>

        {/* Returning Customer Section */}
        <div className="form-box">
          <h2>Returning Customer</h2>
          <p className="subheading">I am a returning customer</p>

          {/* Email input */}
          <div className="input-group">
            <label>E-Mail Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </div>

          {/* Password input */}
          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </div>

          <p className="forgot-password">Forgotten Password?</p>

          {/* Login Button */}
          <button className="btn" onClick={handleLogin}>LOGIN</button>
        </div>
      </div>

      {/* Toast Notification */}
      <ToastContainer position="top-center" />
    </div>
  );
};

export default LoginRegisterPage;
