import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./SignUpPage.css"; // Make sure to create and import this CSS file

const SignInPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    mobile: "",
    password: "",
    level: "Beginner",
    courseType: "Frontend",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/api/signup", formData);
      alert(res.data.message);
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.error || "Registration failed");
    }
  };

  return (
    <div className="signin-container fade-in">
      <div className="form-box slide-up">
        <h2 className="form-title">SIGN <span>UP</span></h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              name="username"
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Mobile</label>
            <input
              type="text"
              name="mobile"
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Course Level</label>
            <select
              name="level"
              onChange={handleChange}
              value={formData.level}
            >
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>
          </div>

          <div className="form-group">
            <label>Course Type</label>
            <select
              name="courseType"
              onChange={handleChange}
              value={formData.courseType}
            >
              <option>Frontend</option>
              <option>Backend</option>
              <option>UIUX</option>
            </select>
          </div>

          <button type="submit" className="submit-btn">Register</button>
        </form>
      </div>
    </div>
  );
};

export default SignInPage;
