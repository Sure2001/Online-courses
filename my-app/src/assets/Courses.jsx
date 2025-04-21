import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import Laptop from "../images/laptop.jpg";
import "./courses.css";

function Courses() {
  const courses = [
    {
      title: "Full Stack Development",
      category: "Web Design",
      rating: "4.9",
      classes: "25",
      students: "185",
      path: "/frontend",
    },
    {
      title: "Mobile App Development",
      category: "App Design",
      rating: "5.0",
      classes: "8",
      students: "400",
      path: "/mobileapp",
    },
    {
      title: "Software Testing Course",
      category: "Software",
      rating: "4.9",
      classes: "15",
      students: "312",
      path: "/softwaretesting",
    },
    {
      title: "Data Science Course",
      category: "Data Science",
      rating: "4.9",
      classes: "25",
      students: "185",
      path: "/datascience",
    },
    {
      title: "UI/UX Design Course",
      category: "UI/UX Design",
      rating: "5.0",
      classes: "8",
      students: "400",
      path: "/uiux",
    },
    {
      title: "Digital Marketing Course",
      category: "Digital Marketing",
      rating: "4.9",
      classes: "15",
      students: "312",
      path: "/digitalmarketing",
    },
  ];

  return (
    <div className="courses-container">
      <Container className="courses">
        <h2>Our Popular Courses</h2>
        <p>Discover our most sought-after courses...</p>
        <Row className="courses-row">
          {courses.map((course, index) => (
            <Col sm={12} md={4} lg={4} key={index}>
              <div className="course-card">
                <img src={Laptop} alt={course.title} />
                <div className="card-list">
                  <ul><li>{course.category}</li></ul>
                  <span><i className="bi bi-star-fill"></i> {course.rating}</span>
                </div>
                <div className="card-list-2">
                  <p>{course.title}</p>
                  <span><i className="bi bi-book"></i> {course.classes} classes</span>
                  <span><i className="bi bi-person-fill"></i> {course.students} Students</span>
                </div>
                <div className="card-list-4 text-center mt-2">
                  <Link to={course.path}>
                    <button className="buy-btn">Read More</button>
                  </Link>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default Courses;
