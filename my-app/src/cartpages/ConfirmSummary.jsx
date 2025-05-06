import React from 'react';
import { Link } from 'react-router-dom';

const ConfirmSummary = () => {
  const containerStyle = {
    textAlign: 'center',
    marginTop: '100px',
    fontFamily: 'Arial, sans-serif',
    padding: '20px',
  };

  const headingStyle = {
    fontSize: '2.5rem',
    color: '#28a745',
    marginBottom: '20px',
  };

  const textStyle = {
    fontSize: '1.2rem',
    color: '#333',
  };

  const linkStyle = {
    display: 'inline-block',
    marginTop: '30px',
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: '#fff',
    textDecoration: 'none',
    borderRadius: '5px',
  };

  return (
    <div style={containerStyle}>
      <h2 style={headingStyle}>Thank You for Shopping!</h2>
      <p style={textStyle}>Your order has been placed successfully.</p>
      <Link to="/" style={linkStyle}>Back to Home</Link>
    </div>
  );
};

export default ConfirmSummary;
