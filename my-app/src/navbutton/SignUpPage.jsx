import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./SignUpPage.css";

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    telephone: "",
    password: "",
    confirmPassword: "",
    address: "",
    city: "",
    country: "",
    regionState: "",
    profileImage: null,
  });

  const [imagePreview, setImagePreview] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "profileImage") {
      setFormData({ ...formData, profileImage: files[0] });
      setImagePreview(URL.createObjectURL(files[0]));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });

    try {
      const res = await axios.post("http://localhost:5000/api/signup", data);
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.error || "Registration failed");
    }
  };

  return (
    <div className="signup-container fade-in">
      <div className="form-box slide-up">
        <h2 className="form-title">SIGN <span>UP</span></h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="form-group">
            <label>First Name</label>
            <input type="text" name="firstName" required onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Last Name</label>
            <input type="text" name="lastName" required onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input type="email" name="email" required onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Telephone</label>
            <input type="text" name="telephone" required onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input type="password" name="password" required onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Confirm Password</label>
            <input type="password" name="confirmPassword" required onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Address</label>
            <input type="text" name="address" required onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>City</label>
            <input type="text" name="city" required onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Country</label>
            <input type="text" name="country" required onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Region/State</label>
            <input type="text" name="regionState" required onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Profile Image</label>
            <input type="file" name="profileImage" accept="image/*" onChange={handleChange} />
            {imagePreview && <img src={imagePreview} alt="Preview" className="image-preview" />}
          </div>

          <button type="submit" className="submit-btn">Register</button>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
