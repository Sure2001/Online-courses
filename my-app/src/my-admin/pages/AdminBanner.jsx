import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Image, Modal, Button } from "react-bootstrap";
import {
  FaTrashAlt,
  FaFileCsv,
  FaFileExcel,
  FaEye,
} from "react-icons/fa";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const AdminBanner = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [banners, setBanners] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const bannersPerPage = 5;
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => {
    setShowModal(false);
    setTitle("");
    setDescription("");
    setImage(null);
    setPreview("");
  };
  const handleShow = () => setShowModal(true);

  useEffect(() => {
    fetchBanners();
  }, []);

  const fetchBanners = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/banner");
      const bannerList = Array.isArray(res.data)
        ? res.data
        : res.data.data || [];
      setBanners(bannerList);
    } catch (err) {
      console.error("Error fetching banners", err);
      setBanners([]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    if (image) formData.append("image", image);

    try {
      await axios.post("http://localhost:5000/api/banner", formData);
      alert("Banner created successfully!");
      handleClose();
      fetchBanners();
    } catch (err) {
      console.error(err);
      alert("Banner creation failed");
    }
  };

  const toggleStatus = async (id, currentStatus) => {
    try {
      if (!currentStatus) {
        await axios.put("http://localhost:5000/api/banner/disableAll");
      }
      await axios.put(`http://localhost:5000/api/banner/${id}/status`, {
        status: !currentStatus,
      });
      fetchBanners();
    } catch (err) {
      console.error("Failed to update status", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this banner?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/banner/${id}`);
      fetchBanners();
    } catch (err) {
      console.error("Failed to delete banner", err);
    }
  };

  const handleBulkDelete = async () => {
    if (!window.confirm("Delete selected banners?")) return;
    try {
      await Promise.all(
        selectedIds.map((id) =>
          axios.delete(`http://localhost:5000/api/banner/${id}`)
        )
      );
      setSelectedIds([]);
      fetchBanners();
    } catch (err) {
      console.error("Bulk delete failed", err);
    }
  };

  const handleView = (banner) => {
    alert(
      `Title: ${banner.title}\nDescription: ${banner.description}\nStatus: ${
        banner.status ? "Enabled" : "Disabled"
      }`
    );
  };

  const exportToExcel = () => {
    const data = banners.map((b) => ({
      Title: b.title,
      Description: b.description,
      Status: b.status ? "Enabled" : "Disabled",
    }));
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Banners");
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, "banners.xlsx");
  };

  const exportToCSV = () => {
    const header = "Title,Description,Status\n";
    const rows = banners
      .map(
        (b) =>
          `${b.title.replace(/,/g, " ")},${b.description.replace(/,/g, " ")},${
            b.status ? "Enabled" : "Disabled"
          }`
      )
      .join("\n");
    const blob = new Blob([header + rows], {
      type: "text/csv;charset=utf-8;",
    });
    saveAs(blob, "banners.csv");
  };

  const indexOfLastBanner = currentPage * bannersPerPage;
  const indexOfFirstBanner = indexOfLastBanner - bannersPerPage;
  const currentBanners = [...banners]
    .sort((a, b) => b._id.localeCompare(a._id))
    .slice(indexOfFirstBanner, indexOfLastBanner);
  const totalPages = Math.ceil(banners.length / bannersPerPage);

  const switchStyle = {
    position: "relative",
    display: "inline-block",
    width: "50px",
    height: "24px",
    cursor: "pointer",
  };

  const sliderStyle = (enabled) => ({
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: enabled ? "#198754" : "#ccc",
    transition: "0.4s",
    borderRadius: "34px",
  });

  const knobStyle = (enabled) => ({
    position: "absolute",
    height: "18px",
    width: "18px",
    left: enabled ? "26px" : "4px",
    bottom: "3px",
    backgroundColor: "white",
    transition: "0.4s",
    borderRadius: "50%",
  });

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Banner Management</h3>
        <Button variant="primary" onClick={handleShow}>
          + Add New Banner
        </Button>
      </div>

      {/* Add Banner Modal */}
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Banner</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Banner Title</Form.Label>
              <Form.Control
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Banner Description</Form.Label>
              <Form.Control
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Banner Image</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={(e) => {
                  setImage(e.target.files[0]);
                  setPreview(URL.createObjectURL(e.target.files[0]));
                }}
              />
            </Form.Group>
            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="img-fluid mb-3"
                style={{ maxHeight: "200px" }}
              />
            )}
            <Button variant="success" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      <div className="d-flex justify-content-end gap-2 mb-3">
        {selectedIds.length > 0 && (
          <Button variant="danger" onClick={handleBulkDelete}>
            <FaTrashAlt /> Delete Selected
          </Button>
        )}
        <Button variant="outline-primary" onClick={exportToCSV}>
          <FaFileCsv /> CSV
        </Button>
        <Button variant="outline-success" onClick={exportToExcel}>
          <FaFileExcel /> Excel
        </Button>
      </div>

      <table className="table table-bordered text-center">
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                checked={
                  currentBanners.length > 0 &&
                  currentBanners.every((b) => selectedIds.includes(b._id))
                }
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedIds(currentBanners.map((b) => b._id));
                  } else {
                    setSelectedIds([]);
                  }
                }}
              />
            </th>
            <th>Title</th>
            <th>Description</th>
            <th>Image</th>
            <th>Status</th>
            <th>Toggle</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentBanners.map((banner) => (
            <tr key={banner._id}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedIds.includes(banner._id)}
                  onChange={() =>
                    setSelectedIds((prev) =>
                      prev.includes(banner._id)
                        ? prev.filter((id) => id !== banner._id)
                        : [...prev, banner._id]
                    )
                  }
                />
              </td>
              <td>{banner.title}</td>
              <td>{banner.description}</td>
              <td>
                {banner.image && (
                  <Image
                    src={`http://localhost:5000${banner.image}`}
                    thumbnail
                    style={{ width: "100px" }}
                  />
                )}
              </td>
              <td>
                <span
                  className={`badge ${
                    banner.status ? "bg-success" : "bg-secondary"
                  }`}
                >
                  {banner.status ? "Enabled" : "Disabled"}
                </span>
              </td>
              <td>
                <label style={switchStyle}>
                  <input
                    type="checkbox"
                    checked={banner.status}
                    onChange={() =>
                      toggleStatus(banner._id, banner.status)
                    }
                    style={{ opacity: 0, width: 0, height: 0 }}
                  />
                  <span style={sliderStyle(banner.status)}>
                    <span style={knobStyle(banner.status)} />
                  </span>
                </label>
              </td>
              <td>
                <Button
                  variant="outline-success"
                  size="sm"
                  onClick={() => handleView(banner)}
                  className="me-2"
                >
                  <FaEye />
                </Button>
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() => handleDelete(banner._id)}
                >
                  <FaTrashAlt />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="d-flex justify-content-center mt-3">
        <Button
          variant="outline-secondary"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          Prev
        </Button>
        <span className="mx-3">Page {currentPage} of {totalPages}</span>
        <Button
          variant="outline-secondary"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default AdminBanner;
