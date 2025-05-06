import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './RegisterPage.css';
import { useCart } from './CartContext'; // Importing the useCart hook

const RegisterPage = () => {
  const [form, setForm] = useState({
    username: '',
    email: '',
    mobile: '',
    password: '',
    confirmPassword: '',
    image: null,
  });

  const [errors, setErrors] = useState({});
  const [preview, setPreview] = useState(null);
  const navigate = useNavigate();
  
  // Get the setUserData function from context
  const { setUserData } = useCart(); 

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      const file = files[0];
      setForm({ ...form, image: file });
      if (file) {
        setPreview(URL.createObjectURL(file));
      }
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!form.username || form.username.length > 32)
      newErrors.username = 'Username must be between 1 and 32 characters!';

    if (!/\S+@\S+\.\S+/.test(form.email))
      newErrors.email = 'E-Mail Address does not appear to be valid!';

    if (!/^\d{10}$/.test(form.mobile))
      newErrors.mobile = 'Mobile number must be exactly 10 digits!';

    if (form.password.length < 4 || form.password.length > 20)
      newErrors.password = 'Password must be between 4 and 20 characters!';

    if (form.password !== form.confirmPassword)
      newErrors.confirmPassword = 'Password confirmation does not match!';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
  
    const formData = new FormData();
    formData.append("username", form.username);
    formData.append("email", form.email);
    formData.append("mobile", form.mobile);
    formData.append("password", form.password);
    formData.append("confirmPassword", form.confirmPassword);
    if (form.image) {
      formData.append("image", form.image);
    }
  
    try {
      const res = await axios.post("http://localhost:5000/api/register", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
  
      toast.success(res.data.message || "Registered successfully!");
  
      // Save user data
      const userData = { username: form.username, email: form.email };
      setUserData(userData);
  
      // ✅ Store in localStorage to identify user type
      localStorage.setItem("isNewCustomer", "true");
      localStorage.setItem("user", JSON.stringify(userData));
  
      setTimeout(() => {
        navigate("/ordersummary");
      }, 1000);
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
    }
  };
  

  return (
    <form className="register-form" onSubmit={handleSubmit}>
      <h2>Register Account</h2>
      <p>If you already have an account with us, please login at the login page.</p>

      <fieldset>
        <legend>Your Personal Details</legend>

        <label>Username</label>
        <input type="text" name="username" value={form.username} onChange={handleChange} />
        {errors.username && <span className="error">{errors.username}</span>}

        <label>E-Mail</label>
        <input type="email" name="email" value={form.email} onChange={handleChange} />
        {errors.email && <span className="error">{errors.email}</span>}

        <label>Mobile Number</label>
        <input type="text" name="mobile" value={form.mobile} onChange={handleChange} />
        {errors.mobile && <span className="error">{errors.mobile}</span>}

        <label>Upload Image</label>
        <input type="file" name="image" accept="image/*" onChange={handleChange} />
        {preview && (
          <img
            src={preview}
            alt="Preview"
            style={{ width: '100px', height: '100px', marginTop: '10px' }}
          />
        )}
      </fieldset>

      <fieldset>
        <legend>Your Password</legend>

        <label>Password</label>
        <input type="password" name="password" value={form.password} onChange={handleChange} />
        {errors.password && <span className="error">{errors.password}</span>}

        <label>Password Confirm</label>
        <input
          type="password"
          name="confirmPassword"
          value={form.confirmPassword}
          onChange={handleChange}
        />
        {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}
      </fieldset>

      <label className="privacy">
        <input type="checkbox" required /> I have read and agree to the <a href="#">Privacy Policy</a>
      </label>

      <button type="submit">CONTINUE</button>

      <ToastContainer position="top-center" />
    </form>
  );
};

export default RegisterPage;
