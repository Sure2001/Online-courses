import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Button, Form } from "react-bootstrap";
import { FaTrashAlt, FaFileExcel, FaFileCsv, FaEdit, FaEye } from "react-icons/fa";
import * as XLSX from "xlsx";
import Papa from "papaparse";
import { saveAs } from "file-saver";

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({ name: "", status: "enable" });
  const [search, setSearch] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [viewCategory, setViewCategory] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const limit = 5;

  useEffect(() => {
    fetchCategories();
  }, [search, currentPage]);

  const fetchCategories = () => {
    axios
      .get(`http://localhost:5000/api/categories?search=${search}`)
      .then((res) => {
        const sorted = res.data.reverse(); // Descending
        setCategories(sorted);
      })
      .catch((err) => console.error("Error fetching categories:", err));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/api/categories", form)
      .then(() => {
        setForm({ name: "", status: "enable" });
        fetchCategories();
      })
      .catch((err) => console.error("Add Category Error:", err));
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5000/api/categories/${id}`)
      .then(() => fetchCategories())
      .catch((err) => console.error("Delete Error:", err));
  };

  const handleBulkDelete = () => {
    Promise.all(
      selectedCategories.map((id) => axios.delete(`http://localhost:5000/api/categories/${id}`))
    )
      .then(() => {
        setSelectedCategories([]);
        setSelectAll(false);
        fetchCategories();
      })
      .catch((err) => console.error("Bulk delete error:", err));
  };

  const exportToExcel = () => {
    const data = categories.map((cat) => ({
      Name: cat.name,
      Status: cat.status,
    }));
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Categories");
    const buffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    saveAs(new Blob([buffer]), "categories.xlsx");
  };

  const exportToCSV = () => {
    const csv = Papa.unparse(
      categories.map((cat) => ({ Name: cat.name, Status: cat.status }))
    );
    saveAs(new Blob([csv], { type: "text/csv;charset=utf-8;" }), "categories.csv");
  };

  const paginatedData = categories.slice((currentPage - 1) * limit, currentPage * limit);
  const totalPages = Math.ceil(categories.length / limit);

  return (
    <div className="container mt-4">
      <h3>Manage Categories</h3>

      {/* --- Form --- */}
      <Form onSubmit={handleSubmit} className="mb-4">
        <Form.Group className="mb-2">
          <Form.Label>Category Name</Form.Label>
          <Form.Control
            type="text"
            value={form.name}
            required
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label>Status</Form.Label>
          <Form.Select
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value })}
          >
            <option value="enable">Enable</option>
            <option value="disable">Disable</option>
          </Form.Select>
        </Form.Group>
        <Button type="submit">Submit</Button>
      </Form>

      {/* --- Search + Export + Bulk Delete --- */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <input
          type="text"
          placeholder="Search categories..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="form-control"
          style={{ width: "300px" }}
        />
        <div className="d-flex gap-3 align-items-center">
          {selectedCategories.length > 0 && (
            <Button variant="danger" onClick={handleBulkDelete}>
              <FaTrashAlt />
            </Button>
          )}
          <Button variant="success" onClick={exportToExcel}>
            <FaFileExcel />
          </Button>
          <Button variant="info" onClick={exportToCSV}>
            <FaFileCsv />
          </Button>
        </div>
      </div>

      {/* --- Table --- */}
      <table className="table table-bordered text-center">
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                checked={selectAll}
                onChange={(e) => {
                  setSelectAll(e.target.checked);
                  setSelectedCategories(
                    e.target.checked ? paginatedData.map((c) => c._id) : []
                  );
                }}
              />
            </th>
            <th>Name</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((cat) => (
            <tr key={cat._id}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(cat._id)}
                  onChange={(e) =>
                    setSelectedCategories((prev) =>
                      e.target.checked
                        ? [...prev, cat._id]
                        : prev.filter((id) => id !== cat._id)
                    )
                  }
                />
              </td>
              <td>{cat.name}</td>
              <td>{cat.status}</td>
              <td>
                <Button
                  size="sm"
                  variant="primary"
                  className="me-2"
                  onClick={() => {
                    setViewCategory(cat);
                    setShowModal(true);
                  }}
                >
                  <FaEye />
                </Button>
                <Button size="sm" variant="warning" className="me-2">
                  <FaEdit />
                </Button>
                <Button size="sm" variant="danger" onClick={() => handleDelete(cat._id)}>
                  <FaTrashAlt />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* --- Pagination --- */}
      <div className="d-flex justify-content-between align-items-center">
        <Button
          variant="link"
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          disabled={currentPage === 1}
        >
          &laquo; Prev
        </Button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <Button
          variant="link"
          onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
          disabled={currentPage === totalPages}
        >
          Next &raquo;
        </Button>
      </div>

      {/* --- View Modal --- */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Category Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {viewCategory && (
            <>
              <h5>Name: {viewCategory.name}</h5>
              <h6>Status: {viewCategory.status}</h6>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setShowModal(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Category;
