import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { useCart } from '../cartpages/CartContext'; // ✅ Context import
import 'react-toastify/dist/ReactToastify.css';
import fullstackImage from '../images/fullstack.jpg';
import '../assets/CourseStyles.css';

const levelPrices = {
  Beginner: 5999,
  Intermediate: 7999,
  Advanced: 9999,
};

const FullStackCourse = () => {
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
           title: 'Full Stack Development',
           level: level,
           price: levelPrices[level],
         });
       });
       toast.success(`🛒 Added: Full Stack Development (${selectedLevels.join(', ')}) to cart`);
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
              Master frontend and backend development using modern tech like React, Node.js,
              and MongoDB. Perfect for anyone looking to become a complete developer.
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
              <Form.Check
                type="checkbox"
                label="Beginner - ₹5,999 (Basics + React)"
                checked={selectedLevels.includes('Beginner')}
                onChange={() => handleCheckboxChange('Beginner')}
              />
              <Form.Check
                type="checkbox"
                label="Intermediate - ₹7,999 (Node.js + MongoDB)"
                checked={selectedLevels.includes('Intermediate')}
                onChange={() => handleCheckboxChange('Intermediate')}
              />
              <Form.Check
                type="checkbox"
                label="Advanced - ₹9,999 (Full Stack + Deployment)"
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

export default FullStackCourse;
