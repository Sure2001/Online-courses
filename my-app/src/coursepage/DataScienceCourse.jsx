import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import dataScienceImage from '../images/datascience.jpg';
import '../assets/CourseStyles.css';
import { useCart } from '../cartpages/CartContext';


export const levelPrices = {
  Beginner: 4999,
  Intermediate: 7499,
  Advanced: 9999,
};

const DataScienceCourse = () => {
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
          title: 'Data Science',
          level: level,
          price: levelPrices[level],
        });
      });
      toast.success(`🛒 Added: Data Science (${selectedLevels.join(', ')}) to cart`);
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

            <h5>
              Course Levels & Fees:
            </h5>
            <Form>
              <Form.Check
                type="checkbox"
                label="Beginner - ₹4,999 (Python + Basic Analytics)"
                checked={selectedLevels.includes('Beginner')}
                onChange={() => handleCheckboxChange('Beginner')}
              />
              <Form.Check
                type="checkbox"
                label="Intermediate - ₹7,499 (ML Basics + Projects)"
                checked={selectedLevels.includes('Intermediate')}
                onChange={() => handleCheckboxChange('Intermediate')}
              />
              <Form.Check
                type="checkbox"
                label="Advanced - ₹9,999 (ML + Deep Learning)"
                checked={selectedLevels.includes('Advanced')}
                onChange={() => handleCheckboxChange('Advanced')}
              />
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

export default DataScienceCourse;
