import React from 'react';
import { Table, Container, Button } from 'react-bootstrap';
import { useCart } from './CartContext';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 

const OrderSummaryPage = () => {
  const { cartItems, clearCart, isReturningCustomer } = useCart(); 
  const navigate = useNavigate();

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * (item.quantity || 1),
    0
  );

  const total = subtotal; 

  const handleConfirmOrder = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
  
    if (!user?.email) {
      alert('Please register or log in to place an order.');
      navigate('/login');
      return;
    }

    const userType = isReturningCustomer ? "Returning Customer" : "New Customer";


    const orderData = {
      userEmail: user.email,
      userName: user.username,
      userType,  // Track customer type
      items: cartItems.map((item) => ({
        title: item.title,
        level: item.level || 'N/A',
        quantity: item.quantity || 'N/A',
        price: item.price,
      })),
      subtotal,
      total,
    };
  
    try {
      const response = await fetch('http://localhost:5000/api/orders/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });
  
      const result = await response.json();
      if (response.ok) {
        clearCart();  // Clear the cart after confirming the order
  
        // Show success toast notification
        toast.success('Order placed successfully!', {
          position: "top-center", 
          autoClose: 1000, 
        });
  
        setTimeout(() => {
          navigate('/confirm');  
        }, 1000); 
      } else {
        alert(result.message || 'Failed to place order.');
      }
    } catch (err) {
      console.error(err);
      alert('An error occurred while placing the order.');
    }
  };

  return (
    <Container className="py-5">
      <h2 className="mb-4">Order Summary</h2>

      {cartItems.length === 0 ? (
        <p className="text-muted text-center">No items in your cart.</p>
      ) : (
        <>
          <Table bordered hover responsive>
            <thead>
              <tr>
                <th>Title</th>
                <th>Level</th>
                <th>Qty</th>
                <th>Unit Price</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item, index) => (
                <tr key={index}>
                  <td>{item.title}</td>
                  <td>{item.level || 'N/A'}</td>
                  <td>{item.quantity || 'N/A'}</td>
                  <td>₹{item.price.toFixed(2)}</td>
                  <td>₹{(item.price * (item.quantity || 1)).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </Table>

          <div className="text-end mt-3">
            <h5>Subtotal: ₹{subtotal.toFixed(2)}</h5>
            <hr />
            <h4 className="text-success">Grand Total: ₹{total.toFixed(2)}</h4>

            <Button onClick={handleConfirmOrder} style={{background:'green', border: 'none', width:'20%'}}>
              Confirm Order
            </Button>
          </div>
        </>
      )}

      <Button style={{background:'blue', border: 'none', width:'20%'}} onClick={() => navigate('/view-cart')}>
        Back to Cart
      </Button>

      <ToastContainer /> {/* Render the toast container */}
    </Container>
  );
};

export default OrderSummaryPage;
