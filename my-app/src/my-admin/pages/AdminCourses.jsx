import React, { useEffect, useState } from "react";
import { Table, Container, Button, Form } from "react-bootstrap";
import { FaTrashAlt, FaFileCsv, FaFileExcel, FaEdit, FaEye } from "react-icons/fa";
import * as XLSX from "xlsx";

function AdminCourses() {
  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const itemsPerPage = 5;

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/courses");
      const data = await res.json();
      if (data.success) {
        const sorted = data.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setCourses(sorted);
      } else {
        alert("Failed to load courses");
      }
    } catch (err) {
      console.error("Error:", err);
    }
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

  const handleBulkDelete = () => {
    const updatedCourses = courses.filter((course) => !selectedCourses.includes(course._id));
    setCourses(updatedCourses);
    setSelectedCourses([]);
    // Add delete API call here
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
            <th>Course Name</th>
            <th>Level</th>
            <th>Price</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentCourses.map((course) => (
            <tr key={course._id}>
              <td>
                <Form.Check
                  type="checkbox"
                  checked={selectedCourses.includes(course._id)}
                  onChange={() => handleSelectCourse(course._id)}
                />
              </td>
              <td>{course.title}</td>
              <td>{course.level}</td>
              <td>{course.price}</td>
              <td><img src={course.image} alt={course.title} style={{ width: "50px" }} /></td>
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
    </Container>
  );
}

export default AdminCourses;