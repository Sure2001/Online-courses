import React, { useState } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import digitalImage from "../images/Digital-Marketing.jpg";
import "../assets/CourseStyles.css";
import { useCart } from "../cartpages/CartContext";

export const levelPrices = {
  Beginner: 4999,
  Intermediate: 6999,
  Advanced: 9499,
};

const DigitalMarketingCourse = () => {
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
          title: "Digital Marketing",
          level: level,
          price: levelPrices[level],
        });
      });
      toast.success("🛒 Course(s) added to cart successfully!");
    }
  };

  const handleEnroll = () => {
    const allLevels = Object.keys(levelPrices);

    allLevels.forEach((level) => {
      addToCart({
        title: "Digital Marketing",
        level: level,
        price: levelPrices[level],
      });
    });

    toast.success("✅ Enrolled in Digital Marketing (All Levels)");

    // 👇 Redirect to cart page
    navigate('/login');
  };

  return (
    <Container className="py-5">
      <h2 className="text-center mb-4">Digital Marketing</h2>
      <Row className="align-items-center">
        <Col md={6}>
          <img
            src={digitalImage}
            alt="Digital Marketing"
            className="img-fluid rounded shadow"
          />
        </Col>
        <Col md={6}>
          <Card className="p-4 shadow">
            <h4>Course Overview</h4>
            <p>
              Become a digital marketing expert by mastering SEO, social media
              strategy, content marketing, PPC campaigns, and email marketing
              with real-time tools and analytics.
            </p>

            <h5>Syllabus Highlights:</h5>
            <ul>
              <li>SEO and SEM Basics</li>
              <li>Google Ads & Analytics</li>
              <li>Content Marketing</li>
              <li>Social Media Strategy</li>
              <li>Email Marketing & Automation</li>
            </ul>

            <h5>Project Examples:</h5>
            <ul>
              <li>SEO Audit & Report</li>
              <li>Google Ad Campaign Plan</li>
              <li>Social Media Calendar Design</li>
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
           <div className="d-flex justify-content-end gap-3 mt-4">
                         <Button style={{background:'green', width: '25%'}} onClick={handleAddToCart}>
                           Add to Cart
                         </Button>
                         <Button style={{background:'blue', width: '25%'}} onClick={handleEnroll}>
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

export default DigitalMarketingCourse;
