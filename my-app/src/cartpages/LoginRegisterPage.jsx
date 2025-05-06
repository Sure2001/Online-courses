import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./LoginRegisterPage.css";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginRegisterPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/login", {
        email,
        password,
      });
  
      if (res.data && res.data.user) {
        // Store user data in localStorage
        localStorage.setItem("user", JSON.stringify(res.data.user));
  
        // Set isNewCustomer to false for returning customers
        localStorage.setItem("isNewCustomer", "false");
  
        toast.success("Login successful!");
  
        setTimeout(() => {
          navigate("/ordersummary");
        }, 1000);
      } else {
        toast.error("Invalid login response.");
      }
    } catch (err) {
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

          <div className="input-group">
            <label>E-Mail Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </div>

          <p className="forgot-password">Forgotten Password</p>

          <button className="btn" onClick={handleLogin}>LOGIN</button>
        </div>
      </div>
      <ToastContainer position="top-center" />
    </div>
  );
};

export default LoginRegisterPage;
