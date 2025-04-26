import React from 'react';
import { Nav, Dropdown } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';


const AdminSidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isAdminLoggedIn');
    navigate('/adminlogin');
  };

  return (
    <div className="admin-sidebar d-flex flex-column p-3 text-white bg-dark">
      <Link to="/dashboard" className="fs-4 text-white text-decoration-none mb-4 fw-bold">
        Administration
      </Link>

      <Nav className="flex-column gap-2">
        <Nav.Link as={Link} to="/" className="text-white">Home</Nav.Link>
        <Nav.Link as={Link} to="/courses" className="text-white">Courses</Nav.Link>
        <Nav.Link as={Link} to="/enrollments" className="text-white">Enrollments</Nav.Link>
        <Nav.Link as={Link} to="/reports" className="text-white">Reports</Nav.Link>
        <Nav.Link as={Link} to="/settings" className="text-white">Settings</Nav.Link>
      </Nav>

      {/* Profile at bottom, aligned to right */}
      <div className="mt-auto d-flex justify-content-end">
        <Dropdown align="end">
          <Dropdown.Toggle
            variant="dark"
            id="dropdown-user"
            className="d-flex align-items-center border-0 bg-transparent"
          >
            <span className="d-none d-md-inline text-white fw-medium me-2">Demo User</span>
            <img
              src="https://i.pravatar.cc/40?img=3"
              alt="Profile"
              className="rounded-circle"
              width="40"
              height="40"
            />
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </div>
  );
};

export default AdminSidebar;
