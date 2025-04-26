import React, { useState } from 'react';
import { Navbar, Nav, NavDropdown, Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AdminNavbar from './AdminNavbar';


const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <>
      <AdminNavbar />
      <div className="d-flex">
        <div className={`sidebar bg-dark text-white p-3 ${sidebarOpen ? 'active' : 'collapsed'}`}>
          <Button variant="light" size="sm" onClick={toggleSidebar} className="mb-3">
            {sidebarOpen ? 'Hide' : 'Show'}
          </Button>
          {sidebarOpen && (
            <>
              <Navbar.Brand className="text-white">Admin Panel</Navbar.Brand>
              <Nav defaultActiveKey="/home" className="flex-column">
                <Nav.Link as={Link} to="/" className="text-white">Home</Nav.Link>
                <Nav.Link as={Link} to="/courses" className="text-white">Courses</Nav.Link>
                <Nav.Link as={Link} to="/enrollments" className="text-white">Enrollments</Nav.Link>
                <Nav.Link as={Link} to="/reports" className="text-white">Reports</Nav.Link>
                <NavDropdown title="Settings" id="collasible-nav-dropdown" className="text-white">
                  <NavDropdown.Item as={Link} to="/profile">Profile</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/settings">App Settings</NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </>
          )}
        </div>
        <Container className="p-5">
          <h2>Welcome to the Admin Dashboard</h2>
          {/* Dashboard Content Goes Here */}
        </Container>
      </div>
    </>
  );
};

export default Dashboard;
