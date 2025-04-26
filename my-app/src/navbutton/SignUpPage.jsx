import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./SignUpPage.css";

export default function SignUpPage({ onSwitch }) {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [image, setImage] = useState(null);
  const navigate = useNavigate(); // 🧭 For redirecting after signup

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("username", form.username);
    formData.append("email", form.email);
    formData.append("password", form.password);
    if (image) {
      formData.append("image", image);
    }

    try {
      const res = await axios.post("http://localhost:5000/api/signup", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success(res.data.message);

      // ✅ After successful signup, wait a second and go to home
      setTimeout(() => {
        navigate("/signin"); // Redirect to Sign In page
      }, 1000);

    } catch (err) {
      toast.error(err.response?.data?.message || "Signup failed!");
    }
  };

  return (
    <div className="background">
    <div className="signup-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input name="username" placeholder="Username" onChange={handleChange} required />
        <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
        <input type="file" accept="image/*" onChange={handleImageChange} />
        <button type="submit">Sign Up</button>
      </form>
      <p>Already have an account? <Link to="/signin">Sign in</Link></p>

      <ToastContainer position="top-center" />
    </div>
    </div>
  );
}
