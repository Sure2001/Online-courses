import React, { useEffect, useState } from "react";
import { Table, Container, Button, Form, Modal } from "react-bootstrap";
import { FaTrashAlt, FaFileCsv, FaFileExcel, FaEdit, FaEye,FaRegPlusSquare } from "react-icons/fa";
import * as XLSX from "xlsx";

function AdminCourses() {
  const [courses, setCourses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filteredSubCategories, setFilteredSubCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentEditId, setCurrentEditId] = useState(null);

  const [newCourse, setNewCourse] = useState({
    type: "",
    subCategory: "",
    title: "",
    description: "",
    image: "",
    level: "",
    price: "",
    status: "Enable",
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
      console.error("Error fetching courses:", err);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/categories");
      const data = await res.json();
      console.log(data);
      // if (data.success) {
        setCategories(data);
      // }
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };
  const handleTypeChange = (type) => {
    setNewCourse({ ...newCourse, type, subCategory: "" });
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
  try {
    await fetch("http://localhost:5000/api/courses", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ids: selectedCourses }),
    });
    setSelectedCourses([]);
    fetchCourses();
  } catch (err) {
    console.error(err);
    alert("Error deleting courses");
  }
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

  const handleAddOrUpdateCourse = async (e) => {
  e.preventDefault();
  try {
    const url = editMode
      ? `http://localhost:5000/api/courses/${currentEditId}`
      : "http://localhost:5000/api/courses";
    const method = editMode ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newCourse),
    });

    // Check if response is ok and content-type JSON
    const contentType = res.headers.get("content-type") || "";
    if (!res.ok) {
      const text = await res.text();
      alert(`Failed to save course: ${text}`);
      return;
    }

    if (contentType.includes("application/json")) {
      const data = await res.json();
      if (data.success) {
        fetchCourses();
        setShowModal(false);
        setEditMode(false);
        setCurrentEditId(null);
        resetForm();
      } else {
        alert("Failed to save course");
      }
    } else {
      alert("Unexpected response from server");
    }
  } catch (err) {
    console.error(err);
    alert("Error saving course");
  }
};


  const resetForm = () => {
    setNewCourse({
      type: "",
      subCategory: "",
      title: "",
      description: "",
      image: "",
      level: "",
      price: "",
      status: "Enable",
    });
  };

  const handleEdit = (course) => {
    setNewCourse(course);
    handleTypeChange(course.type);
    setEditMode(true);
    setCurrentEditId(course._id);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      await fetch(`http://localhost:5000/api/courses/${id}`, { method: "DELETE" });
      fetchCourses();
    }
  };

  const filteredCourses = courses.filter((c) =>
    c.title?.toLowerCase().includes(search.toLowerCase())
  );

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentCourses = filteredCourses.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredCourses.length / itemsPerPage);

  return (
    <div className="container mt-4">
      <h3>Course </h3>
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
          <button style={{ border: "none", color: "green", fontSize: "32px", background: "transparent" }}
                  title="Add New Banner"
           onClick={() => { setShowModal(true); resetForm(); }}>
                   <FaRegPlusSquare />
                  </button>
          {selectedCourses.length > 0 && (
            <button onClick={handleBulkDelete} style={{ color: "red", border: "none", background: "transparent", fontSize: "35px" }}>
              <FaTrashAlt />
            </button>
          )}
          <button onClick={exportToCSV} style={{ color: "skyblue", border: "none", background: "transparent", fontSize: "35px" }}>
            <FaFileCsv />
          </button>
          <button onClick={exportToExcel} style={{ color: "green", border: "none", background: "transparent", fontSize: "35px" }}>
            <FaFileExcel />
          </button>
        </div>
      </div>
<div style={{ border: "1px solid #ccc", padding: "20px", borderRadius: "5px" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "center" }}>
        <thead>
          <tr>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}><Form.Check type="checkbox" onChange={handleSelectAll} checked={selectedCourses.length === currentCourses.length} /></th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Category Type</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Subcategory</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Title</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Level</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Price</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Image</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Status</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentCourses.map((course) => (
            <tr key={course._id}>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                <Form.Check
                  type="checkbox"
                  checked={selectedCourses.includes(course._id)}
                  onChange={() => handleSelectCourse(course._id)}
                />
              </td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>{course.type}</td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>{course.subCategory}</td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>{course.title}</td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>{course.level}</td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>{course.price}</td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}><img src={course.image} alt="course" style={{ width: "50px" }} /></td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>{course.status}</td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                <button style={{ border: "none", color: "blue", fontSize: "18px", marginRight: "15px", background: "transparent" }} onClick={() => handleEdit(course)}><FaEdit /></button>
                <button style={{ border: "none", color: "green", fontSize: "18px", marginRight: "15px", background: "transparent" }} onClick={() => handleView(course)}><FaEye /></button>
                <button style={{ border: "none", color: "red", fontSize: "18px", marginRight: "15px", background: "transparent" }} onClick={() => handleDelete(course._id)}><FaTrashAlt /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-3 d-flex gap-3 align-items-center">
          <button
            style={{ border: "none", background: "transparent", color: "blue" }}
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          >
            &laquo; Prev
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            style={{ border: "none", background: "transparent", color: "blue" }}
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
          >
            Next &raquo;
          </button>
        </div>
</div>
      {/* Add/Edit Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{editMode ? "Edit Course" : "Add Course"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleAddOrUpdateCourse}>
            <Form.Group className="mb-2">
              <Form.Select
                value={newCourse.type}
                onChange={(e) => handleTypeChange(e.target.value)}
                required
              >
                <option value="">Select Type</option>
               
                {[...new Set(categories.map(cat => cat.type))].map((type, i) => {
                  return <option key={i} value={type}>{type}</option>
                })}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-2">
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
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={newCourse.title}
                onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })}
                required
              />
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
              <Form.Label>Level</Form.Label>
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
                <option value="Enable">Enable</option>
                <option value="Disable">Disable</option>
              </Form.Select>
            </Form.Group>

            <Button type="submit" variant="success">{editMode ? "Update" : "Add"} Course</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default AdminCourses;
