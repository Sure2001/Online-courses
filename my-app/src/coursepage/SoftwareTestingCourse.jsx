import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useCart } from "../cartpages/CartContext";
import testingImage from "../images/software.jpg";
import "react-toastify/dist/ReactToastify.css";
import "../assets/CourseStyles.css";

const levelPrices = {
  Beginner: 3999,
  Intermediate: 5999,
  Advanced: 7999,
};
const SoftwareTestingCourse = () => {
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
          title: "Software Testing",
          level: level,
          price: levelPrices[level],
        });
      });
      toast.success(
        `🛒 Added: Software Testing (${selectedLevels.join(", ")}) to cart`
      );
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
        Software Testing
      </h2>
      <Row className="align-items-center">
        <Col md={6}>
          <img
            src={testingImage}
            alt="Software Testing"
            className="img-fluid rounded shadow"
          />
        </Col>
        <Col md={6}>
          <Card className="p-4 shadow">
            <h4>Course Overview</h4>
            <p>
              Learn manual and automated software testing techniques used in the
              industry. Understand tools like Selenium, JMeter, and get hands-on
              with real-world test case design.
            </p>

            <h5>Syllabus Highlights:</h5>
            <ul>
              <li>Manual Testing & SDLC/STLC</li>
              <li>Automation Testing with Selenium</li>
              <li>Performance Testing with JMeter</li>
              <li>Bug Tracking & Reporting Tools (JIRA)</li>
            </ul>

            <h5>Project Examples:</h5>
            <ul>
              <li>Test Case Design for E-commerce</li>
              <li>Selenium Automation Scripts</li>
              <li>Bug Report Documentation</li>
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
        draggable
        closeOnClick
      />
    </Container>
  );
};

export default SoftwareTestingCourse;
