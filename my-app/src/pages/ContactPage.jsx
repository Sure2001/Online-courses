import React, { useState } from "react";
import "./ContactPage.css";
import feedback from "../images/feed.jpg";
import axios from "axios";

const ContactPage = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "", // ✅ updated
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/api/feedback", form);
      alert("Feedback sent successfully!");
      setForm({ name: "", email: "", subject: "", feedback: "" });
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Try again.");
    }
  };

  return (
    <div className="contact-page">
      <div className="contact-header">
        <h1>Contact Us...</h1>
        <p>
          We’d love to hear from you! Fill out the form or reach out directly.
        </p>
      </div>

      <div className="contact-content">
        <div className="contact-form">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Your Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Subject</label>
              <input
                type="text"
                name="subject"
                value={form.subject}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Message</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="submit-btn">
              Send Message
            </button>
          </form>
        </div>

        <div className="contact-info">
          <h3>Contact Details</h3>
          <p>
            <strong>Email:</strong> contact@yourdomain.com
          </p>
          <p>
            <strong>Phone:</strong> +1 (123) 456-7890
          </p>
          <p>
            <strong>Address:</strong> 123 Creative Avenue, UI/UX City,
            Designland
          </p>

          <div className="map-container" style={{ marginTop: "20px" }}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.329109049529!2d76.9553075148044!3d11.016844892153168!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba857d6c1f1d699%3A0x24d48da01154df19!2sCoimbatore%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1680849076905!5m2!1sen!2sin"
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
