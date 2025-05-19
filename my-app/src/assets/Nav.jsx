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
  const [subCategoryMap, setSubCategoryMap] = useState({}); // { subCategory: [courses] }

  const totalItems = cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cartRef.current && !cartRef.current.contains(event.target)) {
        setShowPopup(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/courses");
        const data = await res.json();
        if (data.success && Array.isArray(data.data)) {
          const map = {};
          data.data.forEach((course) => {
            const subCat = course.subCategory?.trim();
            if (subCat) {
              if (!map[subCat]) map[subCat] = [];
              map[subCat].push({
                title: course.title,
                path: `/course/${course._id}`, // Use course._id for routing
              });
            }
          });
          setSubCategoryMap(map);
        }
      } catch (err) {
        console.error("Failed to fetch courses", err);
      }
    };

    fetchCourses();
  }, []);

  return (
    <Navbar bg="light" expand="lg" className="border-bottom shadow-sm py-3">
      <Container>
        <Navbar.Brand as={Link} to="/">Etech.</Navbar.Brand>
        <Navbar.Toggle aria-controls="main-navbar" />
        <Navbar.Collapse id="main-navbar" className="justify-content-between">
          <Nav className="me-auto">
            {/* Dynamic Courses Dropdown by subCategory */}
            <NavDropdown title="Courses" id="courses-dropdown">
              {Object.entries(subCategoryMap).map(([subCategory, courses]) => (
                <NavDropdown key={subCategory} title={subCategory} drop="end">
                  {courses.map((course, idx) => (
                    <NavDropdown.Item as={Link} to={course.path} key={idx}>
                      {course.title}
                    </NavDropdown.Item>
                  ))}
                </NavDropdown>
              ))}
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
              onClick={() => setShowPopup((prev) => !prev)}
              style={{ cursor: "pointer" }}
            >
              <div className="cart d-flex align-items-center gap-1">
                <FaShoppingCart className="cart-icon" />
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
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
