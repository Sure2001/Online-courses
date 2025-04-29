
import React, { useEffect, useState } from "react";
import axios from "axios";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { Modal, Button, Form } from "react-bootstrap";
import "./Table.css";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { Pagination } from 'react-bootstrap';

const Offers = () => {
  const [formData, setFormData] = useState({
    title: "",
    offer: "",
    valid: "",
    image: "",
    bg: "",
  });

  const [offers, setOffers] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedOffers, setSelectedOffers] = useState([]);
  const [viewOffer, setViewOffer] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const fetchOffers = async () => {
    try {
      const res = await axios.get("http://localhost:5001/api/offers");
      setOffers(res.data);
    } catch (error) {
      console.error("Error fetching offers:", error);
    }
  };

  useEffect(() => {
    fetchOffers();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.post(`http://localhost:5001/api/offers/update/${editingId}`, formData);
      } else {
        await axios.post("http://localhost:5001/api/offers", formData);
      }
      fetchOffers();
      setShowModal(false);
      setFormData({ title: "", offer: "", valid: "", image: "", bg: "" });
      setEditingId(null);
    } catch (error) {
      console.error("Error submitting offer:", error);
    }
  };

  const handleEdit = (offer) => {
    setFormData({
      title: offer.title,
      offer: offer.offer,
      valid: offer.valid,
      image: offer.image,
      bg: offer.bg,
    });
    setEditingId(offer._id);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/api/offers/${id}`);
      fetchOffers();
    } catch (error) {
      console.error("Error deleting offer:", error);
    }
  };

  const handleBulkDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete the selected items?");
    if (confirmDelete) {
      try {
        await Promise.all(selectedOffers.map((id) => axios.delete(`http://localhost:5001/api/offers/${id}`)));
        fetchOffers();
        setSelectedOffers([]);
      } catch (error) {
        console.error("Error bulk deleting offers:", error);
      }
    }
  };

  const handleSelectOffer = (id) => {
    setSelectedOffers((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((offerId) => offerId !== id)
        : [...prevSelected, id]
    );
  };

  const handleView = (offer) => {
    setViewOffer(offer);
    setShowViewModal(true);
  };

  const handleExportCSV = () => {
    const exportData = filteredOffers.map(({ title, offer, valid, image, bg }) => ({
      Title: title,
      OfferCode: offer,
      ValidTill: valid,
      Image: image,
      Background: bg,
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Offers");

    const csvOutput = XLSX.write(workbook, { bookType: "csv", type: "array" });
    const blob = new Blob([csvOutput], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "offers.csv");
  };

  const handleExportExcel = () => {
    const exportData = filteredOffers.map(({ title, offer, valid, image, bg }) => ({
      Title: title,
      OfferCode: offer,
      ValidTill: valid,
      Image: image,
      Background: bg,
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Offers");

    const excelOutput = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelOutput], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(blob, "offers.xlsx");
  };


  const filteredOffers = offers.filter((offer) => {
    const search = searchQuery.toLowerCase();
    return (
      offer.title.toLowerCase().includes(search) ||
      offer.offer.toLowerCase().includes(search) ||
      offer.valid.toLowerCase().includes(search)
    );
  });

  const totalPages = Math.ceil(filteredOffers.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentOffers = filteredOffers.slice(indexOfFirstItem, indexOfLastItem);


  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="p-4">
      <h1 className="text-center">Offers</h1>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div className="d-flex align-items-center gap-2">
          <input type="text" placeholder="Search offers..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="form-control"
            style={{ maxWidth: "200px" }}
          />
        </div>

        <div className="d-flex gap-2">
          {selectedOffers.length > 0 && (
            <Button variant="danger" onClick={handleBulkDelete} className="mb-3">
              Delete Selected
            </Button>
          )}
          <Button variant="success" onClick={() => setShowModal(true)} className="mb-3">
            Add Offer
          </Button>
          <DropdownButton id="dropdown-export" title="Export" variant="outline-primary">
            <Dropdown.Item onClick={handleExportCSV}>Export as CSV</Dropdown.Item>
            <Dropdown.Item onClick={handleExportExcel}>Export as Excel</Dropdown.Item>
          </DropdownButton>
        </div>
      </div>

      {/* Table */}
      <div className="tablediv">
        <table>
          <thead>
            <tr>
              <th>
                <input type="checkbox" checked={selectedOffers.length === offers.length} onChange={() => setSelectedOffers(
                  selectedOffers.length === offers.length ? [] : offers.map((offer) => offer._id)
                )
                }
                />
              </th>
              <th className='tablewidth'>Title</th>
              <th className='tablewidth'>Code</th>
              <th className='tablewidth'>Valid</th>
              <th className='tablewidth'>Image</th>
              <th className='tablewidth'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentOffers.map((offer) => (
              <tr key={offer._id}>
                <td>
                  <input type="checkbox" checked={selectedOffers.includes(offer._id)} onChange={() => handleSelectOffer(offer._id)} />
                </td>
                <td className='tablewidth'>{offer.title}</td>
                <td className='tablewidth'>{offer.offer}</td>
                <td className='tablewidth'>{offer.valid}</td>
                <td className='tablewidth'>
                  <img src={offer.image} alt={offer.title} width="60" />
                </td>
                <td className='tablewidth'>
                  <Button variant="info" size="sm" onClick={() => handleView(offer)}>View</Button>{' '}
                  <Button variant="warning" size="sm" onClick={() => handleEdit(offer)}>Edit</Button>{' '}
                  <Button variant="danger" size="sm" onClick={() => handleDelete(offer._id)}>Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination Section */}
        <div className="d-flex justify-content-between align-items-center mt-3">
          <Pagination>
            {[...Array(totalPages)].map((_, index) => (
              <Pagination.Item
                key={index + 1}
                active={currentPage === index + 1}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </Pagination.Item>
            ))}
          </Pagination>

          <div className="text-end pe-2" style={{ fontSize: "14px" }}>
            {`Showing ${indexOfFirstItem + 1} to ${Math.min(
              indexOfLastItem,
              offers.length
            )} of ${offers.length} (${totalPages} Pages)`}
          </div>
        </div>
      </div>

      {/* Add/Edit Offer Modal */}
      <Modal show={showModal} onHide={() => {
        setShowModal(false);
        setFormData({ title: "", offer: "", valid: "", image: "", bg: "" });
        setEditingId(null);
      }}>
        <Modal.Header closeButton>
          <Modal.Title>{editingId ? "Update Offer" : "Add Offer"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            {["title", "offer", "valid", "image", "bg"].map((field) => (
              <Form.Group key={field} className="mb-2">
                <Form.Control
                  type="text"
                  placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            ))}
            <div className="text-end">
              <Button type="submit" variant="success"> {editingId ? "Update" : "Submit"}</Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>

      {/* View Modal */}
      <Modal show={showViewModal} onHide={() => setShowViewModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{viewOffer?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {viewOffer && (
            <>
              <p><strong>Offer Code:</strong> {viewOffer.offer}</p>
              <p><strong>Valid Till:</strong> {viewOffer.valid}</p>
              <p><strong>Background:</strong> {viewOffer.bg}</p>
              <img src={viewOffer.image} alt={viewOffer.title} width="100%" />
            </>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Offers;