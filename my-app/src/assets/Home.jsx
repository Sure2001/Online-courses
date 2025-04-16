import React, { useState } from "react";
import { Container, Row, Col, Modal, Button, Form } from "react-bootstrap";
import "./Home.css";
import Student from "../images/student.png";
import avatar01 from "../images/avatar-01.jpg";
import avatar02 from "../images/avatar-02.jpg";
import avatar03 from "../images/avatar-03.jpg";
import avatar04 from "../images/avatar-04.jpg";
import { motion } from "framer-motion";
import axios from "axios";


const avatars = [avatar01, avatar02, avatar03, avatar04, avatar01];

const LandingPage = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleShowLogin = () => setShowLogin(true);
  const handleCloseLogin = () => setShowLogin(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/login", {
        email,
        password,
      });
      setMessage(res.data.message);
      handleCloseLogin();
    } catch (err) {
      setMessage(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <>
      <Container>
        <Row>
          {/* Left Content */}
          <Col>
            <motion.div
              className="countent"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
            >
              <motion.h1
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
              >
                Develop your skills in a new and unique way
              </motion.h1>

              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Explore a transformative approach to skill development on our
                online learning platform. Uncover a new realm of learning
                experiences and elevate your expertise in unique ways.
              </motion.p>

              <div className="buttom">
                <button className="main-3">Enroll Now</button>

                <motion.div
                  className="play-button"
                  animate={{ y: [0, -8, 0] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatType: "loop",
                    ease: "easeInOut",
                  }}
                >
                  <a
                    id="play-video"
                    className="video-play-button"
                    href="https://www.youtube.com/embed/hXAdt5w3sPQ"
                    data-toggle="modal"
                    data-target="#savoybeachhotel"
                  >
                    <span className="text">
                      <p>What's Etech?</p>
                    </span>
                  </a>
                </motion.div>
              </div>
            </motion.div>
          </Col>

          {/* Right Content */}
          <Col>
            <div className="student-card">
              {/* Decorative Circles */}
              <motion.div
                className="crile-1"
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatType: "loop",
                  ease: "easeInOut",
                }}>
                <div className="crile-2"></div>
              </motion.div>

              {/* Student Image */}
              <motion.img
                src={Student}
                className="student-image image-fluid"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, ease: "easeOut", delay: 0.8 }}
                alt="Student"
              />

              {/* Box 01 */}
              <motion.div
                className="box-01"
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, delay: 1 }}
              >
                <div className="icon" />
                <span>50+</span>
                <p>Online Courses</p>
              </motion.div>

              {/* Box 02 */}
              <motion.div
                className="box-02"
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, delay: 1.3 }}
              >
                <span>10k+</span>
                <p>Online Students</p>
                <div className="avatars">
                  {avatars.map((avatar, index) => (
                    <motion.img
                      key={index}
                      src={avatar}
                      alt="Avatar"
                      initial={{ scale: 0, rotate: 360 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: 1.5 + index * 0.1 }}
                    />
                  ))}
                </div>
              </motion.div>

              {/* Box 03 */}
              <motion.div
                className="box-03"
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 1.6 }}
              >
                <div>
                  <img src={avatar01} alt="Avatar" />
                  <h6>UI Design Class</h6>
                  <p>Today at 02:00 PM</p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleShowLogin}
                >
                  Join now
                </motion.button>
              </motion.div>
            </div>
          </Col>
        </Row>
      </Container>

      {/* Login Modal */}
      <Modal show={showLogin} onHide={handleCloseLogin} centered>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleLogin}>
            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            {message && (
              <p className="text-danger text-center">{message}</p>
            )}

            <Button  type="submit" className="w-100" style={{ background: "linear-gradient(180deg, #f36ed7, #d891f9)", border: "none" }}>
              Login
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default LandingPage;
