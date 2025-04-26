// src/my-admin/AdminLogin.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Card } from 'react-bootstrap';
import { toast } from 'react-toastify';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const demoAdmins = [
    { email: 'admin@example.com', password: 'admin123', route: '/dashboard' },
    { email: 'demo@admin.com', password: 'demo123', route: '/dashboard' },
  ];

  const handleLogin = (e) => {
    e.preventDefault();

    const matchedAdmin = demoAdmins.find(
      (admin) => admin.email === email && admin.password === password
    );

    if (matchedAdmin) {
      localStorage.setItem('isAdminLoggedIn', 'true'); // store login state
      toast.success('Login successful!');
      navigate(matchedAdmin.route);
    } else {
      toast.error('Invalid credentials!');
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card className="p-4" style={{ width: '400px' }}>
        <h3 className="mb-4 text-center">Admin Login</h3>
        <Form onSubmit={handleLogin}>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="w-100">
            Login
          </Button>
        </Form>
        <div className="mt-3 text-muted small">
          <strong>Demo Credentials:</strong><br />
          admin@example.com / admin123<br />
          demo@admin.com / demo123
        </div>
      </Card>
    </Container>
  );
};

export default AdminLogin;
