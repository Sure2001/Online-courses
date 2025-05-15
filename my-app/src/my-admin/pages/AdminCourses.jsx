import React, { useEffect, useState } from "react";
import { Table, Container, Button, Form, Modal } from "react-bootstrap";
import { FaTrashAlt, FaFileCsv, FaFileExcel, FaEdit, FaEye } from "react-icons/fa";
import * as XLSX from "xlsx";

function AdminCourses() {
  const [courses, setCourses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filteredSubCategories, setFilteredSubCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newCourse, setNewCourse] = useState({
  categoryType: "",
  subCategory: "",
  description: "",
  image: "",
  level: "",
  price: "",
  status: "Active"
});

  const itemsPerPage = 5;

  useEffect(() => {
    fetchCourses();
    fetchCategories();
  }, []);

  const fetchCourses = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/courses");
      const data = await res.json();
      if (data.success) {
        const sorted = data.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setCourses(sorted);
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/categories");
      const data = await res.json();
      if (data.success) {
        setCategories(data.data);
      }
    } catch (err) {
      console.error("Error loading categories:", err);
    }
  };

  const handleCategoryTypeChange = (type) => {
    setNewCourse({ ...newCourse, categoryType: type, subCategory: "" });
    const filtered = categories.filter((cat) => cat.type === type);
    setFilteredSubCategories(filtered);
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      const allIds = currentCourses.map((c) => c._id);
      setSelectedCourses(allIds);
    } else {
      setSelectedCourses([]);
    }
  };

  const handleSelectCourse = (id) => {
    setSelectedCourses((prev) =>
      prev.includes(id) ? prev.filter((cid) => cid !== id) : [...prev, id]
    );
  };

  const handleBulkDelete = async () => {
    for (const id of selectedCourses) {
      await fetch(`http://localhost:5000/api/courses/${id}`, { method: "DELETE" });
    }
    setSelectedCourses([]);
    fetchCourses();
  };

  const exportToCSV = () => {
    const ws = XLSX.utils.json_to_sheet(courses);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Courses");
    XLSX.writeFile(wb, "courses.csv");
  };

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(courses);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Courses");
    XLSX.writeFile(wb, "courses.xlsx");
  };

  const handleAddCourse = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/courses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCourse),
      });
      const data = await res.json();
      if (data.success) {
        fetchCourses();
        setShowModal(false);
        setNewCourse({
          categoryType: "",
          subCategory: "",
          description: "",
          image: "",
          level: "",
          price: "",
          status: "Active"
        });
      } else {
        alert("Failed to add course");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const filteredCourses = courses.filter((c) =>
    c.title.toLowerCase().includes(search.toLowerCase())
  );

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentCourses = filteredCourses.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredCourses.length / itemsPerPage);

  return (
    <Container className="mt-4">
      <h3>Course List</h3>
      <div className="d-flex justify-content-between mb-3">
        <input
          type="text"
          placeholder="Search by course name"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          className="form-control"
          style={{ maxWidth: "300px" }}
        />

        <div className="d-flex align-items-center gap-3">
          <Button variant="success" onClick={() => setShowModal(true)}>Add Course</Button>
          {selectedCourses.length > 0 && (
            <button onClick={handleBulkDelete} style={{ color: "red", border: "none", background: "transparent", fontSize: "20px" }}>
              <FaTrashAlt />
            </button>
          )}
          <button onClick={exportToCSV} style={{ color: "skyblue", border: "none", background: "transparent", fontSize: "20px" }}>
            <FaFileCsv />
          </button>
          <button onClick={exportToExcel} style={{ color: "green", border: "none", background: "transparent", fontSize: "20px" }}>
            <FaFileExcel />
          </button>
        </div>
      </div>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>
              <Form.Check type="checkbox" onChange={handleSelectAll} checked={selectedCourses.length === currentCourses.length} />
            </th>
            <th>Level</th>
            <th>Price</th>
            <th>Image</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((course) => (
            <tr key={categories._id}>
              <td>
                <Form.Check
                  type="checkbox"
                  checked={selectedCourses.includes(course._id)}
                  onChange={() => handleSelectCourse(course._id)}
                />
              </td>
              
              <td>{course.level}</td>
              <td>{course.price}</td>
              <td><img src={course.image} alt={course.title} style={{ width: "50px" }} /></td>
              <td>{course.status}</td>
              <td>
                <Button variant="info" size="sm" className="me-1"><FaEye /></Button>
                <Button variant="warning" size="sm" className="me-1"><FaEdit /></Button>
                <Button variant="danger" size="sm"><FaTrashAlt /></Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <div className="d-flex justify-content-center">
        {Array.from({ length: totalPages }, (_, i) => (
          <Button
            key={i + 1}
            variant={currentPage === i + 1 ? "primary" : "light"}
            onClick={() => setCurrentPage(i + 1)}
            className="me-1"
          >
            {i + 1}
          </Button>
        ))}
      </div>

      {/* Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Course</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleAddCourse}>
            <Form.Group className="mb-2">
              <Form.Label>Category Type</Form.Label>
              <Form.Select
                value={newCourse.categoryType}
                onChange={(e) => handleCategoryTypeChange(e.target.value)}
                required
              >
                <option value="">Select Type</option>
                {[...new Set(categories.map((cat) => cat.type))].map((type, i) => (
                  <option key={i} value={type}>{type}</option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Subcategory</Form.Label>
              <Form.Select
                value={newCourse.subCategory}
                onChange={(e) => setNewCourse({ ...newCourse, subCategory: e.target.value })}
                required
              >
                <option value="">Select Subcategory</option>
                {filteredSubCategories.map((cat, i) => (
                  <option key={i} value={cat.subCategory}>{cat.subCategory}</option>
                ))}
              </Form.Select>
            </Form.Group>

            
            <Form.Group className="mb-2">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={newCourse.description}
                onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
                required
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Course Level</Form.Label>
              <Form.Control
                type="text"
                value={newCourse.level}
                onChange={(e) => setNewCourse({ ...newCourse, level: e.target.value })}
                required
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                value={newCourse.price}
                onChange={(e) => setNewCourse({ ...newCourse, price: e.target.value })}
                required
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                type="text"
                value={newCourse.image}
                onChange={(e) => setNewCourse({ ...newCourse, image: e.target.value })}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Select
                value={newCourse.status}
                onChange={(e) => setNewCourse({ ...newCourse, status: e.target.value })}
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </Form.Select>
            </Form.Group>

            <Button type="submit" variant="success">Add Course</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
}

export default AdminCourses;
