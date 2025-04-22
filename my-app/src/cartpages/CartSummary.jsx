import React, { useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import { useCart } from '../cartpages/CartContext';
import { FaTrash } from 'react-icons/fa';
import fullstackImage from '../images/fullstack.jpg';
import ViewPage from '../cartpages/ViewPage'; // ✅ View Cart Modal
import BillPage from '../cartpages/BillPage'; // ✅ Billing Modal

const CartSummary = () => {
  const { cartItems, setCartItems } = useCart();
  const [showModal, setShowModal] = useState(false);   // View Cart
  const [showBill, setShowBill] = useState(false);     // Billing Page

  const handleRemove = (index) => {
    const updated = [...cartItems];
    updated.splice(index, 1);
    setCartItems(updated);
  };

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * (item.quantity || 1),
    0
  );

  return (
    <div className="p-3 cart-summary" style={{ alignItems: 'center' }}>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Image</th>
            <th>Course Title</th>
            <th>Level</th>
            <th>Price</th>
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
                  className="img-fluid rounded"
                  style={{ width: '80px', height: '80px' }}
                />
              </td>
              <td>{item.title}</td>
              <td>{item.level}</td>
              <td>₹{item.price.toFixed(2)}</td>
              <td>
                <FaTrash
                  role="button"
                  color="gray"
                  onClick={() => handleRemove(index)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <hr />
      <div className="d-flex justify-content-end">
        <strong>SUBTOTAL:</strong>
        <span className="text-success ms-2">₹{subtotal.toFixed(2)}</span>
      </div>
      <div className="d-flex justify-content-end mb-4">
        <strong>TOTAL:</strong>
        <span className="text-success ms-2">₹{subtotal.toFixed(2)}</span>
      </div>

      <div className="d-flex gap-2 justify-content-end">
        <Button variant="success" className="w-10" onClick={() => setShowModal(true)}>
          View Cart
        </Button>
        <Button variant="warning" className="w-10" onClick={() => setShowBill(true)}>
          Checkout
        </Button>
      </div>

      {/* ✅ View Cart Modal */}
      <ViewPage show={showModal} onClose={() => setShowModal(false)} />

      {/* ✅ Billing Page Modal */}
      <BillPage show={showBill} onClose={() => setShowBill(false)} />
    </div>
  );
};

export default CartSummary;
