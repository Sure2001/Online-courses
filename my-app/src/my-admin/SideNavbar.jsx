import React from 'react';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom'; // For navigation between pages

const SideNavbar = () => {
  return (
    <Navbar bg="light" expand="lg" className="flex-column p-3" style={{ height: '100vh' }}>
      <Container fluid>
        <Navbar.Brand href="#">Admin Panel</Navbar.Brand>
        <Nav defaultActiveKey="/home" className="flex-column">
          <Nav.Link as={Link} to="/">Home</Nav.Link>
          <Nav.Link as={Link} to="/courses">Courses</Nav.Link>
          <Nav.Link as={Link} to="/enrollments">Enrollments</Nav.Link>
          <Nav.Link as={Link} to="/reports">Reports</Nav.Link>
          <NavDropdown title="Settings" id="collasible-nav-dropdown">
            <NavDropdown.Item as={Link} to="/profile">Profile</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/settings">App Settings</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default SideNavbar;
