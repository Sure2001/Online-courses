import React from 'react';
import { Container, Row, Col, Card, Table } from "react-bootstrap";
import { Link } from 'react-router-dom';
import frontendImage from "../images/frontend.jpg";
import "../assets/CourseStyles.css";

const FrontendCourse = () => {
  return (
    <Container className="py-5">
      <h2 className="text-center mb-4">Frontend Development</h2>
      <Row className="align-items-center">
        <Col md={6}>
          <img src={frontendImage} alt="Frontend" className="img-fluid rounded shadow" />
        </Col>
        <Col md={6}>
          <Card className="p-4 shadow">
            <h4>Course Overview</h4>
            <p>
              Learn the fundamentals of frontend web development using HTML, CSS,
              JavaScript, and modern libraries like React. This course is perfect
              for beginners and those looking to polish their UI-building skills.
            </p>

            <h5>Syllabus Highlights:</h5>
            <ul>
              <li><strong>HTML5 & Semantic Tags</strong> – Build accessible content.<br /><em>Example:</em> Blog layout with semantic tags.</li>
              <li><strong>CSS3, Flexbox & Grid</strong> – Layout design.<br /><em>Example:</em> Responsive product cards.</li>
              <li><strong>JavaScript ES6+</strong> – Interactive logic.<br /><em>Example:</em> Form validation, sliders.</li>
              <li><strong>React.js</strong> – Component-based UI.<br /><em>Example:</em> Portfolio with routing.</li>
              <li><strong>API Integration</strong> – Real-time data.<br /><em>Example:</em> News/weather apps.</li>
            </ul>

            <h5>Project Examples:</h5>
            <ul>
              <li>Personal Portfolio Website</li>
              <li>Responsive Landing Page</li>
              <li>React To-Do App</li>
              <li>Live Weather App</li>
            </ul>

            <h5>Accommodation Type:</h5>
            <ul>
              <li><strong>Mode:</strong> Online</li>
              <li><strong>Duration:</strong> 6 Weeks</li>
              <li><strong>Support:</strong> Live Q&A + Recordings</li>
              <li><strong>Certification:</strong> Yes</li>
            </ul>

            <h5 className="mt-4">Course Levels & Fees:</h5>
            <Table striped bordered hover size="sm">
              <thead>
                <tr>
                  <th>Level</th>
                  <th>Topics Covered</th>
                  <th>Fee</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Beginner</td>
                  <td>HTML, CSS, Basics of JS</td>
                  <td>₹4,999</td>
                </tr>
                <tr>
                  <td>Intermediate</td>
                  <td>JS, React Basics</td>
                  <td>₹6,999</td>
                </tr>
                <tr>
                  <td>Advanced</td>
                  <td>React Hooks, API, Deployment</td>
                  <td>₹8,999</td>
                </tr>
              </tbody>
            </Table>

            <div className="text-center mt-3">
              <Link to="/signin">
                <button  className="px-4 py-2">Sign In to Enroll</button>
              </Link>
            </div>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default FrontendCourse;
