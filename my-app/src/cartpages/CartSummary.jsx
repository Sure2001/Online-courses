import React, { useState } from 'react';
import { Button, Image } from 'react-bootstrap';
import { useCart } from '../cartpages/CartContext';
import { FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import fullstackImage from '../images/fullstack.jpg';

const CartSummary = () => {
  const { cartItems, setCartItems } = useCart();
  const navigate = useNavigate();

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
    <div
      style={{
        width: '330px',
        backgroundColor: 'white',
        border: '1px solid #ddd',
        borderRadius: '10px',
        padding: '16px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        zIndex: 999,
      }}
    >
      {cartItems.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#888' }}>
          Your cart is empty
        </p>
      ) : (
        <div
          style={{
            maxHeight: '300px',
            overflowY: 'auto',
            marginBottom: '16px',
          }}
        >
          {[...cartItems].reverse().map((item, index) => (
            <div
              key={index}
              style={{
                display: 'flex',
                alignItems: 'start',
                marginBottom: '16px',
                borderBottom: '1px solid #eee',
                paddingBottom: '12px',
                gap: '10px',
                fontSize: '14px',
              }}
            >
              <Image
                src={item.image || fullstackImage}
                alt={item.title}
                style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '6px',
                  objectFit: 'cover',
                }}
              />
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>
                  {item.title}
                </div>
                <div style={{ color: '#666' }}>{item.level}</div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginTop: '6px',
                  }}
                >
                  <div>x {item.quantity || 1}</div>
                  <div>₹{item.price.toFixed(2)}</div>
                </div>
              </div>
              <FaTrash
                color="gray"
                style={{ cursor: 'pointer', marginTop: '5px' }}
                onClick={() => handleRemove(index)}
              />
            </div>
          ))}
        </div>
      )}

      {cartItems.length > 0 && (
        <>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontWeight: 'bold',
              marginBottom: '12px',
              fontSize: '15px',
            }}
          >
            <span>Subtotal</span>
            <span style={{ color: 'green' }}>₹{subtotal.toFixed(2)}</span>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <Button
              style={{
                flex: 1,
                backgroundColor: '#343a40',
                border: 'none',
                fontWeight: 'bold',
              }}
              onClick={() => navigate('/view-cart')}
            >
              View Cart
            </Button>
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

     
    </div>
  );
};

export default CartSummary;
