import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Spinner, Container, Card, Alert, Button } from "react-bootstrap";
import { useCart } from "../cartpages/CartContext"; // Adjust the import path if needed
import { toast } from "react-toastify";

const CourseDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/courses/${id}`);
        if (!res.ok) {
          throw new Error("Course not found");
        }
        const data = await res.json();
        if (data.success) {
          setCourse(data.data);
        } else {
          setError("Course not found.");
        }
      } catch (err) {
        console.error(err);
        setError("Failed to fetch course details.");
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

const handleAddToCart = () => {
  if (course) {
    addToCart({ ...course, quantity: 1 });
    toast.success("Course added to cart!");
  }
};

const handleEnrollNow = () => {
  if (course) {
    addToCart({ ...course, quantity: 1 });
    toast.success("Enrolled successfully!");
    navigate("/login");
  }
};


  if (loading) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-5">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container className="py-5" style={{ maxWidth: "700px" }}>
      <Card>
        {course.image && (
          <Card.Img
            variant="top"
            src={course.image}
            alt={course.title}
            style={{ maxHeight: "300px", objectFit: "cover" }}
          />
        )}
        <Card.Body>
          <Card.Title className="mb-3">{course.title}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            Category: {course.type} | Subcategory: {course.subCategory}
          </Card.Subtitle>
          <Card.Text>
            {course.description || "No description provided."}
          </Card.Text>
          <p><strong>Price:</strong> ₹{course.price || "N/A"}</p>
          <p><strong>Level:</strong> {course.level || "N/A"}</p>

          <div className="d-flex gap-3 mt-4">
            <Button variant="outline-primary" onClick={handleAddToCart}>
              Add to Cart
            </Button>
            <Button variant="success" onClick={handleEnrollNow}>
              Enroll Now
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default CourseDetails;
