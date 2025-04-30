import React, { useEffect, useState } from "react";
import axios from "axios";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import Papa from "papaparse";
import { Button, Modal } from "react-bootstrap";
import "./Table.css";
import {
  FaEye,
  FaTrash,
  FaFileExcel,
  FaFileCsv,
  FaEdit,
  FaArrowLeft,
  FaArrowRight,
} from "react-icons/fa";

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedOrderDetails, setSelectedOrderDetails] = useState(null);

  useEffect(() => {
    axios
      .get(
        `http://localhost:5000/api/orders?page=${currentPage}&limit=10&search=${search}`
      )
      .then((res) => {
        setOrders(res.data.orders || []);
        setTotalPages(res.data.totalPages || 1);
      })
      .catch((err) => console.error("Error fetching orders:", err));
  }, [currentPage, search]);

  const exportToExcel = () => {
    const flatData = orders.map((order) => ({
      Email: order.billing.email,
      Phone: order.billing.phone,
      Total: order.subtotal,
      PaymentMethod: order.paymentMethod,
      OrderedAt: new Date(order.createdAt).toLocaleString(),
    }));
    const ws = XLSX.utils.json_to_sheet(flatData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Orders");
    const buffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    saveAs(
      new Blob([buffer], { type: "application/octet-stream" }),
      "orders.xlsx"
    );
  };

  const exportToCSV = () => {
    const flatData = orders.map((order) => ({
      Email: order.billing.email,
      Phone: order.billing.phone,
      Total: order.subtotal,
      PaymentMethod: order.paymentMethod,
      OrderedAt: new Date(order.createdAt).toLocaleString(),
    }));
    const csv = Papa.unparse(flatData);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "orders.csv");
  };

  const handleDeleteOrder = (orderId) => {
    axios
      .delete(`http://localhost:5000/api/orders/${orderId}`)
      .then(() => {
        setOrders(orders.filter((order) => order._id !== orderId));
        alert("Order deleted successfully!");
      })
      .catch((err) => console.error("Error deleting order:", err));
  };

  const handleViewOrder = (order) => {
    setSelectedOrderDetails(order);
    setShowModal(true);
  };

  const handleCheckboxChange = (e, orderId) => {
    if (e.target.checked) {
      setSelectedOrders([...selectedOrders, orderId]);
    } else {
      setSelectedOrders(selectedOrders.filter((id) => id !== orderId));
    }
  };

  const handleSelectAllChange = (e) => {
    setSelectAll(e.target.checked);
    if (e.target.checked) {
      setSelectedOrders(orders.map((order) => order._id));
    } else {
      setSelectedOrders([]);
    }
  };

  const handleBulkDelete = () => {
    if (window.confirm("Are you sure you want to delete selected orders?")) {
      Promise.all(
        selectedOrders.map((id) =>
          axios.delete(`http://localhost:5000/api/orders/${id}`)
        )
      )
        .then(() => {
          setOrders(orders.filter((order) => !selectedOrders.includes(order._id)));
          setSelectedOrders([]);
          setSelectAll(false);
          alert("Selected orders deleted successfully!");
        })
        .catch((err) => {
          console.error("Error deleting selected orders:", err);
          alert("An error occurred while deleting selected orders.");
        });
    }
  };

  return (
    <div className="container mt-4">
      <h4 className="mb-3">All Orders</h4>
      <div className="d-flex justify-content-between mb-3">
        <input
          type="text"
          className="form-control w-25"
          placeholder="Search by Email"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="d-flex gap-2">
          <Button className="btn btn-success" onClick={exportToExcel}>
            <FaFileExcel />
          </Button>
          <Button className="btn btn-info" onClick={exportToCSV}>
            <FaFileCsv />
          </Button>
          {selectedOrders.length > 0 && (
            <Button variant="danger" onClick={handleBulkDelete} className="ms-2" title="Delete Selected">
              <FaTrash />
            </Button>
          )}
        </div>
      </div>
      <div className="tablediv">
        <table>
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  checked={selectAll}
                  onChange={handleSelectAllChange}
                />
              </th>
              <th>S.no</th>
              <th>Course Title</th>
              <th>Level</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Total</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, idx) => {
              const firstItem = order.items[0] || {};
              const sNo = (currentPage - 1) * 10 + (orders.length - idx);  // Calculate S.no in descending order
              return (
                <tr key={order._id}>
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedOrders.includes(order._id)}
                      onChange={(e) => handleCheckboxChange(e, order._id)}
                    />
                  </td>
                  <td>{sNo}</td>  {/* Display S.no in descending order */}
                  <td>{firstItem.title || "—"}</td>
                  <td>{firstItem.level || "—"}</td>
                  <td>{order.billing.email}</td>
                  <td>{order.billing.phone}</td>
                  <td>₹{order.subtotal.toFixed(2)}</td>
                  <td>
                    <Button
                      variant="primary"
                      onClick={() => handleViewOrder(order)}
                    >
                      <FaEye />
                    </Button>
                    <Button variant="warning" className="ms-2">
                      <FaEdit />
                    </Button>
                    <Button
                      variant="danger"
                      className="ms-2"
                      onClick={() => handleDeleteOrder(order._id)}
                    >
                      <FaTrash />
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* Updated Pagination with Icons Only */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "1rem",
            marginTop: "2rem",
            flexWrap: "wrap",
            marginBottom: "2rem",
          }}
        >
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            style={{
              padding: "8px 12px",
              borderRadius: "8px",
              border: "1px solid #007bff",
              backgroundColor: currentPage === 1 ? "#e9ecef" : "#ffffff",
              color: "#007bff",
              cursor: currentPage === 1 ? "not-allowed" : "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1rem",
            }}
          >
            <FaArrowLeft />
          </button>

          <span style={{ fontWeight: "600", fontSize: "1rem" }}>
            {currentPage} / {totalPages}
          </span>

          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            style={{
              padding: "8px 12px",
              borderRadius: "8px",
              border: "1px solid #007bff",
              backgroundColor:
                currentPage === totalPages ? "#e9ecef" : "#ffffff",
              color: "#007bff",
              cursor: currentPage === totalPages ? "not-allowed" : "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1rem",
            }}
          >
            <FaArrowRight />
          </button>
        </div>
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Order Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedOrderDetails && (
            <div>
              {selectedOrderDetails.items.map((item, index) => (
                <div key={index}>
                  <h6>Course: {item.title}</h6>
                  <h6>Level: {item.level}</h6>
                  <h6>
                    Price: ₹{item.price.toFixed(2)} × {item.quantity}
                  </h6>
                  <hr />
                </div>
              ))}
              <h6>Email: {selectedOrderDetails.billing.email}</h6>
              <h6>Phone: {selectedOrderDetails.billing.phone}</h6>
              <h6>Total Amount: ₹{selectedOrderDetails.subtotal.toFixed(2)}</h6>
              <h6>Payment Method: {selectedOrderDetails.paymentMethod}</h6>
              <h6>
                Ordered At:{" "}
                {new Date(selectedOrderDetails.createdAt).toLocaleString()}
              </h6>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Order;
