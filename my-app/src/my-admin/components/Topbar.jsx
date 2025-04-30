import { useNavigate, Link } from "react-router-dom"; // ✅ Import Link
import { Dropdown } from "react-bootstrap";
import 'bootstrap-icons/font/bootstrap-icons.css';
import A from "../avatar-01.jpg";

const Topbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // You can clear auth tokens here if needed
    navigate("/adminlogin");
  };

  return (
    <div className="d-flex justify-content-between align-items-center px-4 py-2 border-bottom bg-light">
      <div>
        <h5 className="mb-0">Dashboard</h5>
      </div>

      <div className="d-flex align-items-center">
        <Dropdown align="end">
          <Dropdown.Toggle
            variant="light"
            id="dropdown-basic"
            className="d-flex align-items-center border-0 bg-transparent"
          >
            <img
              src={A}
              alt="Admin Avatar"
              className="rounded-circle me-2"
              width="40"
              height="40"
            />
            <span className="fw-medium">Admin</span>
          </Dropdown.Toggle>

          <Dropdown.Menu>
            {/* ✅ Use Link for SPA routing */}
            <Dropdown.Item as={Link} to="/adminprofile">
              Profile
            </Dropdown.Item>
            <Dropdown.Item href="/">My Course</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item onClick={handleLogout} className="text-danger">
              <i className="bi bi-box-arrow-right me-2"></i> Logout
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </div>
  );
};

export default Topbar;
