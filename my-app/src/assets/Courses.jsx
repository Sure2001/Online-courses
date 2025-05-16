import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import Laptop from "../images/laptop.jpg";
import "./courses.css";

function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/courses");
        if (!res.ok) throw new Error("Failed to fetch courses");
        const result = await res.json();

        console.log("Fetched courses:", result);

        if (result.success && Array.isArray(result.data)) {
          setCourses(result.data);
        } else {
          setCourses([]);
        }
      } catch (err) {
        console.error("Error fetching courses:", err);
        setCourses([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) return <p>Loading courses...</p>;

  return (
    <div className="courses-container">
      <Container className="courses">
        <h2>Our Popular Courses</h2>
        <p>Discover our most sought-after courses...</p>

        <Row className="courses-row">
          {Array.isArray(courses) && courses.length > 0 ? (
            courses.map((course) => (
              <Col sm={12} md={4} lg={4} key={course._id}>
                <div className="course-card">
  <img src={course.image || Laptop} alt={course.title} />
  <div className="card-list">
    {(course.category || course.subCategory) && (
      <ul>
        {course.category && <li><strong>Category:</strong> {course.category}</li>}
        {course.subCategory && <li><strong>Subcategory:</strong> {course.subCategory}</li>}
      </ul>
    )}
  </div>
  <div className="card-list-2">
    <p>{course.title}</p>
    {course.classes && (
      <span><i className="bi bi-book"></i> {course.classes} classes</span>
    )}
    {course.students && (
      <span><i className="bi bi-person-fill"></i> {course.students} Students</span>
    )}
  </div>
  <div className="card-list-4 text-center mt-2">
    <Link to={course.path || "#"}>
      <button className="buy-btn">Read More</button>
    </Link>
  </div>
</div>

              </Col>
            ))
          ) : (
            <Col>
              <p className="text-danger">No courses available at the moment.</p>
            </Col>
          )}
        </Row>
      </Container>
    </div>
  );
}

export default Courses;
