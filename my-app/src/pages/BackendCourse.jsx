import React from 'react';
import { Container, Row, Col, Card, Table } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import backendImage from "../images/backend.jpg";
import "../assets/CourseStyles.css";

const BackendCourse = () => {
  return (
    <Container className="py-5">
      <motion.h2
        className="text-center mb-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Backend Development
      </motion.h2>

      <Row className="align-items-center">
        <Col md={6}>
          <motion.img
            src={backendImage}
            alt="Backend"
            className="img-fluid rounded shadow"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.7 }}
          />
        </Col>

        <Col md={6}>
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="p-4 shadow">
              <h4>Course Overview</h4>
              <p>
                Master the server-side of web development with Node.js, Express, MongoDB, and more.
                Perfect for developers aiming to build scalable and secure backend systems.
              </p>

              <h5>Syllabus Highlights:</h5>
              <ul>
                <li><strong>Node.js & Express.js</strong> – Server creation & routing.<br /><em>Example:</em> User authentication system.</li>
                <li><strong>MongoDB & Mongoose</strong> – NoSQL database management.<br /><em>Example:</em> Blog CMS backend.</li>
                <li><strong>REST API & JWT Auth</strong> – Secure and scalable APIs.<br /><em>Example:</em> Token-based login system.</li>
                <li><strong>File Handling & Middleware</strong> – Uploads, validation, error handling.<br /><em>Example:</em> Image upload with filters.</li>
                <li><strong>Deployment & Debugging</strong> – Hosting, environment setup.<br /><em>Example:</em> Deploy to Render or Vercel.</li>
              </ul>

              <h5>Project Examples:</h5>
              <ul>
                <li>Blog API with Auth</li>
                <li>File Upload Backend</li>
                <li>Course Management System</li>
                <li>Fullstack MERN App (API Side)</li>
              </ul>

              <h5>Accommodation Type:</h5>
              <ul>
                <li><strong>Mode:</strong> Online</li>
                <li><strong>Duration:</strong> 8 Weeks</li>
                <li><strong>Support:</strong> Mentor Chat + Recordings</li>
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
                    <td>Intro to Node, Express, MongoDB</td>
                    <td>₹5,999</td>
                  </tr>
                  <tr>
                    <td>Intermediate</td>
                    <td>REST APIs, Auth, Middleware</td>
                    <td>₹7,999</td>
                  </tr>
                  <tr>
                    <td>Advanced</td>
                    <td>JWT, File Handling, Deployment</td>
                    <td>₹9,999</td>
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

export default BackendCourse;
