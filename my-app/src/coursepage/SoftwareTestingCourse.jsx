import React, { useState } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useCart } from "../cartpages/CartContext";
import testingImage from "../images/software.jpg";
import "react-toastify/dist/ReactToastify.css";
import "../assets/CourseStyles.css";

export const levelPrices = {
  Beginner: 3999,
  Intermediate: 5999,
  Advanced: 7999,
};

const SoftwareTestingCourse = () => {
  const [selectedLevels, setSelectedLevels] = useState([]);
  const { addToCart } = useCart();
  const navigate = useNavigate();

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
      const allLevels = Object.keys(levelPrices);
  
      allLevels.forEach((level) => {
        addToCart({
          title: 'Software Testing',
          level: level,
          price: levelPrices[level],
        });
      });
  
      toast.success('✅ Enrolled in Software Testing (All Levels)');
  
      // 👇 Redirect to cart page
      // navigate('/card');
    };

  return (
    <Container className="py-5">
      <h2 className="text-center mb-4">Software Testing</h2>
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
                  label={`${level} - ₹${price.toLocaleString()} ${
                    level === "Beginner"
                      ? "(Basics + React)"
                      : level === "Intermediate"
                      ? "(Node.js + MongoDB)"
                      : "(Full Stack + Deployment)"
                  }`}
                  checked={selectedLevels.includes(level)}
                  onChange={() => handleCheckboxChange(level)}
                />
              ))}
            </Form>

            <div className="d-flex justify-content-center gap-3 mt-4">
              <Button variant="success" onClick={handleAddToCart}>
                Add to Cart
              </Button>
              <Button variant="primary" onClick={handleEnroll}>
                Enroll Now
              </Button>
            </div>
          </Card>
        </Col>
      </Row>

       <ToastContainer
       position="top-right" // ✅ changed from top-center to top-right
       autoClose={3000}
       hideProgressBar={false}
       pauseOnHover
       draggable
       closeOnClick
       toastStyle={{
         backgroundColor: '#2e2e2e', // ✅ light black background
         color: '#007bff', // ✅ blue text
       }}
     />
    </Container>
  );
};

export default SoftwareTestingCourse;
