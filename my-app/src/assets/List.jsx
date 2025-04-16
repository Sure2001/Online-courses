import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import A from "../images/student.png";
import "./List.css";

function Teacher() {
  return (
    <>
      <Container className="teacher-container">
        <Row className="teacher-row">
          <Col xs={12} sm={12} md={12} lg={6}>
            <h1>
              If You Are A Certified Teacher Then{" "}
              <span>Become An Instructor</span>
            </h1>
            <p>
              Unlock the opportunity to inspire and educate by joining our team
              of instructors. If you're a certified teacher, elevate your impact
              and share your expertise with learners worldwide.
            </p>
            <h1>Enjoy Many Perks</h1>
            <div className="felx">
              <ul>
                <li>Global Impact</li>
                <li>Flexible Schedule</li>
                <li>Innovative Teaching Tools</li>
                <li>Recognition And Reputation</li>
                <li>Creative Freedom</li>
                <li>Monetize Your Expertise</li>
                <li>Professional Development</li>
                <li>Networking Opportunities</li>
              </ul>
              <button className="main-4">Become An Instructor</button>
            </div>
          </Col>
          <Col xs={12} sm={12} md={12} lg={6}>
            <div className="teacher-sqr">
              <div className="sqr-1">
                <div className="sqr-2">
                    <img src={A} alt="Teacher"/>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Teacher;
