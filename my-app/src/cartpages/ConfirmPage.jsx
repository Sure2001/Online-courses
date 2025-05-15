import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ConfirmPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to home after 3 seconds
    const timer = setTimeout(() => {
      navigate('/');
    }, 1000);

    return () => clearTimeout(timer); // Cleanup on unmount
  }, [navigate]);

  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <h2>🎉 Thank you! Your order was placed successfully.</h2>
      <p>You will be redirected to the homepage shortly...</p>
    </div>
  );
};

export default ConfirmPage;
