import { Link } from "react-router-dom";
import { useState } from "react";
import { Collapse, Container } from "react-bootstrap";
import "./Sidebar.css";

const Sidebar = () => {
  const [openCategories, setOpenCategories] = useState(false);

  return (
    <div
      className="sidebar"
      style={{
        width: "220px",
        background: "black",
        padding: "30px",
        color: "white",
        fontFamily: "sans-serif",
      }}
    >
      <h5><i className="bi bi-card-list me-2"></i>NAVIGATION</h5>
      <ul className="nav flex-column mt-4">
        <li className="mb-2">
          <Link to="dashboard" style={{ textDecoration: "none", color: "white",fontSize:'18px' }} >
            <i className="bi bi-speedometer"></i> Dashboard
          </Link>
        </li>

        {/* Categories Dropdown */}
        <li className="mb-2">
          <span
            onClick={() => setOpenCategories(!openCategories)}
            className="text-white d-flex align-items-center"
            style={{ cursor: "pointer",textDecoration: "none", color: "white",fontSize:'18px' }}
          >
            <i className="bi bi-card-list me-2"></i> Catalog
            <i
              className={`bi ms-auto ${
                openCategories ? "bi-chevron-up" : "bi-chevron-down"
              }`}
            ></i>
          </span>

          <Collapse in={openCategories}>
            <ul className="list-unstyled ps-3 mt-1">
              <li>
                <Link
                  to="/admin/categories"
                  className="text-white text-decoration-none"
                >
                  Categories
                </Link>
              </li>
              <li className="mt-2">
                <Link to="admincourse" style={{ textDecoration: "none", color: "white",fontSize:'18px' }}>
          <i className="bi bi-book-fill me-2"></i>Course
          </Link>
              </li>
            </ul>
          </Collapse>
        </li>
      

        <li className="mb-2">
          <Link to="user" style={{ textDecoration: "none", color: "white",fontSize:'18px' }}>
            <i className="bi bi-people me-2"></i>Users
          </Link>
        </li>
        <li className="mb-2">
          <Link to="order" style={{ textDecoration: "none", color: "white",fontSize:'18px' }}>
            <i className="bi bi-people me-2"></i>Orders
          </Link>
        </li>
        <li className="mb-2">
          <Link to="banner" style={{ textDecoration: "none", color: "white",fontSize:'18px' }}>
          <i className="bi bi-gear-wide-connected me-2"></i>Settings
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
