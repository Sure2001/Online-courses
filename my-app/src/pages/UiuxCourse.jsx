import React from 'react';
import { Container, Row, Col, Card, Table } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import uiuxImage from "../images/ux.jpg";
import "../assets/CourseStyles.css";

const UiuxCourse = () => {
  return (
    <Container className="py-5">
      <motion.h2
        className="text-center mb-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        UI/UX Design Course
      </motion.h2>

      <Row className="align-items-center">
        <Col md={6}>
          <motion.img
            src={uiuxImage}
            alt="UI/UX"
            className="img-fluid rounded shadow"
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.7 }}
          />
        </Col>

        <Col md={6}>
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="p-4 shadow">
              <h4>Course Overview</h4>
              <p>
                Learn to create intuitive and visually compelling user interfaces and experiences.
                Perfect for aspiring designers who want to master tools like Figma and understand the user journey.
              </p>

              <h5>Syllabus Highlights:</h5>
              <ul>
                <li><strong>Design Principles & Typography</strong> – Visual hierarchy, spacing.<br /><em>Example:</em> Landing page redesigns.</li>
                <li><strong>Figma & Prototyping</strong> – UI kit creation and interactions.<br /><em>Example:</em> Interactive app mockup.</li>
                <li><strong>User Flows & Wireframing</strong> – Journey mapping.<br /><em>Example:</em> Ecommerce checkout flow.</li>
                <li><strong>Accessibility & Color Theory</strong> – Inclusive design choices.<br /><em>Example:</em> Colorblind-friendly palette.</li>
                <li><strong>Portfolio Design</strong> – Building your UI/UX case study.<br /><em>Example:</em> Real client portfolio website.</li>
              </ul>

              <h5>Project Examples:</h5>
              <ul>
                <li>Redesign an App UI</li>
                <li>High-Fidelity Figma Prototype</li>
                <li>User Persona & Flow Document</li>
                <li>Full Portfolio Website</li>
              </ul>

              <h5>Accommodation Type:</h5>
              <ul>
                <li><strong>Mode:</strong> Online</li>
                <li><strong>Duration:</strong> 6 Weeks</li>
                <li><strong>Support:</strong> Feedback Sessions + Recordings</li>
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
                    <td>Design Basics, Wireframes</td>
                    <td>₹4,999</td>
                  </tr>
                  <tr>
                    <td>Intermediate</td>
                    <td>Figma, Prototyping, Flows</td>
                    <td>₹6,999</td>
                  </tr>
                  <tr>
                    <td>Advanced</td>
                    <td>Case Studies, Portfolio, Testing</td>
                    <td>₹8,999</td>
                  </tr>
                </tbody>
              </Table>

              <div className="text-center mt-3">
                <Link to="/signin">
                  <button className="px-4 py-2">Sign In to Enroll</button>
                </Link>
              </div>
            </Card>
          </motion.div>
        </Col>
      </Row>
    </Container>
  );
};

export default UiuxCourse;
