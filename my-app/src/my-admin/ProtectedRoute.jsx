import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem('isAdminLoggedIn') === 'true';

  if (!isLoggedIn) {
    return <Navigate to="/adminlogin" replace />;
  }

  return children;
};

export default ProtectedRoute;
