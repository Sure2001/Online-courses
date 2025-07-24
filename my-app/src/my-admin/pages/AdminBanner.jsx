import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Image, Modal, Button } from "react-bootstrap";
import {
  FaTrashAlt,
  FaFileCsv,
  FaFileExcel,
  FaEye,
  FaRegPlusSquare,
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
      const res = await fetch(`${API_URL}/banner/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (res.ok) {
        setBanners((prev) => prev.filter((banner) => banner._id !== id));
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error deleting banner:", error);
    }
  };

  const handleBulkDelete = async () => {
    if (!window.confirm("Delete selected banners?")) return;
    try {
      const res = await axios.delete("http://localhost:5000/api/banner", {
        data: { ids: selectedIds },
      });
      setSelectedIds([]);
      fetchBanners(); // refresh list
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
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
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
      <h3>Banner Management</h3>
      <div className="d-flex justify-content-end gap-2 mb-3">
        <button
          style={{
            border: "none",
            color: "green",
            fontSize: "32px",
            background: "transparent",
          }}
          title="Add New Banner"
          onClick={handleShow}
        >
          <FaRegPlusSquare />
        </button>

        {selectedIds.length > 0 && (
          <button
            style={{
              border: "none",
              color: "red",
              fontSize: "32px",
              background: "transparent",
            }}
            title="Delete Selected Banners"
            onClick={handleBulkDelete}
          >
            <FaTrashAlt />
          </button>
        )}
        <button
          style={{
            border: "none",
            color: "skyblue",
            fontSize: "32px",
            background: "transparent",
          }}
          title="Export to CSV"
          onClick={exportToCSV}
        >
          <FaFileCsv />
        </button>
        <button
          style={{
            border: "none",
            color: "green",
            fontSize: "32px",
            background: "transparent",
          }}
          title="Export to Excel"
          onClick={exportToExcel}
        >
          <FaFileExcel />
        </button>
      </div>
      <div
        style={{
          border: "1px solid #ccc",
          padding: "20px",
          borderRadius: "5px",
        }}
      >
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            textAlign: "center",
          }}
        >
          <thead>
            <tr>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>
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
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                Title
              </th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                Description
              </th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                Image
              </th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                Status
              </th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                Toggle
              </th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {currentBanners.map((banner) => (
              <tr key={banner._id}>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
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
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  {banner.title}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  {banner.description}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  {banner.image && (
                    <img
                      src={`http://localhost:5000${banner.image}`}
                      thumbnail
                      style={{
                        width: "50px",
                        height: "50px",
                        objectFit: "cover",
                      }}
                    />
                  )}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  <span
                    className={`badge ${
                      banner.status ? "bg-success" : "bg-secondary"
                    }`}
                  >
                    {banner.status ? "Enabled" : "Disabled"}
                  </span>
                </td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  <label style={switchStyle}>
                    <input
                      type="checkbox"
                      checked={banner.status}
                      onChange={() => toggleStatus(banner._id, banner.status)}
                      style={{ opacity: 0, width: 0, height: 0 }}
                    />
                    <span style={sliderStyle(banner.status)}>
                      <span style={knobStyle(banner.status)} />
                    </span>
                  </label>
                </td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  <button
                    style={{
                      border: "none",
                      color: "green",
                      fontSize: "18px",
                      marginRight: "15px",
                      background: "transparent",
                    }}
                    onClick={() => handleView(banner)}
                  >
                    <FaEye />
                  </button>
                  <button
                    style={{
                      border: "none",
                      color: "red",
                      fontSize: "18px",
                      marginRight: "15px",
                      background: "transparent",
                    }}
                    onClick={() => handleDelete(banner._id)}
                  >
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="mt-3 d-flex gap-3 align-items-center">
          <button
            style={{ border: "none", background: "transparent", color: "blue" }}
            disabled={currentPage === 1}
            onClick={() => {
              setCurrentPage(currentPage - 1);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            Prev
          </button>
          <span className="mx-3">
            Page {currentPage} of {totalPages}
          </span>
          <button
            style={{ border: "none", background: "transparent", color: "blue" }}
            disabled={currentPage === totalPages}
            onClick={() => {
              setCurrentPage(currentPage + 1);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminBanner;
