import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useCart } from "./CartContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./LoginRegisterPage.css";

const AuthPage = () => {
  const navigate = useNavigate();
  const { addToCart, setUserData } = useCart();

  const [authMode, setAuthMode] = useState("returning");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [form, setForm] = useState({
    username: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
    image: null,
  });

  const [errors, setErrors] = useState({});
  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      const file = files[0];
      setForm({ ...form, image: file });
      if (file) setPreview(URL.createObjectURL(file));
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!form.username || form.username.length > 32)
      newErrors.username = "Username must be between 1 and 32 characters!";
    if (!/\S+@\S+\.\S+/.test(form.email))
      newErrors.email = "E-Mail Address does not appear to be valid!";
    if (!/^\d{10}$/.test(form.mobile))
      newErrors.mobile = "Mobile number must be exactly 10 digits!";
    if (form.password.length < 4 || form.password.length > 20)
      newErrors.password = "Password must be between 4 and 20 characters!";
    if (form.password !== form.confirmPassword)
      newErrors.confirmPassword = "Password confirmation does not match!";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/login", { email, password });
      if (res.data?.user) {
        const user = res.data.user;
        setUserData(user, false);
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("isNewCustomer", "false");
        if (user.cart && Array.isArray(user.cart)) user.cart.forEach(addToCart);
        toast.success("Login successful!");
        setTimeout(() => navigate("/ordersummary"), 1000);
      } else {
        toast.error("Invalid login response.");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed!");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (key !== "image" || value) formData.append(key, value);
    });

    try {
      const res = await axios.post("http://localhost:5000/api/register", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success(res.data.message || "Registered successfully!");
      const userData = { username: form.username, email: form.email };
      setUserData(userData, true);
      setTimeout(() => navigate("/ordersummary"), 1000);
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="auth-container">
      <div className="checkout-option-section">
        <div className="option-header">
          
          <strong style={{color:"white"}}>CREATE AN ACCOUNT OR LOGIN</strong>
        </div>
        <div className="auth-options">
          <label>
            <input
              type="radio"
              value="register"
              checked={authMode === "register"}
              onChange={() => setAuthMode("register")}
            />
            Register Account
          </label>
          {/* <label>
            <input
              type="radio"
              value="guest"
              checked={authMode === "guest"}
              onChange={() => setAuthMode("guest")}
            />
            Guest Checkout
          </label> */}
          <label>
            <input
              type="radio"
              value="returning"
              checked={authMode === "returning"}
              onChange={() => setAuthMode("returning")}
            />
            Returning Customer
          </label>
        </div>
      </div>

      {authMode === "returning" && (
        <div className="form-box">
          <h2>Returning Customer</h2>
          <div className="input-group">
            <label>Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button className="btn" onClick={handleLogin}>Login</button>
        </div>
      )}

      {authMode === "register" && (
        <form className="form-box" onSubmit={handleRegister}>
        <h2>Register Account</h2>
        <div className="two-column-grid">
          <div className="input-group">
            <label>Username</label>
            <input type="text" name="username" value={form.username} onChange={handleChange} />
            {errors.username && <span className="error">{errors.username}</span>}
          </div>
          <div className="input-group">
            <label>Email</label>
            <input type="email" name="email" value={form.email} onChange={handleChange} />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>
          <div className="input-group">
            <label>Mobile</label>
            <input type="text" name="mobile" value={form.mobile} onChange={handleChange} />
            {errors.mobile && <span className="error">{errors.mobile}</span>}
          </div>
          <div className="input-group">
            <label>Image</label>
            <input type="file" name="image" onChange={handleChange} />
            {preview && <img src={preview} alt="preview" style={{ width: "80px", marginTop: "5px" }} />}
          </div>
          <div className="input-group">
            <label>Password</label>
            <input type="password" name="password" value={form.password} onChange={handleChange} />
            {errors.password && <span className="error">{errors.password}</span>}
          </div>
          <div className="input-group">
            <label>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
            />
            {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}
          </div>
        </div>
      
        <label className="privacy">
          <input type="checkbox" required /> I agree to the <a href="#">Privacy Policy</a>
        </label>
      
        <button type="submit" className="btn">Register</button>
      </form>
      
      )}

      {authMode === "guest" && (
        <div className="form-box">
          <h2>Guest Checkout</h2>
          <p>No account required. You can place an order directly.</p>
          <button className="btn" onClick={() => navigate("/ordersummary")}>Continue as Guest</button>
        </div>
      )}

      <ToastContainer position="top-center" />
    </div>
  );
};

export default AuthPage;
