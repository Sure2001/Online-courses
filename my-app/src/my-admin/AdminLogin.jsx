import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Card, InputGroup } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { FaUser, FaLock, FaSignInAlt } from 'react-icons/fa';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const demoAdmins = [
    { email: 'admin@example.com', password: 'admin123', route: '/admin' },
    { email: 'demo@admin.com', password: 'demo123', route: '/admin' },
  ];

  const handleLogin = (e) => {
    e.preventDefault();

    const matchedAdmin = demoAdmins.find(
      (admin) => admin.email === email && admin.password === password
    );

    if (matchedAdmin) {
      localStorage.setItem('isAdminLoggedIn', 'true');
      toast.success('Login successful!');
      navigate(matchedAdmin.route);
    } else {
      toast.error('Invalid credentials!');
    }
  };

  return (
    <Container
      style={{ minHeight: '100vh' }}
      className="d-flex justify-content-center align-items-center"
    >
      <Card style={{ width: '400px', border: '1px solid #ddd', borderRadius: '4px' }}>
        <div
          style={{
            backgroundColor: '#f5f5f5',
            padding: '12px 16px',
            borderBottom: '1px solid #ddd',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontWeight: 500,
            fontSize: '1rem',
          }}
        >
          <FaLock />
          Please enter your login details.
        </div>

        <Card.Body>
          <Form onSubmit={handleLogin}>
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <InputGroup>
                <InputGroup.Text>
                  <FaUser />
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="demo@admin.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </InputGroup>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <InputGroup>
                <InputGroup.Text>
                  <FaLock />
                </InputGroup.Text>
                <Form.Control
                  type="password"
                  placeholder="demo123"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </InputGroup>
            </Form.Group>

            <div className="mb-3">
              <a
                href="#"
                style={{
                  fontSize: '0.875rem',
                  color: '#007bff',
                  textDecoration: 'none',
                }}
              >
                Forgotten Password
              </a>
            </div>

            <Button
              variant="primary"
              type="submit"
              className="w-100"
              style={{ backgroundColor: '#0275d8', border: 'none' }}
            >
              <FaSignInAlt className="me-2" />
              Login
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default AdminLogin;
