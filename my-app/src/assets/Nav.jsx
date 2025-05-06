import React, { useState, useRef, useEffect } from "react";
import { Navbar, Nav, NavDropdown, Container, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Nav.css";
import { FaShoppingCart } from "react-icons/fa";
import { useCart } from "../cartpages/CartContext";
import CartSummary from "../cartpages/CartSummary";

const NavigationBar = () => {
  const { cartItems } = useCart();
  const [showPopup, setShowPopup] = useState(false);
  const cartRef = useRef(null);
  const totalItems = cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0);

  // Close cart dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cartRef.current && !cartRef.current.contains(event.target)) {
        setShowPopup(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <Navbar bg="light" expand="lg" className="border-bottom shadow-sm py-3">
      <Container>
        <Navbar.Brand as={Link} to="/">Etech.</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-between">
          <Nav className="me-auto">
            <NavDropdown title="Courses" id="courses-dropdown" className="multi-column-dropdown">
              <div className="dropdown-grid">
                <NavDropdown.Item as={Link} to="/frontend">Full Stack Development</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/mobileapp">Mobile App Development</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/softwaretesting">Software Testing Course</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/datascience">Data Science Course</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/uiux">UI/UX Design Course</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/digitalmarketing">Digital Marketing Course</NavDropdown.Item>
              </div>
            </NavDropdown>

            <NavDropdown title="Teachers" id="teachers-dropdown">
              <NavDropdown.Item as={Link} to="/fullstack">Full Stack Teachers</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/uiuxteacher">UI/UX Teachers</NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title="Offers" id="offers-dropdown">
              <NavDropdown.Item href="#">50%</NavDropdown.Item>
              <NavDropdown.Item href="#">10%</NavDropdown.Item>
            </NavDropdown>

            <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
          </Nav>

          <div className="nav-button d-flex align-items-center position-relative" ref={cartRef}>
            <div
              className="position-relative"
              onClick={() => setShowPopup(prev => !prev)}
              style={{ cursor: "pointer" }}
            >
              <div className="cart d-flex align-items-center gap-1">
                <FaShoppingCart className="card-icon" />
                <span>Cart</span>
                {totalItems > 0 && (
                  <Badge bg="danger" pill className="position-absolute top-0 start-100 translate-middle">
                    {totalItems}
                  </Badge>
                )}
              </div>
            </div>

            {showPopup && (
              <div
                className="position-absolute shadow border rounded"
                style={{
                  top: "40px",
                  right: "0px",
                  zIndex: 1000,
                  background: "white",
                  minWidth: "300px",
                }}
              >
                <CartSummary />
              </div>
            )}

            {/* <Link to="/signin" className="btn main-1 ms-3">Sign in</Link>
            <Link to="/signup" className="btn main-2 ms-2">Sign up</Link> */}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
