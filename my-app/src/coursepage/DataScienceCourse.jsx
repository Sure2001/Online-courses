import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import dataScienceImage from '../images/datascience.jpg';
import '../assets/CourseStyles.css';
import { useCart } from '../cartpages/CartContext';




export const levelPrices = {
  Beginner: 5999,
  Intermediate: 7999,
  Advanced: 9999,
};

const DataScienceCourse = () => {
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
          title: 'Data Science',
          level: level,
          price: levelPrices[level],
        });
      });
      toast.success(`🛒 Added to cart: Data Science (${selectedLevels.join(', ')}) level(s)`);
    }
  };

  const handleEnroll = () => {
    const allLevels = Object.keys(levelPrices);
    allLevels.forEach((level) => {
      addToCart({
        title: 'Data Science',
        level: level,
        price: levelPrices[level],
      });
    });
    toast.success(`✅ Enrolled in Data Science (All Levels)`);
    // 👇 Redirect to cart page
    // navigate('/card');
  };

  return (
    <Container className="py-5">
      <h2 className="text-center mb-4">Data Science</h2>
      <Row className="align-items-center">
        <Col md={6}>
          <img src={dataScienceImage} alt="Data Science" className="img-fluid rounded shadow" />
        </Col>
        <Col md={6}>
          <Card className="p-4 shadow">
            <h4>Course Overview</h4>
            <p>
              Learn data analysis, machine learning, and visualization using Python. Gain practical
              skills in handling real-world data and building AI-powered applications.
            </p>

            <h5 className="mt-4">Syllabus Highlights:</h5>
            <ul>
              <li>Python for Data Science</li>
              <li>Pandas, NumPy, and Data Wrangling</li>
              <li>Data Visualization (Matplotlib, Seaborn)</li>
              <li>Machine Learning with scikit-learn</li>
              <li>Mini Projects & Capstone</li>
            </ul>

            <h5>Project Examples:</h5>
            <ul>
              <li>Customer Churn Prediction</li>
              <li>Sales Forecast Dashboard</li>
              <li>Movie Recommendation System</li>
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

export default DataScienceCourse;
