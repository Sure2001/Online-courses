import React from 'react';
import { Button, Table, Container } from 'react-bootstrap';
import { useCart } from './CartContext';
import { FaTrash } from 'react-icons/fa';
import fullstackImage from '../images/fullstack.jpg';
import { useNavigate } from 'react-router-dom';

const ViewPage = () => {
  const { cartItems, setCartItems } = useCart();
  const navigate = useNavigate();

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * (item.quantity || 1),
    0
  );

  const updateQuantity = (index, delta) => {
    const updated = [...cartItems];
    updated[index].quantity = Math.max(1, (updated[index].quantity || 1) + delta);
    setCartItems(updated);
  };

  const handleRemove = (index) => {
    if (window.confirm("Are you sure you want to remove this item?")) {
      const updated = [...cartItems];
      updated.splice(index, 1);
      setCartItems(updated);
    }
  };

  return (
    <Container className="py-5">
      <h2 className="mb-4">Cart Details</h2>

      {cartItems.length === 0 ? (
        <p className="text-muted text-center">Your cart is empty.</p>
      ) : (
        <>
          <Table bordered hover responsive>
            <thead>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Level</th>
                <th>Price</th>
                <th>Qty</th>
                <th>Total</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item, index) => (
                <tr key={index}>
                  <td>
                    <img
                      src={item.image || fullstackImage}
                      alt={item.title}
                      style={{ width: 50, height: 50, objectFit: 'cover' }}
                    />
                  </td>
                  <td>{item.title}</td>
                  <td>{item.level}</td>
                  <td>₹{item.price.toFixed(2)}</td>
                  <td>
                    <div className="d-flex align-items-center">
                      <Button
                        size="sm"
                        variant="outline-secondary"
                        onClick={() => updateQuantity(index, -1)}
                      >
                        −
                      </Button>
                      <span className="mx-2">{item.quantity || 1}</span>
                      <Button
                        size="sm"
                        variant="outline-secondary"
                        onClick={() => updateQuantity(index, 1)}
                      >
                        +
                      </Button>
                    </div>
                  </td>
                  <td>₹{(item.price * (item.quantity || 1)).toFixed(2)}</td>
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

          <div className="text-end mt-3">
            <h5>
              Subtotal: <span className="text-success">₹{subtotal.toFixed(2)}</span>
            </h5>
            <Button
              style={{
                flex: 1,
                backgroundColor: 'green',
                border: 'none',
                color: '#fff',
                fontWeight: 'bold',
              }}
              onClick={() => navigate('/login')}
            >
              Checkout
            </Button>
          </div>
        </>
      )}

      <Button variant="secondary" className="mt-4" onClick={() => navigate('/')}>
        Continue Shopping
      </Button>
    </Container>
  );
};

export default ViewPage;
