import React, { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { Modal } from "react-bootstrap";
import { FaTrashAlt, FaEye, FaFileExcel, FaFileCsv } from "react-icons/fa";

const User = () => {
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [viewUser, setViewUser] = useState(null);

  const usersPerPage = 5;
  const API_URL = "http://localhost:5000/api";

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${API_URL}/users`);
        const data = await response.json();
        setUsers(data.reverse());
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      const res = await fetch(`${API_URL}/users/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (res.ok) {
        setUsers((prev) => prev.filter((user) => user._id !== id));
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleSelect = (id) => {
    setSelectedUsers((prev) =>
      prev.includes(id) ? prev.filter((uid) => uid !== id) : [...prev, id]
    );
  };

  const handleBulkDelete = async () => {
    if (selectedUsers.length === 0) {
      alert("Select at least one user to delete.");
      return;
    }
    if (!window.confirm("Are you sure you want to delete selected users?")) return;

    try {
      await Promise.all(
        selectedUsers.map((id) =>
          fetch(`${API_URL}/users/${id}`, { method: "DELETE" })
        )
      );
      setUsers((prev) => prev.filter((u) => !selectedUsers.includes(u._id)));
      setSelectedUsers([]);
    } catch (err) {
      console.error("Error deleting selected users:", err);
    }
  };

  const handleExport = (type) => {
    const exportData = filteredUsers.map(({ username, email, mobile }) => ({
      Username: username,
      Email: email,
      Mobile: mobile,
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Users");

    const excelBuffer = XLSX.write(workbook, {
      bookType: type,
      type: "array",
    });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, `users_export.${type}`);
  };

  const handleView = (user) => {
    setViewUser(user);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setViewUser(null);
  };

  const filteredUsers = users.filter(
    (user) =>
      user.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLast = currentPage * usersPerPage;
  const indexOfFirst = indexOfLast - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const isAllSelected = currentUsers.length > 0 && currentUsers.every((user) => selectedUsers.includes(user._id));

  const toggleSelectAll = () => {
    if (isAllSelected) {
      setSelectedUsers((prev) => prev.filter((id) => !currentUsers.some((u) => u._id === id)));
    } else {
      const newIds = currentUsers.map((user) => user._id);
      setSelectedUsers((prev) => [...new Set([...prev, ...newIds])]);
    }
  };

  return (
    <div className="container mt-4">
      <h3 style={{ fontFamily: "sans-serif", fontSize: "25px" }}>User List</h3>

      <div className="d-flex justify-content-between align-items-center mb-3">
        <input
          type="text"
          placeholder="Search by username or email..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1); // reset to page 1 on search
          }}
          className="form-control"
          style={{ width: "300px" }}
        />
        <div className="d-flex align-items-center gap-2 mx-4">
          {selectedUsers.length > 0 && (
            <button
              title="Delete selected"
              style={{ border: "none", color: "red", fontSize: "32px", background: "transparent" }}
              onClick={handleBulkDelete}
            >
              <FaTrashAlt />
            </button>
          )}
          <button
            title="Export CSV"
            style={{ border: "none", color: "skyblue", fontSize: "32px", background: "transparent" }}
            onClick={() => handleExport("csv")}
           
          >
            <FaFileCsv />
          </button>
          <button
            title="Export Excel"
            style={{ border: "none", color: "green", fontSize: "32px", background: "transparent" }}
            onClick={() => handleExport("xlsx")}
          
          >
            <FaFileExcel />
          </button>
        </div>
      </div>

      <div style={{ border: "1px solid #ccc", padding: "20px", borderRadius: "5px" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "center" }}>
          <thead>
            <tr>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}><input type="checkbox" onChange={toggleSelectAll} checked={isAllSelected} /></th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>Image</th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>Username</th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>Email</th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>Mobile</th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((user) => (
              <tr key={user._id}>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  <input
                    type="checkbox"
                    checked={selectedUsers.includes(user._id)}
                    onChange={() => handleSelect(user._id)}
                  />
                </td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  <img
                    src={`${API_URL}/user-image/${user.email}`}
                    alt="User"
                    style={{ width: "50px", height: "50px", objectFit: "cover" }}
                    onError={(e) => (e.target.src = "https://via.placeholder.com/50")}
                  />
                </td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{user.username}</td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{user.email}</td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{user.mobile}</td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  <button
                    style={{ border: "none", color: "green", fontSize: "18px", marginRight: "15px", background: "transparent" }}
                    onClick={() => handleView(user)}
                    title="View"
                  >
                    <FaEye />
                  </button>
                  <button
                    style={{ border: "none", color: "red", fontSize: "18px", background: "transparent" }}
                    onClick={() => handleDelete(user._id)}
                    title="Delete"
                  >
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
            {currentUsers.length === 0 && (
              <tr>
                <td colSpan="6" style={{ padding: "10px" }}>No users found.</td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="mt-3 d-flex gap-3 align-items-center">
          <div>
            <button
              style={{ border: "none", background: "transparent", color: "blue" }}
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
            >
              &laquo; Prev
            </button>{" "}
            <span style={{ fontWeight: "500" }}>
              Page {currentPage} of {totalPages}
            </span>{" "}
            <button
              style={{ border: "none", background: "transparent", color: "blue" }}
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Next &raquo;
            </button>
          </div>
          {filteredUsers.length > 0 && (
            <small className="text-muted">
              Showing {indexOfFirst + 1} to {Math.min(indexOfLast, filteredUsers.length)} of {filteredUsers.length}
            </small>
          )}
        </div>
      </div>

      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>User Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {viewUser ? (
            <div>
              <img
                src={`${API_URL}/user-image/${viewUser.email}`}
                alt="User"
                style={{ width: "100px", height: "100px", objectFit: "cover", borderRadius: "50%", marginBottom: "10px" }}
                onError={(e) => (e.target.src = "https://via.placeholder.com/100")}
              />
              <p><strong>Username:</strong> {viewUser.username}</p>
              <p><strong>Email:</strong> {viewUser.email}</p>
              <p><strong>Mobile:</strong> {viewUser.mobile}</p>
            </div>
          ) : (
            <p>No user selected.</p>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default User;
