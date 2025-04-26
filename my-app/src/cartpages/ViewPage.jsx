import React, { useState } from 'react';
import { Modal, Button, Alert, ProgressBar, Form, Table } from 'react-bootstrap';
import { useCart } from '../cartpages/CartContext';
import { FaTrash } from 'react-icons/fa';
import fullstackImage from '../images/fullstack.jpg';
import BillPage from '../cartpages/BillPage'; // ✅ Billing Modal

const ViewPage = ({ show, onClose }) => {
  const { cartItems, setCartItems } = useCart();
  const [showBill, setShowBill] = useState(false);     // Billing Page

  const FREE_SHIPPING_THRESHOLD = 10000;
  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const progress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);

  const updateQuantity = (index, delta) => {
    const updated = [...cartItems];
    const newQty = Math.max(1, updated[index].quantity + delta);
    updated[index].quantity = newQty;
    setCartItems(updated);
  };

  const handleRemove = (index) => {
    const updated = [...cartItems];
    updated.splice(index, 1);
    setCartItems(updated);
  };

  return (
    <Modal show={show} onHide={onClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Your Cart</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {/* Free Shipping Alert */}
        <Alert variant={remaining === 0 ? 'success' : 'info'}>
          {remaining === 0 ? (
            '🎉 You’ve unlocked FREE Shipping!'
          ) : (
            <>Buy <strong>₹{remaining.toFixed(2)}</strong> more to enjoy FREE Shipping</>
          )}
          <ProgressBar
            now={progress}
            className="mt-2"
            variant={remaining === 0 ? 'success' : 'info'}
          />
        </Alert>

        {/* Cart Items Table */}
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Item</th>
              <th>Level</th>
              <th>Unit Price</th>
              <th>Quantity</th>
              <th>Total</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item, index) => (
              <tr key={index}>
                <td>
                  <img
                    src={fullstackImage}
                    alt={item.title}
                    className="me-3 rounded"
                    style={{ width: 50, height: 50 }}
                  />
                  {item.title}
                </td>
                <td>{item.level}</td>
                <td>₹{item.price.toFixed(2)}</td>
                <td>
                  <div className="d-flex align-items-center">
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      onClick={() => updateQuantity(index, -1)}
                    >−</Button>
                    <span className="mx-2">{item.quantity}</span>
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      onClick={() => updateQuantity(index, 1)}
                    >+</Button>
                  </div>
                </td>
                <td>₹{(item.price * item.quantity).toFixed(2)}</td>
                <td>
                  <FaTrash
                    role="button"
                    className="text-danger"
                    onClick={() => handleRemove(index)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        {/* Totals */}
        <div className="row mt-4">
          <div className="col-md-6">
            <div className="border p-3 rounded">
              <h5>Cart Totals</h5>
              <div className="d-flex justify-content-between py-1">
                <span>Subtotal</span>
                <span className="text-success">₹{subtotal.toFixed(2)}</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between fw-bold py-1">
                <span>Total</span>
                <span className="text-success">₹{subtotal.toFixed(2)}</span>
              </div>
               <Button variant="success" className="w-100 mt-3" onClick={() => setShowBill(true)}>
               Proceed to Checkout
                      </Button>
              {/* ✅ Billing Page Modal */}
      <BillPage show={showBill} onClose={() => setShowBill(false)} />
            </div>
            
          </div>
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ViewPage;
