import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Button, Form } from "react-bootstrap";
import { FaTrashAlt, FaFileExcel, FaFileCsv, FaEdit, FaEye } from "react-icons/fa";
import * as XLSX from "xlsx";
import Papa from "papaparse";
import { saveAs } from "file-saver";

const AdminCategory = () => {
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({
    type: "",
    subCategory: "",
    status: "enable",
  });
  const [search, setSearch] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [viewCategory, setViewCategory] = useState(null);
  const [editCategory, setEditCategory] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const limit = 5;

  useEffect(() => {
    fetchCategories();
  }, [search, currentPage]);

  const fetchCategories = () => {
    axios
      .get(`http://localhost:5000/api/categories?search=${search}`)
      .then((res) => {
        setCategories(res.data.reverse());
      })
      .catch((err) => console.error("Fetch Error:", err));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/api/categories", form)
      .then(() => {
        setForm({
          type: "",
          subCategory: "",
          status: "enable",
        });
        fetchCategories();
      })
      .catch((err) => {
        if (err.response) {
          console.error("Server error:", err.response.data);
        } else {
          console.error("Error:", err.message);
        }
      });
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5000/api/categories/${id}`)
      .then(() => fetchCategories())
      .catch((err) => console.error("Delete Error:", err));
  };

  const handleBulkDelete = () => {
    Promise.all(
      selectedCategories.map((id) =>
        axios.delete(`http://localhost:5000/api/categories/${id}`)
      )
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
      Type: cat.type,
      SubCategory: cat.subCategory,
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
      categories.map((cat) => ({
        Type: cat.type,
        SubCategory: cat.subCategory,
        Status: cat.status,
      }))
    );
    saveAs(new Blob([csv], { type: "text/csv;charset=utf-8;" }), "categories.csv");
  };

 const handleUpdateCategory = (e) => {
  e.preventDefault();

  axios
    .put(`http://localhost:5000/api/categories/${editCategory._id}`, editCategory)
    .then((res) => {
      console.log("Updated:", res.data);
      setShowEditModal(false);
      setEditCategory(null);
      setCategories((prev) =>
        prev.map((cat) =>
          cat._id === res.data._id ? res.data : cat
        )
      ); // Update the local state manually
    })
    .catch((err) => console.error("Update error:", err));
};


  const paginatedData = categories.slice((currentPage - 1) * limit, currentPage * limit);
  const totalPages = Math.ceil(categories.length / limit);

  return (
    <div className="container mt-4">
      <h3>Add Categories</h3>

      {/* --- Form --- */}
      <Form onSubmit={handleSubmit} className="mb-4">
        <Form.Group className="mb-2">
          <Form.Label>Category Type</Form.Label>
          <Form.Select
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value, subCategory: "" })}
            required
          >
            <option value="">-- Select Type --</option>
            <option value="coding">Coding</option>
            <option value="non-coding">Non-Coding</option>
          </Form.Select>
        </Form.Group>

        {form.type && (
          <Form.Group className="mb-2">
            <Form.Label>SubCategory Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter subcategory"
              value={form.subCategory}
              onChange={(e) => setForm({ ...form, subCategory: e.target.value })}
              required
            />
          </Form.Group>
        )}

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

        <button style={{ backgroundColor: "#007bff", color: "white" }} type="submit">
          Submit
        </button>
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
            <button
              title="Delete selected"
              style={{ border: "none", color: "red", fontSize: "32px", background: "transparent" }}
              onClick={handleBulkDelete}
            >
              <FaTrashAlt />
            </button>
          )}
          <button
            title="Export to CSV"
            style={{ border: "none", color: "green", fontSize: "32px", background: "transparent" }}
            onClick={exportToCSV}
          >
            <FaFileCsv />
          </button>
          <button
            title="Export to Excel"
            style={{ border: "none", color: "green", fontSize: "32px", background: "transparent" }}
            onClick={exportToExcel}
          >
            <FaFileExcel />
          </button>
        </div>
      </div>

      {/* --- Table --- */}
      <div style={{ border: "1px solid #ccc", padding: "20px", borderRadius: "5px" }}>
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
              <th>Type</th>
              <th>SubCategory</th>
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
                <td>{cat.type}</td>
                <td>{cat.subCategory}</td>
                <td>{cat.status}</td>
                <td>
                  <button
                    style={{ border: "none", color: "blue", fontSize: "18px", marginRight: "15px", background: "transparent" }}
                    onClick={() => {
                      setEditCategory(cat);
                      setShowEditModal(true);
                    }}
                  >
                    <FaEdit />
                  </button>
                  <button
                    style={{ border: "none", color: "green", fontSize: "18px", marginRight: "15px", background: "transparent" }}
                    onClick={() => {
                      setViewCategory(cat);
                      setShowModal(true);
                    }}
                  >
                    <FaEye />
                  </button>
                  <button
                    style={{ border: "none", color: "red", fontSize: "18px", marginRight: "15px", background: "transparent" }}
                    onClick={() => handleDelete(cat._id)}
                  >
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* --- Pagination --- */}
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

      {/* --- View Modal --- */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Category Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {viewCategory && (
            <>
              <p><strong>Type:</strong> {viewCategory.type}</p>
              <p><strong>SubCategory:</strong> {viewCategory.subCategory}</p>
              <p><strong>Status:</strong> {viewCategory.status}</p>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setShowModal(false)}>Close</Button>
        </Modal.Footer>
      </Modal>

      {/* --- Edit Modal --- */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Category</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleUpdateCategory}>
          <Modal.Body>
            {editCategory && (
              <>
                <Form.Group className="mb-2">
                  <Form.Label>Type</Form.Label>
                  <Form.Select
                    value={editCategory.type}
                    onChange={(e) =>
                      setEditCategory({ ...editCategory, type: e.target.value, subCategory: "" })
                    }
                    required
                  >
                    <option value="">-- Select Type --</option>
                    <option value="coding">Coding</option>
                    <option value="non-coding">Non-Coding</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-2">
                  <Form.Label>SubCategory</Form.Label>
                  <Form.Control
                    type="text"
                    value={editCategory.subCategory}
                    onChange={(e) =>
                      setEditCategory({ ...editCategory, subCategory: e.target.value })
                    }
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-2">
                  <Form.Label>Status</Form.Label>
                  <Form.Select
                    value={editCategory.status}
                    onChange={(e) =>
                      setEditCategory({ ...editCategory, status: e.target.value })
                    }
                  >
                    <option value="enable">Enable</option>
                    <option value="disable">Disable</option>
                  </Form.Select>
                </Form.Group>
              </>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowEditModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Update
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default AdminCategory;
