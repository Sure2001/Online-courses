import { Navbar, Nav, NavDropdown, Container, Button, Image } from 'react-bootstrap';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import A from "../images/avatar-01.jpg";

export default function Layout() {
  const [expanded, setExpanded] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();  // Initialize navigate

  const handleLogout = () => {
    // Add your logout logic here
    console.log('User logged out');

    // Redirect to the admin login page after logout
    navigate('/adminlogin');  // Replace '/adminlogin' with your actual login page route
  };

  return (
    <>
      <div className="d-flex">
        {/* Side Navbar */}
        <div
          className={`bg-dark vh-100 p-3 position-fixed start-0 ${sidebarOpen ? 'd-block' : 'd-none'} d-md-block`}
          style={{ width: '250px', zIndex: 1020, top: '100px', color: 'white' }}
        >
          <h5 className="mb-2 fs-50">NAVIGATION</h5>
          <Nav className="flex-column">
            <Nav.Link href="#dashboard" className="text-white custom-nav-link">Dashboard</Nav.Link>
            <NavDropdown title="Catalog" id="catalog-dropdown" className="custom-nav-dropdown">
              <NavDropdown.Item href="#courses" className="custom-dropdown-item">Courses</NavDropdown.Item>
              <NavDropdown.Item href="#categories" className="custom-dropdown-item">Categories</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Orders" id="orders-dropdown" className="custom-nav-dropdown">
              <NavDropdown.Item href="#all-orders" className="custom-dropdown-item">All Orders</NavDropdown.Item>
              <NavDropdown.Item href="#pending-orders" className="custom-dropdown-item">Pending Orders</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Users" id="users-dropdown" className="custom-nav-dropdown">
              <NavDropdown.Item href="#all-users" className="custom-dropdown-item">All Users</NavDropdown.Item>
              <NavDropdown.Item href="#admins" className="custom-dropdown-item">Admins</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </div>

        {/* Main Content */}
        <div className="flex-grow-1" style={{ marginLeft: '0', marginTop: '80px' }}>
          {/* Top Navbar */}
          <Navbar bg="light" expand="md" fixed="top" className="shadow-sm">
            <Container fluid className="d-flex justify-content-between align-items-center">
              {/* Sidebar Toggle Button */}
              <Button
                variant="outline-primary"
                className="d-md-none me-2"
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                ☰
              </Button>

              {/* Logo */}
              <Navbar.Brand href="#home" style={{ color: 'blue' }}>
                Administration
              </Navbar.Brand>

              {/* User Image + Logout Button */}
              <Navbar.Toggle onClick={() => setExpanded(!expanded)} />
              <Navbar.Collapse in={expanded} className="justify-content-end align-items-center me-2">
                <Nav className="d-flex align-items-center">
                  <NavDropdown
                    title={
                      <Image src={A} roundedCircle width={40} height={40} style={{ objectFit: 'cover' }} />
                    }
                    id="user-dropdown"
                    align="end"
                  >
                    <NavDropdown.Item href="#profile">Profile</NavDropdown.Item>
                    <NavDropdown.Item href="#mycourses">My Courses</NavDropdown.Item>
                  </NavDropdown>
                  <Button variant="outline-danger" className="ms-3" onClick={handleLogout}>
                    Logout
                  </Button>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </div>
      </div>

      {/* Custom CSS inside a <style> tag */}
      <style jsx>{`
        /* Side Navbar Dropdown Title */
        .custom-nav-dropdown > a,
        .custom-nav-dropdown > .dropdown-toggle {
          color: white !important;
        }

        .custom-nav-dropdown > a:hover,
        .custom-nav-dropdown > .dropdown-toggle:hover,
        .custom-nav-dropdown.show > .dropdown-toggle {
          color: #0d6efd !important; /* Blue on hover */
        }

        /* Dropdown Items */
        .custom-dropdown-item {
          background-color: transparent;
          color: black !important;
        }
        .custom-dropdown-item:hover,
        .custom-dropdown-item:focus {
          color: #0d6efd !important;
          background-color: rgba(255, 255, 255, 0.1);
        }
      `}</style>
    </>
  );
}
