import React, { useEffect, useState } from "react";
import axios from "axios";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import Papa from "papaparse";
import { Button, Modal } from "react-bootstrap";
import {
  FaEye,
  FaFileExcel,
  FaFileCsv,
  FaEdit,
  FaTrashAlt,
} from "react-icons/fa";

const Order = ({ onOrderCountChange }) => {
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedOrderDetails, setSelectedOrderDetails] = useState(null);

  const LIMIT = 5;

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/orders`)
      .then((res) => {
        const allOrders = res.data.orders || [];
        const filtered = allOrders.filter(
          (o) =>
            o.userName?.toLowerCase().includes(search.toLowerCase()) ||
            o.userEmail?.toLowerCase().includes(search.toLowerCase())
        );
        const sorted = filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setOrders(sorted);
        setTotalPages(Math.ceil(filtered.length / LIMIT) || 1);
        onOrderCountChange(filtered.length);  // Pass order count to Dashboard
      })
      .catch((err) => console.error("Error fetching orders:", err));
  }, [search, currentPage, onOrderCountChange]);

  const exportToExcel = () => {
    const flatData = orders.map((order) => ({
      Email: order.billing?.email || order.userEmail,
      Name: order.billing?.userName || order.userName,
      Total: order.subtotal,
      PaymentMethod: order.paymentMethod,
      OrderedAt: new Date(order.createdAt).toLocaleString(),
    }));
    const ws = XLSX.utils.json_to_sheet(flatData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Orders");
    const buffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    saveAs(new Blob([buffer], { type: "application/octet-stream" }), "orders.xlsx");
  };

  const exportToCSV = () => {
    const flatData = orders.map((order) => ({
      Email: order.billing?.email || order.userEmail,
      Name: order.billing?.userName || order.userName,
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
        setOrders((prev) => prev.filter((order) => order._id !== orderId));
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
          setOrders((prev) => prev.filter((order) => !selectedOrders.includes(order._id)));
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

  // Paginated data
  const paginatedOrders = orders.slice((currentPage - 1) * LIMIT, currentPage * LIMIT);

  return (
    <div className="container mt-4">
      <h3 style={{ fontFamily: "sans-serif", fontSize: "25px" }}>Order List</h3>

      <div className="d-flex justify-content-between mb-3">
        <input
          type="text"
          placeholder="Search by name/email"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          className="form-control"
          style={{ maxWidth: "300px" }}
        />

        <div className="d-flex align-items-center gap-3">
          {selectedOrders.length > 0 && (
            <button onClick={handleBulkDelete} style={{ color: "red", border: "none", background: "transparent", fontSize: "32px" }}>
              <FaTrashAlt />
            </button>
          )}
          <button onClick={exportToCSV} style={{ color: "skyblue", border: "none", background: "transparent", fontSize: "32px" }}>
            <FaFileCsv />
          </button>
          <button onClick={exportToExcel} style={{ color: "green", border: "none", background: "transparent", fontSize: "32px", marginRight: "20px" }}>
            <FaFileExcel />
          </button>
        </div>
      </div>

      <div style={{ border: "1px solid #ccc", padding: "20px", borderRadius: "5px" }}>
        <table className="table table-bordered text-center">
          <thead>
            <tr>
              <th><input type="checkbox" checked={selectAll} onChange={handleSelectAllChange} /></th>
              <th>Course Title</th>
              <th>Level</th>
              <th>User</th>
              <th>Email</th>
              <th>Total (₹)</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedOrders.map((order) => {
              const item = order.items[0] || {};
              return (
                <tr key={order._id}>
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedOrders.includes(order._id)}
                      onChange={(e) => handleCheckboxChange(e, order._id)}
                    />
                  </td>
                  <td>{item.title || "—"}</td>
                  <td>{item.level || "—"}</td>
                  <td>{order.userName}</td>
                  <td>{order.userEmail}</td>
                  <td>₹{order.subtotal?.toFixed(2)}</td>
                  <td>
                    <button style={{ border: "none", color: "blue", fontSize: "18px", marginRight: "15px", background: "transparent" }}>
                      <FaEdit />
                    </button>
                    <button style={{ border: "none", color: "green", fontSize: "18px", marginRight: "15px", background: "transparent" }} onClick={() => handleViewOrder(order)}>
                      <FaEye />
                    </button>
                    <button style={{ border: "none", color: "red", fontSize: "18px", marginRight: "15px", background: "transparent" }} onClick={() => handleDeleteOrder(order._id)}>
                      <FaTrashAlt />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <div className="mt-3 d-flex gap-3 align-items-center">
          <button
            style={{ border: "none", background: "transparent", color: "blue" }}
            onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
            disabled={currentPage === 1}
          >
            &laquo; Prev
          </button>
          <span>Page {currentPage} of {totalPages}</span>
          <button
            style={{ border: "none", background: "transparent", color: "blue" }}
            onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next &raquo;
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
              {selectedOrderDetails.items.map((item, i) => (
                <div key={i}>
                  <p><strong>Course:</strong> {item.title}</p>
                  <p><strong>Level:</strong> {item.level}</p>
                  <p><strong>Price:</strong> ₹{item.price?.toFixed(2)} × {item.quantity}</p>
                  <hr />
                </div>
              ))}
              <p><strong>Email:</strong> {selectedOrderDetails.billing?.email || selectedOrderDetails.userEmail}</p>
              <p><strong>Phone:</strong> {selectedOrderDetails.billing?.phone || "—"}</p>
              <p><strong>Total:</strong> ₹{selectedOrderDetails.subtotal.toFixed(2)}</p>
              <p><strong>Payment:</strong> {selectedOrderDetails.paymentMethod || "N/A"}</p>
              <p><strong>Ordered At:</strong> {new Date(selectedOrderDetails.createdAt).toLocaleString()}</p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Order;
