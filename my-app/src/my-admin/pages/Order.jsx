// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import * as XLSX from 'xlsx';
// import { saveAs } from 'file-saver';
// import Papa from 'papaparse';
// import { Button, Modal } from 'react-bootstrap';
// import './Table.css';

// const Booking = () => {
//     const [bookings, setBookings] = useState([]);
//     const [currentPage, setCurrentPage] = useState(1);
//     const [totalPages, setTotalPages] = useState(1);
//     const [search, setSearch] = useState('');
//     const [selectedBookings, setSelectedBookings] = useState([]);
//     const [showModal, setShowModal] = useState(false);
//     const [selectedBookingDetails, setSelectedBookingDetails] = useState(null);
//     const [selectAll, setSelectAll] = useState(false);

//     useEffect(() => {
//         // Fetch bookings
//         axios
//             .get(`http://localhost:5001/api/bookings?page=${currentPage}&limit=10&search=${search}`)
//             .then((res) => {
//                 setBookings(res.data.bookings);
//                 setTotalPages(res.data.totalPages);
//             })
//             .catch((err) => console.error('Error fetching bookings:', err));
//     }, [currentPage, search]);

//     // Function to fetch bus name based on busId
//     const getBusName = (busId) => {
//         console.log('Fetching bus details for Bus ID:', busId);  // Debugging log
//         return axios
//             .get(`http://localhost:5001/api/bus/${busId}`)
//             .then((res) => {
//                 console.log('Bus Details Response:', res.data);  // Log the API response for debugging
//                 if (res.data && res.data.busName) {
//                     return res.data.busName; // Return the bus name
//                 } else {
//                     return 'Bus name not found'; // Fallback if bus name is not found
//                 }
//             })
//             .catch((err) => {
//                 console.error('Error fetching bus details:', err);
//                 return 'Bus name not found';  // Fallback error message
//             });
//     };

//     const exportToExcel = () => {
//         const ws = XLSX.utils.json_to_sheet(bookings);
//         const wb = XLSX.utils.book_new();
//         XLSX.utils.book_append_sheet(wb, ws, 'Bookings');

//         const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
//         const blob = new Blob([excelBuffer], { bookType: 'xlsx', type: 'application/octet-stream' });

//         saveAs(blob, 'bookings.xlsx');
//     };

//     const exportToCSV = () => {
//         const csv = Papa.unparse(bookings);
//         const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });

//         saveAs(blob, 'bookings.csv');
//     };

//     const handleCheckboxChange = (e, bookingId) => {
//         if (e.target.checked) {
//             setSelectedBookings([...selectedBookings, bookingId]);
//         } else {
//             setSelectedBookings(selectedBookings.filter(id => id !== bookingId));
//         }
//     };

//     const handleSelectAllChange = (e) => {
//         if (e.target.checked) {
//             setSelectedBookings(bookings.map(booking => booking._id));
//         } else {
//             setSelectedBookings([]);
//         }
//         setSelectAll(e.target.checked);
//     };

//     const handleViewBooking = (booking) => {
//         // Fetch the bus name before showing the modal
//         console.log('Viewing booking:', booking);  // Log the booking for debugging
//         getBusName(booking.busId).then(busName => {
//             setSelectedBookingDetails({
//                 ...booking,
//                 busName: busName, // Add bus name to booking details
//             });
//             setShowModal(true);
//         });
//     };

//     const handleDeleteBooking = (bookingId) => {
//         axios
//             .delete(`http://localhost:5001/api/bookings/${bookingId}`)
//             .then(() => {
//                 setBookings(bookings.filter((booking) => booking._id !== bookingId));
//                 alert('Booking deleted successfully!');
//             })
//             .catch((err) => console.error('Error deleting booking:', err));
//     };

//     return (
//         <div className='container mt-4'>
//             <h4 className='mb-3'>All Orders</h4>
//             <div className='d-flex justify-content-between mb-3'>
//                 <input type='text' className='form-control w-25 mb-3' placeholder='Search by Passenger Name' value={search} onChange={(e) => setSearch(e.target.value)} />
//                 <div className='d-flex gap-2'>
//                     <div className='mb-3'>
//                         <Button className='btn btn-success me-2' onClick={exportToExcel}>
//                             Export to Excel
//                         </Button>
//                         <Button className='btn btn-info ml-2' onClick={exportToCSV}>
//                             Export to CSV
//                         </Button>
//                     </div>
//                 </div>
//             </div>

//             <div className='tablediv'>
//                 <table>
//                     <thead className=''>
//                         <tr>
//                             <th>
//                                 <input type='checkbox' checked={selectAll} onChange={handleSelectAllChange} />
//                             </th>
//                             <th>S.no</th>
//                             <th>course</th>
//                             <th>course leavl</th>
//                             <th>course fess</th>
//                             <th>Email</th>
//                             <th>Phone</th>
//                             <th>Total</th>
//                             <th>Actions</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {bookings.map((booking, idx) => (
//                             <tr key={idx}>
//                                 <td>
//                                     <input type='checkbox' checked={selectedBookings.includes(booking._id)} onChange={(e) => handleCheckboxChange(e, booking._id)} />
//                                 </td>
//                                 <td>{booking.selectedSeats.join(', ')}</td>
//                                 <td>
//                                     {booking.passengers.map((p, i) => (
//                                         <div key={i}> {p.name} ({p.gender}, {p.age}) </div>
//                                     ))}
//                                 </td>
//                                 <td>{booking.email}</td>
//                                 <td>{booking.countryCode} {booking.phone}</td>
//                                 <td>₹{booking.totalAmount}</td>
//                                 <td>
//                                     {booking.createdAt ? new Date(booking.createdAt).toLocaleString() : 'Date not available'}
//                                 </td>

//                                 <td>
//                                     <Button variant='primary' onClick={() => handleViewBooking(booking)}>View</Button>
//                                     <Button variant='danger' className='ms-2' onClick={() => handleDeleteBooking(booking._id)}>Delete</Button>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//                 <div className='pagination'>
//                     <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
//                     <span> Page {currentPage} of {totalPages}</span>
//                     <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>Next</button>
//                 </div>
//             </div>

//             {/* View Booking Modal */}
//             <Modal show={showModal} onHide={() => setShowModal(false)}>
//                 <Modal.Header closeButton>
//                     <Modal.Title>Booking Details</Modal.Title>
//                 </Modal.Header>
//                 <Modal.Body>
//                     {selectedBookingDetails && (
//                         <div>
//                             <h5>Bus Name: {selectedBookingDetails.bus.busName}</h5> {/* Bus Name Displayed */}
//                             <h5>From: {selectedBookingDetails.bus.from}</h5>
//                             <h5>To: {selectedBookingDetails.bus.to}</h5>
//                             <h5>
//                                 Date of Departure:{" "}
//                                 {selectedBookingDetails.bus.dateOfDeparture
//                                     ? new Date( selectedBookingDetails.bus.dateOfDeparture).toLocaleDateString("en-IN", {
//                                         weekday: "long",
//                                         year: "numeric",
//                                         month: "long",
//                                         day: "numeric",
//                                     })
//                                     : "Not available"}
//                             </h5>

//                             <h6>Seats: {selectedBookingDetails.selectedSeats.join(', ')}</h6>
//                             <h6>Passengers:</h6>
//                             {selectedBookingDetails.passengers.map((p, i) => (
//                                 <div key={i}>
//                                     {p.name} ({p.gender}, {p.age})
//                                 </div>
//                             ))}
//                             <h6>Email: {selectedBookingDetails.email}</h6>
//                             <h6>Phone: {selectedBookingDetails.countryCode} {selectedBookingDetails.phone}</h6>
//                             <h6>Total Amount: ₹{selectedBookingDetails.totalAmount}</h6>
//                             <h6>Booked At: {new Date(selectedBookingDetails.createdAt).toLocaleString()}</h6>
//                         </div>
//                     )}
//                 </Modal.Body>
//                 <Modal.Footer>
//                     <Button variant='secondary' onClick={() => setShowModal(false)}>Close</Button>
//                 </Modal.Footer>
//             </Modal>
//         </div>
//     );
// };

// export default Booking;

import React, { useEffect, useState } from "react";
import axios from "axios";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import Papa from "papaparse";
import { Button, Modal } from "react-bootstrap";
import "./Table.css";
import { FaEye, FaTrash, FaFileExcel, FaFileCsv, FaEdit } from "react-icons/fa";

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
              return (
                <tr key={order._id}>
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedOrders.includes(order._id)}
                      onChange={(e) => handleCheckboxChange(e, order._id)}
                    />
                  </td>
                  <td>{idx + 1}</td>
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

        <div className="pagination">
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span>
            {" "}
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
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
