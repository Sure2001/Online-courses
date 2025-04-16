import React from "react";
import { Navbar, Nav, NavDropdown, Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Nav.css";
// Optionally import an icon package
import { FaShoppingCart } from "react-icons/fa"; // npm install react-icons

const NavigationBar = () => {
  return (
    <>
      <Navbar bg="light" expand="lg" className="border-bottom shadow-sm py-3">
        <Container>
          <Navbar.Brand as={Link} to="/">
            Etech.
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse
            id="basic-navbar-nav"
            className="justify-content-between"
          >
            <Nav className="me-auto">
              <NavDropdown title="Courses" id="courses-dropdown">
                <NavDropdown.Item as={Link} to="/frontend">
                  FrontEnd
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/backend">
                  BackEnd
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/uiux">
                  UI/UX
                </NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="Teachers" id="teachers-dropdown">
                <NavDropdown.Item as={Link} to="/fullstack">
                  Full Stack Teachers
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/uiuxteacher">
                  UI/UX Teachers
                </NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="Offers" id="offers-dropdown">
                <NavDropdown.Item href="#">50%</NavDropdown.Item>
                <NavDropdown.Item href="#">10%</NavDropdown.Item>
              </NavDropdown>
              <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
            </Nav>

            <div className="nav-button d-flex">
            <Link to="/card" className="card-button">
  <FaShoppingCart className="card-icon" />
  Card
</Link>

              <Link to="/signup" className="btn main-1">
                Sign up
              </Link>
              <Link to="/signin" className="btn main-2">
                Sign in
              </Link>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default NavigationBar;
