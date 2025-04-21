import React, { useState } from "react";
import {
  Container,
  Table,
  Button,
  Image,
  Spinner,
  Alert,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useCart } from "./CartContext";
import Laptop from "../images/laptop.jpg";
import { BsTrash } from "react-icons/bs";

function CartPage() {
  const { cartItems, removeFromCart, updateQuantity } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const calculateTotal = () => {
    return cartItems
      .reduce((acc, item) => acc + parseFloat(item.price) * item.quantity, 0)
      .toFixed(2);
  };

  const handleProceedToCheckout = () => {
    // Always redirect to SignIn before checkout
    navigate("/signin");
  };

  return (
    <Container className="my-5">
      <h2 className="mb-4 text-center">🛒 View Cart</h2>

      {errorMsg && <Alert variant="danger">{errorMsg}</Alert>}
      {successMsg && <Alert variant="success">{successMsg}</Alert>}

      {cartItems.length === 0 ? (
        <p className="text-center">Your cart is empty.</p>
      ) : (
        <>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Image</th>
                <th>Product</th>
                <th>Price ($)</th>
                <th>Course Level</th>
                <th>Quantity</th>
                <th>Total ($)</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((course, index) => (
                <tr key={index}>
                  <td>
                    <Image src={Laptop} alt="Course" rounded width={100} />
                  </td>
                  <td>{course.title}</td>
                  <td>{course.price}</td>
                  <td>{course.level}</td>
                  <td>
                    <div className="d-flex align-items-center gap-2">
                      <Button
                        variant="outline-secondary"
                        size="sm"
                        onClick={() => updateQuantity(index, "dec")}
                      >
                        -
                      </Button>
                      <span>{course.quantity}</span>
                      <Button
                        variant="outline-secondary"
                        size="sm"
                        onClick={() => updateQuantity(index, "inc")}
                      >
                        +
                      </Button>
                    </div>
                  </td>
                  <td>
                    {(parseFloat(course.price) * course.quantity).toFixed(2)}
                  </td>
                  <td className="text-center">
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => removeFromCart(index)}
                    >
                      <BsTrash />
                    </Button>
                  </td>
                </tr>
              ))}
              <tr>
                <td colSpan="5" className="text-end fw-bold">
                  Grand Total:
                </td>
                <td className="fw-bold">${calculateTotal()}</td>
                <td></td>
              </tr>
            </tbody>
          </Table>
          <div className="text-end">
            <Button
              variant="success"
              onClick={handleProceedToCheckout}
              disabled={loading}
            >
              {loading ? (
                <Spinner animation="border" size="sm" />
              ) : (
                "Proceed to Checkout"
              )}
            </Button>
          </div>
        </>
      )}
    </Container>
  );
}

export default CartPage;
