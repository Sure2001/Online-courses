import React from "react";
import {
  Navbar,
  Nav,
  NavDropdown,
  Container,
  Badge,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Nav.css";
import { FaShoppingCart } from "react-icons/fa";
import { useCart } from "../cartpages/CartContext"; // make sure path is correct

const NavigationBar = () => {
  const { cartCount } = useCart();

  return (
    <>
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

            <div className="nav-button d-flex align-items-center">
              <Link to="/card" className="card-button position-relative d-flex align-items-center gap-1">
                <FaShoppingCart className="card-icon" />
                <span>Cart</span>
                {cartCount > 0 && (
                  <Badge
                    pill
                    bg="danger"
                    className="position-absolute top-0 start-100 translate-middle"
                    style={{ fontSize: "0.7rem" }}
                  >
                    {cartCount}
                  </Badge>
                )}
              </Link>
              <Link to="/signin" className="btn main-1">Sign in</Link>
              <Link to="/signup" className="btn main-2">Sign up</Link>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default NavigationBar;
