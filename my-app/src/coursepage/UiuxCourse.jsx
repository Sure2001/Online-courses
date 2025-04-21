import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Badge,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useCart } from "../cartpages/CartContext";
import uiuxImage from "../images/ux.jpg";
import "react-toastify/dist/ReactToastify.css";
import "../assets/CourseStyles.css";

const levelPrices = {
  Beginner: 3999,
  Intermediate: 6499,
  Advanced: 8999,
};
const UiuxCourse = () => {
  const [selectedLevels, setSelectedLevels] = useState([]);
  const { addToCart } = useCart();
  const handleCheckboxChange = (level) => {
    setSelectedLevels((prev) =>
      prev.includes(level) ? prev.filter((l) => l !== level) : [...prev, level]
    );
  };

  const handleAddToCart = () => {
    if (selectedLevels.length === 0) {
      toast.error("⚠️ Please select at least one level before adding to cart");
    } else {
      selectedLevels.forEach((level) => {
        addToCart({
          title: "UI/UX Design",
          level: level,
          price: levelPrices[level],
        });
      });
      toast.success(`🛒 Added: UI/UX Design (${selectedLevels.join(", ")}) to cart`);
    }
  };

  const handleEnroll = () => {
    if (selectedLevels.length === 0) {
      toast.error("⚠️ Please select at least one level before enrolling");
    } else {
      toast.success(`✅ Enrolling for: ${selectedLevels.join(", ")}`);
    }
  };

  return (
    <Container className="py-5">
      <h2 className="text-center mb-4">
        UI/UX Design
      </h2>
      <Row className="align-items-center">
        <Col md={6}>
          <img
            src={uiuxImage}
            alt="UI/UX Design"
            className="img-fluid rounded shadow"
          />
        </Col>
        <Col md={6}>
          <Card className="p-4 shadow">
            <h4>Course Overview</h4>
            <p>
              Learn to design intuitive user interfaces and engaging user
              experiences. This course covers design principles, wireframing,
              prototyping, and user testing.
            </p>

            <h5>Syllabus Highlights:</h5>
            <ul>
              <li>Design Thinking & User Research</li>
              <li>Wireframing & Prototyping Tools (Figma)</li>
              <li>UX Principles and Visual Hierarchy</li>
              <li>User Testing and Feedback</li>
              <li>Portfolio Projects</li>
            </ul>

            <h5>Project Examples:</h5>
            <ul>
              <li>Mobile App UI for E-commerce</li>
              <li>Dashboard Interface Design</li>
              <li>Landing Page Prototype</li>
            </ul>

            <h5>Course Levels & Fees:</h5>
            <Form>
              {Object.entries(levelPrices).map(([level, price]) => (
                <Form.Check
                  key={level}
                  type="checkbox"
                  label={`${level} - ₹${price.toLocaleString()}`}
                  checked={selectedLevels.includes(level)}
                  onChange={() => handleCheckboxChange(level)}
                />
              ))}
            </Form>

            <div className="d-flex justify-content-center gap-3 mt-4">
              <Button
                variant="outline-primary"
                onClick={handleAddToCart}
                disabled={selectedLevels.length === 0}
              >
                Add to Cart
              </Button>
              <Link to="/signin">
                <Button
                  variant="primary"
                  onClick={handleEnroll}
                  disabled={selectedLevels.length === 0}
                >
                  Enroll Now
                </Button>
              </Link>
            </div>
          </Card>
        </Col>
      </Row>

      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        pauseOnHover
        closeOnClick
      />
    </Container>
  );
};

export default UiuxCourse;
