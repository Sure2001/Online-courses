import React, { useState, useEffect } from "react";
import "./Table.css";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { Dropdown, DropdownButton, Button } from "react-bootstrap";
import { FaTrashAlt } from "react-icons/fa";

const User = () => {
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  const API_URL = "http://localhost:5000/api"; // 🛠️ Correct backend URL

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${API_URL}/users`);
        const data = await response.json();
        setUsers(data.reverse()); // newest first
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${API_URL}/users/${id}`, {
        method: "DELETE",
      });
      const data = await response.json();
      if (response.ok) {
        setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleSelect = (userId) => {
    setSelectedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  const handleBulkDelete = async () => {
    if (selectedUsers.length === 0)
      return alert("Select at least one user to delete.");

    try {
      await Promise.all(
        selectedUsers.map((userId) =>
          fetch(`${API_URL}/users/${userId}`, { method: "DELETE" })
        )
      );
      setUsers((prevUsers) =>
        prevUsers.filter((user) => !selectedUsers.includes(user._id))
      );
      setSelectedUsers([]);
    } catch (error) {
      console.error("Error deleting selected users:", error);
    }
  };

  const handleExport = (type) => {
    const exportData = filteredUsers.map(({ username, email }) => ({
      Username: username,
      Email: email,
    }));
    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Users");

    const excelBuffer = XLSX.write(workbook, { bookType: type, type: "array" });
    const data = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(data, `users_export.${type}`);
  };

  const filteredUsers = users.filter(
    (user) =>
      user.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  return (
    <div>
      <h2>User List</h2>
        <div className="d-flex justify-content-between align-items-center mb-3">
  <input
    type="text"
    placeholder="Search by username or email..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    className="form-control"
    style={{ width: "300px" }}
  />
  <div className="d-flex align-items-center gap-2">
    {selectedUsers.length > 0 && (
      <Button variant="danger" size="sm" onClick={handleBulkDelete}>
        Delete Selected Users
      </Button>
    )}
    {/* 🟢 New Export Buttons with Icons */}
    <Button
      variant="outline-success"
      size="sm"
      onClick={() => handleExport("csv")}
      title="Export as CSV"
    >
      <i className="bi bi-filetype-csv"></i>
    </Button>
    <Button
      variant="outline-success"
      size="sm"
      onClick={() => handleExport("xlsx")}
      title="Export as Excel"
    >
      <i className="bi bi-file-earmark-excel"></i>
    </Button>
  </div>
</div>
      <div className="tablediv">
        <table>
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  onChange={(e) =>
                    setSelectedUsers(
                      e.target.checked ? users.map((user) => user._id) : []
                    )
                  }
                  checked={
                    selectedUsers.length === users.length && users.length > 0
                  }
                />
              </th>
              <th>Image</th> {/* 🖼️ New Image column */}
              <th>Username</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((user) => (
              <tr key={user._id}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedUsers.includes(user._id)}
                    onChange={() => handleSelect(user._id)}
                  />
                </td>
                {/* User Image */}
                <td>
                  <img
                    src={`${API_URL}/user-image/${user.email}`}
                    alt="User"
                    style={{
                      width: "50px",
                      height: "50px",
                      objectFit: "cover",
                      
                    }}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://via.placeholder.com/50"; // fallback
                    }}
                  />
                </td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => handleDelete(user._id)}
                  >
                    <FaTrashAlt />
                  </Button>
                </td>
              </tr>
            ))}
            {currentUsers.length === 0 && (
              <tr>
                <td colSpan="5">No users found.</td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="d-flex justify-content-between align-items-center mt-4 flex-wrap gap-2">
  <div className="d-flex align-items-center gap-2">
    <Button
      variant="outline-primary"
      size="sm"
      onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
      disabled={currentPage === 1}
    >
      &laquo; Prev
    </Button>

    <span style={{ fontWeight: "500" }}>
      Page {currentPage} of {totalPages}
    </span>

    <Button
      variant="outline-primary"
      size="sm"
      onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
      disabled={currentPage === totalPages}
    >
      Next &raquo;
    </Button>
  </div>

  <div>
    {filteredUsers.length > 0 && (
      <small className="text-muted">
        Showing {indexOfFirstUser + 1} to{" "}
        {Math.min(indexOfLastUser, filteredUsers.length)} of{" "}
        {filteredUsers.length}
      </small>
    )}
  </div>
</div>

      </div>
    </div>
  );
};

export default User;