import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import digitalImage from '../images/Digital-Marketing.jpg';
import '../assets/CourseStyles.css';
import { useCart } from '../cartpages/CartContext';

export const levelPrices = {
  Beginner: 4999,
  Intermediate: 6999,
  Advanced: 9499,
};

const DigitalMarketingCourse = () => {
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
          title: 'Digital Marketing',
          level: level,
          price: levelPrices[level],
        });
      });
      toast.success('🛒 Course(s) added to cart successfully!');
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
              Become a digital marketing expert by mastering SEO, social media strategy, content marketing,
              PPC campaigns, and email marketing with real-time tools and analytics.
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
              <Form.Check
                type="checkbox"
                label="Beginner - ₹4,999 (SEO + Basics)"
                checked={selectedLevels.includes('Beginner')}
                onChange={() => handleCheckboxChange('Beginner')}
              />
              <Form.Check
                type="checkbox"
                label="Intermediate - ₹6,999 (Ads + Social Media)"
                checked={selectedLevels.includes('Intermediate')}
                onChange={() => handleCheckboxChange('Intermediate')}
              />
              <Form.Check
                type="checkbox"
                label="Advanced - ₹9,499 (Full Campaign Strategy)"
                checked={selectedLevels.includes('Advanced')}
                onChange={() => handleCheckboxChange('Advanced')}
              />
            </Form>

            <div className="d-flex justify-content-center gap-3 mt-4">
              <Button variant="outline-primary" onClick={handleAddToCart}>
                Add to Cart
              </Button>
              <Link to="/signin">
                <Button variant="primary" onClick={handleEnroll}>
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

export default DigitalMarketingCourse;
