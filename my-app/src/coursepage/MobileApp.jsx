import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { useCart } from '../cartpages/CartContext'; // ✅ Using CartContext
import 'react-toastify/dist/ReactToastify.css';
import mobileAppImage from '../images/mobileapp.png';
import '../assets/CourseStyles.css';

const levelPrices = {
  Beginner: 4999,
  Intermediate: 6999,
  Advanced: 8999,
};

const MobileAppCourse = () => {
  const [selectedLevels, setSelectedLevels] = useState([]);
 const { addToCart } = useCart();

  const handleCheckboxChange = (level) => {
    setSelectedLevels((prev) =>
      prev.includes(level) ? prev.filter((l) => l !== level) : [...prev, level]
    );
  };

  const handleAddToCart = () => {
    if (selectedLevels.length === 0) {
      toast.error('⚠️ Please select at least one level before adding to cart');
    } else {
      selectedLevels.forEach((level) => {
        addToCart({
          title: 'Mobile App Development',
          level: level,
          price: levelPrices[level],
        });
      });
      toast.success(`🛒 Added: Mobile App Development (${selectedLevels.join(', ')}) to cart`);
    }
  };

  const handleEnroll = () => {
    if (selectedLevels.length === 0) {
      toast.error('⚠️ Please select at least one level before enrolling');
    } else {
      toast.success(`✅ Enrolling for: ${selectedLevels.join(', ')}`);
    }
  };

  return (
    <Container className="py-5">
      <h2 className="text-center mb-4">
        Mobile App Development
      </h2>

      <Row className="align-items-center">
        <Col md={6}>
          <img
            src={mobileAppImage}
            alt="Mobile App Development"
            className="img-fluid rounded shadow"
          />
        </Col>
        <Col md={6}>
          <Card className="p-4 shadow">
            <h4>Course Overview</h4>
            <p>
              Learn to build powerful mobile apps using Flutter and React Native. This course will guide you from fundamentals to advanced concepts in mobile development.
            </p>

            <h5>Syllabus Highlights:</h5>
            <ul>
              <li>Dart & Flutter Basics</li>
              <li>React Native & Expo</li>
              <li>Firebase Integration</li>
              <li>State Management & Navigation</li>
            </ul>

            <h5>Project Examples:</h5>
            <ul>
              <li>Todo List App</li>
              <li>Online Food Delivery App</li>
              <li>Social Media App</li>
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

export default MobileAppCourse;
