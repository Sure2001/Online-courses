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
          <DropdownButton
            id="dropdown-export"
            title="Export"
            variant="outline-primary"
          >
            <Dropdown.Item onClick={() => handleExport("csv")}>
              Export as CSV
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleExport("xlsx")}>
              Export as Excel
            </Dropdown.Item>
          </DropdownButton>
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

        <div className="d-flex justify-content-between align-items-center mt-3">
          <div>
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`btn btn-sm me-2 ${
                  currentPage === i + 1
                    ? "btn-primary"
                    : "btn-outline-secondary"
                }`}
                style={{ width: "36px", height: "36px", padding: 0 }}
              >
                {i + 1}
              </button>
            ))}
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


// import React, { useState, useEffect } from 'react';
// import './Table.css';
// import * as XLSX from 'xlsx';
// import { saveAs } from 'file-saver';
// import { Dropdown, DropdownButton } from 'react-bootstrap';
// import { Button } from 'react-bootstrap';

// const User = () => {
//     const [users, setUsers] = useState([]);
//     const [selectedUsers, setSelectedUsers] = useState([]);
//     const [searchTerm, setSearchTerm] = useState('');

//     useEffect(() => {
//         const fetchUsers = async () => {
//             try {
//                 const response = await fetch('http://localhost:5001/api/auth/users');
//                 const data = await response.json();
//                 // setUsers(data);
//                 setUsers(data.reverse());
//             } catch (error) {
//                 console.error('Error fetching users:', error);
//             }
//         };

//         fetchUsers();
//     }, []);

//     const handleDelete = async (id) => {
//         try {
//             const response = await fetch(`http://localhost:5001/api/auth/users/${id}`, {
//                 method: 'DELETE',
//             });
//             const data = await response.json();
//             if (response.ok) {
//                 setUsers(users.filter(user => user._id !== id));
//             } else {
//                 alert(data.message);
//             }
//         } catch (error) {
//             console.error('Error deleting user:', error);
//         }
//     };

//     const handleSelect = (userId) => {
//         setSelectedUsers((prev) =>
//             prev.includes(userId)
//                 ? prev.filter(id => id !== userId)
//                 : [...prev, userId]
//         );
//     };

//     const handleBulkDelete = async () => {
//         if (selectedUsers.length === 0) return alert('Please select at least one user to delete.');

//         try {
//             await Promise.all(
//                 selectedUsers.map(userId =>
//                     fetch(`http://localhost:5001/api/auth/users/${userId}`, {
//                         method: 'DELETE',
//                     })
//                 )
//             );
//             setUsers(users.filter(user => !selectedUsers.includes(user._id)));
//             setSelectedUsers([]);
//         } catch (error) {
//             console.error('Error deleting users:', error);
//         }
//     };

//     // 🔍 Filter users by search
//     const filteredUsers = users.filter(user =>
//         user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         user.email.toLowerCase().includes(searchTerm.toLowerCase())
//     );

//     // 📤 Export to CSV/XLS
//     const handleExport = (type) => {
//         const exportData = filteredUsers.map(({ username, email }) => ({ Username: username, Email: email }));
//         const worksheet = XLSX.utils.json_to_sheet(exportData);
//         const workbook = XLSX.utils.book_new();
//         XLSX.utils.book_append_sheet(workbook, worksheet, "Users");

//         const excelBuffer = XLSX.write(workbook, { bookType: type, type: "array" });
//         const data = new Blob([excelBuffer], { type: "application/octet-stream" });
//         saveAs(data, `users_export.${type}`);
//     };

//     return (
//         <div>
//             <h2>User List</h2>
//             <div className='d-flex justify-content-between align-items-center mb-3'>
//                 {/* 🔍 Search Box */}
//                 <input
//                     type="text"
//                     placeholder="Search by username or email..."
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                     style={{ marginBottom: '10px', padding: '5px', width: '300px' }}
//                 />
//                 <div className='d-flex align-items-center  gap-2'>
//                     {/* 🗑️ Delete Button */}
//                     {selectedUsers.length > 0 && (
//                         <Button variant="danger" size="sm" onClick={handleBulkDelete} style={{ marginLeft: '10px', backgroundColor: 'red', color: 'white' }}>
//                             Delete Selected Users
//                         </Button>
//                     )}

//                     {/* 📥 Export Buttons */}
//                     <DropdownButton id="dropdown-export" title="Export" variant="outline-primary">
//                         <Dropdown.Item onClick={() => handleExport('csv')}>
//                             Export as CSV
//                         </Dropdown.Item>
//                         <Dropdown.Item onClick={() => handleExport('xlsx')}>
//                             Export as Excel
//                         </Dropdown.Item>
//                     </DropdownButton>

//                 </div>
//             </div>

//             {/* 🧾 User Table */}
//             <table>
//                 <thead>
//                     <tr>
//                         <th>
//                             <input
//                                 type="checkbox"
//                                 onChange={(e) => {
//                                     setSelectedUsers(e.target.checked ? users.map(user => user._id) : []);
//                                 }}
//                                 checked={selectedUsers.length === users.length && users.length > 0}
//                             />
//                         </th>
//                         <th>Username</th>
//                         <th>Email</th>
//                         <th>Actions</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {filteredUsers.map((user) => (
//                         <tr key={user._id}>
//                             <td>
//                                 <input
//                                     type="checkbox"
//                                     checked={selectedUsers.includes(user._id)}
//                                     onChange={() => handleSelect(user._id)}
//                                 />
//                             </td>
//                             <td>{user.username}</td>
//                             <td>{user.email}</td>
//                             <td>
//                                 <Button variant="danger" size="sm" onClick={() => handleDelete(user._id)}>Delete</Button>
//                             </td>
//                         </tr>
//                     ))}
//                     {filteredUsers.length === 0 && (
//                         <tr>
//                             <td colSpan="4">No users found.</td>
//                         </tr>
//                     )}
//                 </tbody>
//             </table>
//         </div>
//     );
// };
// export default User;

// import React, { useState, useEffect } from 'react';
// import './Table.css';
// import * as XLSX from 'xlsx';
// import { saveAs } from 'file-saver';
// import { Dropdown, DropdownButton, Button } from 'react-bootstrap';

// const User = () => {
//     const [users, setUsers] = useState([]);
//     const [selectedUsers, setSelectedUsers] = useState([]);
//     const [searchTerm, setSearchTerm] = useState('');
//     const [currentPage, setCurrentPage] = useState(1);
//     const usersPerPage = 5;

//     useEffect(() => {
//         const fetchUsers = async () => {
//             try {
//                 const response = await fetch('http://localhost:5001/api/auth/users');
//                 const data = await response.json();
//                 setUsers(data.reverse()); // Show newest users first
//             } catch (error) {
//                 console.error('Error fetching users:', error);
//             }
//         };

//         fetchUsers();
//     }, []);

//     const handleDelete = async (id) => {
//         try {
//             const response = await fetch(`http://localhost:5000/api/auth/users/${id}`, {
//                 method: 'DELETE',
//             });
//             const data = await response.json();
//             if (response.ok) {
//                 setUsers(users.filter(user => user._id !== id));
//             } else {
//                 alert(data.message);
//             }
//         } catch (error) {
//             console.error('Error deleting user:', error);
//         }
//     };

//     const handleSelect = (userId) => {
//         setSelectedUsers((prev) =>
//             prev.includes(userId)
//                 ? prev.filter(id => id !== userId)
//                 : [...prev, userId]
//         );
//     };

//     const handleBulkDelete = async () => {
//         if (selectedUsers.length === 0) return alert('Please select at least one user to delete.');

//         try {
//             await Promise.all(
//                 selectedUsers.map(userId =>
//                     fetch(`http://localhost:5001/api/auth/users/${userId}`, {
//                         method: 'DELETE',
//                     })
//                 )
//             );
//             setUsers(users.filter(user => !selectedUsers.includes(user._id)));
//             setSelectedUsers([]);
//         } catch (error) {
//             console.error('Error deleting users:', error);
//         }
//     };

//     const handleExport = (type) => {
//         const exportData = filteredUsers.map(({ username, email }) => ({ Username: username, Email: email }));
//         const worksheet = XLSX.utils.json_to_sheet(exportData);
//         const workbook = XLSX.utils.book_new();
//         XLSX.utils.book_append_sheet(workbook, worksheet, "Users");

//         const excelBuffer = XLSX.write(workbook, { bookType: type, type: "array" });
//         const data = new Blob([excelBuffer], { type: "application/octet-stream" });
//         saveAs(data, `users_export.${type}`);
//     };

//     // 🔍 Filtered users list
//     const filteredUsers = users.filter(user =>
//         user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         user.email.toLowerCase().includes(searchTerm.toLowerCase())
//     );

//     // 🔢 Pagination logic
//     const indexOfLastUser = currentPage * usersPerPage;
//     const indexOfFirstUser = indexOfLastUser - usersPerPage;
//     const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
//     const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

//     return (
//         <div>
//             <h2>User List</h2>
//             <div className='d-flex justify-content-between align-items-center mb-3'>
//                 <input
//                     type="text"
//                     placeholder="Search by username or email..."
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                     style={{ marginBottom: '10px', padding: '5px', width: '300px' }}
//                 />
//                 <div className='d-flex align-items-center gap-2'>
//                     {selectedUsers.length > 0 && (
//                         <Button variant="danger" size="sm" onClick={handleBulkDelete}>
//                             Delete Selected Users
//                         </Button>
//                     )}
//                     <DropdownButton id="dropdown-export" title="Export" variant="outline-primary">
//                         <Dropdown.Item onClick={() => handleExport('csv')}>Export as CSV</Dropdown.Item>
//                         <Dropdown.Item onClick={() => handleExport('xlsx')}>Export as Excel</Dropdown.Item>
//                     </DropdownButton>
//                 </div>
//             </div>

//             {/* 🧾 User Table */}
//             <div className='tablediv'>
//                 <table>
//                     <thead>
//                         <tr>
//                             <th>
//                                 <input
//                                     type="checkbox"
//                                     onChange={(e) => {
//                                         setSelectedUsers(e.target.checked ? users.map(user => user._id) : []);
//                                     }}
//                                     checked={selectedUsers.length === users.length && users.length > 0}
//                                 />
//                             </th>
//                             <th className='tablewidth'>Username</th>
//                             <th className='tablewidth'>Email</th>
//                             <th className='tablewidth'>Actions</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {currentUsers.map((user) => (
//                             <tr key={user._id}>
//                                 <td>
//                                     <input
//                                         type="checkbox"
//                                         checked={selectedUsers.includes(user._id)}
//                                         onChange={() => handleSelect(user._id)}
//                                     />
//                                 </td>
//                                 <td className='tablewidth'>{user.username}</td>
//                                 <td className='tablewidth'>{user.email}</td>
//                                 <td className='tablewidth'>
//                                     <Button variant="danger" size="sm" onClick={() => handleDelete(user._id)}>Delete</Button>
//                                 </td>
//                             </tr>
//                         ))}
//                         {currentUsers.length === 0 && (
//                             <tr>
//                                 <td colSpan="4">No users found.</td>
//                             </tr>
//                         )}
//                     </tbody>
//                 </table>

//                 {/* 🔢 Pagination */}
//                 <div className="d-flex justify-content-between align-items-center mt-3">
//                     <div>
//                         {[...Array(totalPages)].map((_, i) => (
//                             <button
//                                 key={i}
//                                 onClick={() => setCurrentPage(i + 1)}
//                                 className={`btn btn-sm me-2 ${currentPage === i + 1 ? 'btn-primary' : 'btn-outline-secondary'}`}
//                                 style={{ width: '36px', height: '36px', padding: 0 }}
//                             >
//                                 {i + 1}
//                             </button>
//                         ))}
//                     </div>
//                     <div>
//                         {filteredUsers.length > 0 && (
//                             <small className="text-muted">
//                                 Showing {indexOfFirstUser + 1} to {Math.min(indexOfLastUser, filteredUsers.length)} of {filteredUsers.length} ({totalPages} Page{totalPages > 1 ? 's' : ''})
//                             </small>
//                         )}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default User;
