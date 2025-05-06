import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { useCart } from '../cartpages/CartContext';
import 'react-toastify/dist/ReactToastify.css';
import fullstackImage from '../images/fullstack.jpg';
import '../assets/CourseStyles.css';

export const levelPrices = {
  Beginner: 4999,
  Intermediate: 5999,
  Advanced: 6999,
};

const FullStackCourse = () => {
  const [selectedLevels, setSelectedLevels] = useState([]);
  const { addToCart } = useCart();
  const navigate = useNavigate(); // 👈 for redirecting to cart

  const handleCheckboxChange = (level) => {
    setSelectedLevels((prev) =>
      prev.includes(level)
        ? prev.filter((l) => l !== level)
        : [...prev, level]
    );
  };

  const handleAddToCart = () => {
    if (selectedLevels.length === 0) {
      toast.error('⚠️ Please select at least one level before adding to cart');
    } else {
      selectedLevels.forEach((level) => {
        addToCart({
          title: 'Full Stack Development',
          level: level,
          price: levelPrices[level],
        });
      });
      toast.success(`🛒 Added to cart: ${selectedLevels.join(', ')} level(s)`);
    }
  };

  const handleEnroll = () => {
    const allLevels = Object.keys(levelPrices);

    allLevels.forEach((level) => {
      addToCart({
        title: 'Full Stack Development',
        level: level,
        price: levelPrices[level],
      });
    });

    toast.success('✅ Enrolled in Full Stack Development (All Levels)');

    // 👇 Redirect to cart page
    navigate('/login');
  };

  return (
    <Container className="py-5">
      <h2 className="text-center mb-4">Full Stack Development</h2>
      <Row className="align-items-center">
        <Col md={6}>
          <img
            src={fullstackImage}
            alt="Full Stack"
            className="img-fluid rounded shadow"
          />
        </Col>
        <Col md={6}>
          <Card className="p-4 shadow">
            <h4>Course Overview</h4>
            <p>
              Master frontend and backend development using modern tech like React,
              Node.js, and MongoDB. Perfect for anyone looking to become a complete developer.
            </p>

            <h5>Syllabus Highlights:</h5>
            <ul>
              <li>HTML, CSS, JavaScript, React</li>
              <li>Node.js, Express.js</li>
              <li>MongoDB, REST APIs</li>
              <li>Authentication & Deployment</li>
            </ul>

            <h5>Project Examples:</h5>
            <ul>
              <li>Full-stack Blog Application</li>
              <li>E-commerce Store</li>
            </ul>

            <h5>Course Levels & Fees:</h5>
            <Form>
              {Object.entries(levelPrices).map(([level, price]) => (
                <Form.Check
                  key={level}
                  type="checkbox"
                  label={`${level} - ₹${price.toLocaleString()} ${
                    level === 'Beginner'
                      ? '(Basics + React)'
                      : level === 'Intermediate'
                      ? '(Node.js + MongoDB)'
                      : '(Full Stack + Deployment)'
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

export default FullStackCourse;
