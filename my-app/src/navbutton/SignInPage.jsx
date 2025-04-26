import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./SignUpPage.css";

export default function SignInPage({ onSwitch }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate(); // 🧭 For redirection

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/login", form);
      toast.success(res.data.message);

      // ✅ After successful sign in, wait a second and go to home
      setTimeout(() => {
        navigate("/");
      }, 1000);

    } catch (err) {
      toast.error(err.response?.data?.message || "Sign in failed!");
    }
  };

  return (
    <div className="signup-container">
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit}>
        <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
        <button type="submit">Sign In</button>
      </form>
      <p><Link to="/forgot-password">Forgot password?</Link></p>
      <p>Don't have an account? <Link to="/signup">Sign up</Link></p>

      {/* Toast container must be included */}
      <ToastContainer position="top-center" />
    </div>
  );
}
