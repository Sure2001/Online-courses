import React, { useState } from 'react';
import axios from 'axios';
import {
  Modal,
  Form,
  Button,
  Row,
  Col,
  Toast,
  ToastContainer
} from 'react-bootstrap';
import { useCart } from './CartContext';
import { useNavigate } from 'react-router-dom'; // 🔁 Import for navigation

const BillPage = ({ show, onClose }) => {
  const { cartItems, setCartItems } = useCart();
  const navigate = useNavigate(); // 🔁 Initialize navigation hook

  const [billing, setBilling] = useState({
    firstName: '',
    lastName: '',
    company: '',
    address1: '',
    address2: '',
    city: '',
    state: 'Bihar',
    zip: '',
    phone: '',
    email: '',
    notes: '',
    reviewInvite: false,
  });

  const [error, setError] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setBilling({
      ...billing,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');

    if (!billing.firstName.trim() || !billing.lastName.trim() || !billing.address1.trim() || !billing.city.trim() || !billing.zip.trim()) {
      setError('Please fill out all required fields.');
      return;
    }

    try {
      const payload = {
        billing,
        items: cartItems,
        subtotal,
        paymentMethod: 'COD',
      };

      const res = await axios.post('http://localhost:5000/api/orders', payload);

      const msg = res.data.message || 'Order placed successfully!';
      setSuccessMsg(msg);
      setCartItems([]);
      setBilling({
        firstName: '',
        lastName: '',
        company: '',
        address1: '',
        address2: '',
        city: '',
        state: 'Bihar',
        zip: '',
        phone: '',
        email: '',
        notes: '',
        reviewInvite: false,
      });
      setShowToast(true);

      setTimeout(() => {
        onClose();
        navigate('/'); // 🔁 Redirect to home page
      }, 3000);

    } catch (err) {
      console.error('Order error:', err);
      setError(err.response?.data?.message || 'Order placement failed');
    }
  };

  return (
    <>
      <Modal show={show} onHide={onClose} size="xl" centered scrollable>
        <Modal.Header closeButton>
          <Modal.Title>Checkout</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {error && (
            <div className="text-danger text-center fw-semibold mb-3">{error}</div>
          )}

          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={7}>
                <h5>Billing details</h5>
                <Row>
                  <Col style={{ height: 'auto' }}>
                    <Form.Group className="mb-3">
                      <Form.Label>First Name *</Form.Label>
                      <Form.Control
                        name="firstName"
                        value={billing.firstName}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col style={{ height: 'auto' }}>
                    <Form.Group className="mb-3">
                      <Form.Label>Last Name *</Form.Label>
                      <Form.Control
                        name="lastName"
                        value={billing.lastName}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Label>Company Name (optional)</Form.Label>
                  <Form.Control
                    name="company"
                    value={billing.company}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Country / Region *</Form.Label>
                  <Form.Control defaultValue="India" disabled />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Street Address *</Form.Label>
                  <Form.Control
                    name="address1"
                    value={billing.address1}
                    onChange={handleChange}
                    required
                  />
                  <Form.Control
                    name="address2"
                    className="mt-2"
                    placeholder="Apartment, suite, etc. (optional)"
                    value={billing.address2}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Row>
                  <Col style={{ height: 'auto' }}>
                    <Form.Group className="mb-3">
                      <Form.Label>City *</Form.Label>
                      <Form.Control
                        name="city"
                        value={billing.city}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col style={{ height: 'auto' }}>
                    <Form.Group className="mb-3">
                      <Form.Label>State *</Form.Label>
                      <Form.Select
                        name="state"
                        value={billing.state}
                        onChange={handleChange}
                      >
                        <option>Andhra Pradesh</option>
                        <option>Delhi</option>
                        <option>Bihar</option>
                        <option>Tamil Nadu</option>
                        <option>Maharashtra</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Label>PIN Code *</Form.Label>
                  <Form.Control
                    name="zip"
                    type="number"
                    value={billing.zip}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Phone *</Form.Label>
                  <Form.Control
                    name="phone"
                    type="tel"
                    value={billing.phone}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Email *</Form.Label>
                  <Form.Control
                    name="email"
                    type="email"
                    value={billing.email}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Order Notes</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={2}
                    name="notes"
                    value={billing.notes}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>

              <Col md={5}>
                <h5>Your Order</h5>
                <div className="border p-3 rounded">
                  {cartItems.map((item, idx) => (
                    <div key={idx} className="d-flex justify-content-between mb-2">
                      <span>{item.title} × {item.quantity || 1}</span>
                      <span>₹{(item.price * (item.quantity || 1)).toFixed(2)}</span>
                    </div>
                  ))}

                  <hr />
                  <div className="d-flex justify-content-between">
                    <strong>Subtotal</strong>
                    <span>₹{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="d-flex justify-content-between">
                    <strong>Total</strong>
                    <span className="text-success fw-bold">₹{subtotal.toFixed(2)}</span>
                  </div>
                  <hr />
                  <div className="mb-3">
                    <strong>Cash on Delivery</strong>
                    <p className="text-muted mb-0">Pay with cash upon delivery.</p>
                  </div>

                  <Form.Check
                    type="checkbox"
                    name="reviewInvite"
                    label="Would you like to be invited to review your order?"
                    checked={billing.reviewInvite}
                    onChange={handleChange}
                  />

                  <Button type="submit" variant="danger" className="w-100 mt-3">
                    PLACE ORDER
                  </Button>
                </div>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Success Toast */}
      <ToastContainer position="top-center" className="p-3">
        <Toast
          bg="success"
          onClose={() => setShowToast(false)}
          show={showToast}
          delay={3000}
          autohide
        >
          <Toast.Header>
            <strong className="me-auto">Success</strong>
          </Toast.Header>
          <Toast.Body className="text-white">{successMsg}</Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
};

export default BillPage;
