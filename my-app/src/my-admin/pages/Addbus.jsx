import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
import './Addbus.css';
import './Table.css';
import { exportCSV, exportExcel } from './export';
import { Dropdown, DropdownButton } from 'react-bootstrap';

const Addbus = () => {
    const [busList, setBusList] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [busName, setBusName] = useState('');
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const [boardingPoints, setBoardingPoints] = useState([{ id: 1, name: '', time: '' }]);
    const [droppingPoints, setDroppingPoints] = useState([{ id: 1, name: '', time: '' }]);
    const [price, setPrice] = useState('');
    const [seatsAvailable, setSeatsAvailable] = useState('');
    const [Totalseats, setTotalSeats] = useState('');
    const [dateOfDeparture, setDateOfDeparture] = useState('');
    const [dateOfArrival, setDateOfArrival] = useState('');
    const [sp, setSp] = useState('');
    const [ep, setEp] = useState('');
    const [duration, setDuration] = useState('');
    const [type, setType] = useState('');
    const [departureTime, setDepartureTime] = useState('');
    const [arrivalTime, setArrivalTime] = useState('');
    const [selectedBus, setSelectedBus] = useState(null);
    const [showViewModal, setShowViewModal] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [busesPerPage] = useState(5);
    const [searchQuery, setSearchQuery] = useState('');
    const [status, setStatus] = useState('');
    const [selectedBuses, setSelectedBuses] = useState([]);

    const fetchBuses = async () => {
        try {
            const res = await axios.get('http://localhost:5001/api/bus');
            // setBusList(res.data);
            setBusList(res.data.reverse());

        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchBuses();
    }, []);

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    const resetForm = () => {
        setBusName('');
        setFrom('');
        setTo('');
        setBoardingPoints([{ id: 1, name: '', time: '' }]);
        setDroppingPoints([{ id: 1, name: '', time: '' }]);
        setPrice('');
        setSeatsAvailable('');
        setTotalSeats('');
        setDateOfDeparture('');
        setDateOfArrival('');
        setDepartureTime('');
        setArrivalTime('');
        setSp('');
        setEp('');
        setDuration('');
        setType('');
        setEditingId(null);
        setStatus('');
    };

    const handleBoardingChange = (index, field, value) => {
        const updated = [...boardingPoints];
        updated[index][field] = value;
        setBoardingPoints(updated);
    };

    const handleDroppingChange = (index, field, value) => {
        const updated = [...droppingPoints];
        updated[index][field] = value;
        setDroppingPoints(updated);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const busData = {
            busName,
            from,
            to,
            boardingPoints,
            droppingPoints,
            price: Number(price),
            seatsAvailable: Number(seatsAvailable),
            Totalseats: Number(Totalseats),
            dateOfDeparture,
            dateOfArrival,
            departureTime,
            arrivalTime,
            sp,
            ep,
            duration,
            type,
            status
        };

        try {
            if (editingId) {
                await axios.post(`http://localhost:5001/api/bus/update/${editingId}`, busData);
                alert('Bus updated successfully!');
            } else {
                await axios.post('http://localhost:5001/api/bus/add', busData);
                alert('Bus added successfully!');
            }
            resetForm();
            setIsFormVisible(false);
            fetchBuses();
        } catch (err) {
            console.error(err);
            alert('Failed to save data');
        }
    };
    const handleEdit = (bus) => {
        setIsFormVisible(true);
        setEditingId(bus._id);
        setBusName(bus.busName);
        setFrom(bus.from);
        setTo(bus.to);
        setBoardingPoints(bus.boardingPoints);
        setDroppingPoints(bus.droppingPoints);
        setPrice(bus.price);
        setSeatsAvailable(bus.seatsAvailable);
        setTotalSeats(bus.Totalseats);
        setDateOfDeparture(bus.dateOfDeparture.slice(0, 10));
        setDateOfArrival(bus.dateOfArrival.slice(0, 10));
        setDepartureTime(bus.departureTime);
        setArrivalTime(bus.arrivalTime);
        setSp(bus.sp);
        setEp(bus.ep);
        setDuration(bus.duration);
        setType(bus.type);
        setStatus(bus.status);
    };
    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this bus?')) {
            try {
                await axios.delete(`http://localhost:5001/api/bus/${id}`);
                fetchBuses();
            } catch (err) {
                console.error(err);
                alert('Failed to delete bus');
            }
        }
    };
    const removeBoardingPoint = (index) => {
        const updated = [...boardingPoints];
        updated.splice(index, 1);
        setBoardingPoints(updated);
    };
    const removeDroppingPoint = (index) => {
        const updated = [...droppingPoints];
        updated.splice(index, 1);
        setDroppingPoints(updated);
    };
    const filteredBuses = busList.filter(bus => {
        const lowerSearchQuery = searchQuery.toLowerCase();
        return (
            (bus.busName.toLowerCase().includes(lowerSearchQuery) ||
                bus.from.toLowerCase().includes(lowerSearchQuery) ||
                bus.to.toLowerCase().includes(lowerSearchQuery))
        );
    });
    // Pagination logic
    const indexOfLastBus = currentPage * busesPerPage;
    const indexOfFirstBus = indexOfLastBus - busesPerPage;
    const currentBuses = filteredBuses
        .sort((a, b) => new Date(b.dateOfDeparture) - new Date(a.dateOfDeparture)) // Sort in descending order
        .slice(indexOfFirstBus, indexOfLastBus);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    // Calculate pagination info
    const totalBuses = busList.length;
    const totalPages = Math.ceil(totalBuses / busesPerPage);
    const startBus = indexOfFirstBus + 1;
    const endBus = indexOfLastBus > totalBuses ? totalBuses : indexOfLastBus;
    // Function to handle CSV export
    const handleExportCSV = () => {
        exportCSV(filteredBuses);  // Pass filtered buses to the exportCSV function
    };
    // Function to handle Excel export
    const handleExportExcel = () => {
        exportExcel(filteredBuses);  // Pass filtered buses to the exportExcel function
    };
    const handleDeleteSelected = async () => {
        if (selectedBuses.length === 0) {
            alert('Please select at least one bus to delete.');
            return;
        }

        if (window.confirm('Are you sure you want to delete the selected buses?')) {
            try {
                // Loop through selected buses and delete them
                for (let id of selectedBuses) {
                    await axios.delete(`http://localhost:5001/api/bus/${id}`);
                }
                // Refresh the bus list after deletion
                fetchBuses();
                setSelectedBuses([]);  // Clear selected buses after deletion
                alert('Selected buses deleted successfully!');
            } catch (err) {
                console.error(err);
                alert('Failed to delete selected buses');
            }
        }
    };
    return (
        <div>
            <div className="d-flex justify-content-between mb-3">
                <input type="text" placeholder="Search by bus name, from, or to" value={searchQuery} onChange={handleSearch} className="form-control w-25"
                />
                <div className='d-flex gap-2'>
                {selectedBuses.length > 0 && (
                        <Button variant="danger" onClick={handleDeleteSelected}>
                            Delete Selected Buses
                        </Button>
                    )}
                    <Button variant="success" onClick={() => { resetForm(); setIsFormVisible(true); }}>
                        + Add Bus
                    </Button>
                    
                    <DropdownButton id="dropdown-export" title="Export" variant="outline-primary">
                        <Dropdown.Item onClick={handleExportCSV}>Export as CSV</Dropdown.Item>
                        <Dropdown.Item onClick={handleExportExcel}>Export as Excel</Dropdown.Item>
                    </DropdownButton>
                </div>
            </div>
            {/* Form Modal */}
            <Modal show={isFormVisible} onHide={() => setIsFormVisible(false)} size="lg" centered>
                <Modal.Header closeButton>
                    <Modal.Title>{editingId ? 'Update Bus' : 'Add Bus'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmit} className="bus-form">
                        <div className="row">
                            <div className="col-md-6">
                                <label>Bus Name</label>
                                <input type="text" value={busName} onChange={e => setBusName(e.target.value)} required />

                                <label>From</label>
                                <input type="text" value={from} onChange={e => setFrom(e.target.value)} required />

                                <label>To</label>
                                <input type="text" value={to} onChange={e => setTo(e.target.value)} required />

                                <label>Departure Date</label>
                                <input type="date" value={dateOfDeparture} onChange={e => setDateOfDeparture(e.target.value)} required />

                                <label>Arrival Date</label>
                                <input type="date" value={dateOfArrival} onChange={e => setDateOfArrival(e.target.value)} required />

                                <label>Departure Time</label>
                                <input type="time" value={departureTime} onChange={e => setDepartureTime(e.target.value)} required />

                                <label>Arrival Time</label>
                                <input type="time" value={arrivalTime} onChange={e => setArrivalTime(e.target.value)} required />

                                <label className=' d-flex' >Type</label>
                                <select value={type} onChange={e => setType(e.target.value)} style={{ width: '50%' }}>
                                    <option value="">Select Type</option>
                                    <option value="AC">AC</option>
                                    <option value="NonAC">NonAC</option>
                                </select> <br />

                                <label className='mt-2 d-flex'>Status</label>
                                <select value={status} onChange={(e) => setStatus(e.target.value)} required style={{ width: '50%' }}>
                                    <option value="" disabled>Select Status</option>
                                    <option value="enabled">Enabled</option>
                                    <option value="disabled">Disabled</option>
                                </select>
                                <br />
                                <label className='mt-2'>Price</label>
                                <input type="number" value={price} onChange={e => setPrice(e.target.value)} required />
                            </div>

                            <div className="col-md-6">
                                <label>Seats Available</label>
                                <input type="number" value={seatsAvailable} onChange={e => setSeatsAvailable(e.target.value)} required />

                                <label>Total Seats</label>
                                <input type="number" value={Totalseats} onChange={e => setTotalSeats(e.target.value)} required />

                                <label>Starting Point</label>
                                <input type="text" value={sp} onChange={e => setSp(e.target.value)} required />

                                <label>Ending Point</label>
                                <input type="text" value={ep} onChange={e => setEp(e.target.value)} required />

                                <label>Duration</label>
                                <input type="text" value={duration} onChange={e => setDuration(e.target.value)} />

                                <h5 className="mt-3">Boarding Points</h5>
                                {boardingPoints.map((bp, i) => (
                                    <div key={i} className="d-flex gap-2 mb-1 align-items-center">
                                        <input type="text" placeholder="Name" value={bp.name} onChange={e => handleBoardingChange(i, 'name', e.target.value)} required />
                                        <input type="time" value={bp.time} onChange={e => handleBoardingChange(i, 'time', e.target.value)} required />
                                        {boardingPoints.length > 1 && (
                                            <Button variant="danger" size="sm" onClick={() => removeBoardingPoint(i)}>Remove</Button>
                                        )}
                                    </div>
                                ))}
                                <Button variant="outline-primary" size="sm" onClick={() => setBoardingPoints([...boardingPoints, { id: Date.now(), name: '', time: '' }])}>
                                    + Add Boarding Point
                                </Button>

                                <h5 className="mt-3">Dropping Points</h5>
                                {droppingPoints.map((dp, i) => (
                                    <div key={i} className="d-flex gap-2 mb-1 align-items-center">
                                        <input type="text" placeholder="Name" value={dp.name} onChange={e => handleDroppingChange(i, 'name', e.target.value)} required />
                                        <input type="time" value={dp.time} onChange={e => handleDroppingChange(i, 'time', e.target.value)} required />
                                        {droppingPoints.length > 1 && (
                                            <Button variant="danger" size="sm" onClick={() => removeDroppingPoint(i)}>Remove</Button>
                                        )}
                                    </div>
                                ))}
                                <Button variant="outline-primary" size="sm" onClick={() => setDroppingPoints([...droppingPoints, { id: Date.now(), name: '', time: '' }])}>
                                    + Add Dropping Point
                                </Button>
                            </div>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setIsFormVisible(false)}>Cancel</Button>
                    <Button variant="primary" onClick={handleSubmit}>{editingId ? 'Update Bus' : 'Add Bus'}</Button>
                </Modal.Footer>
            </Modal>

            {/* View Modal */}
            <Modal show={showViewModal} onHide={() => setShowViewModal(false)} size="lg" centered>
                <Modal.Header closeButton>
                    <Modal.Title>Bus Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedBus && (
                        <div className="bus-details">
                            <div className="row">
                                {/* Left Column */}
                                <div className="col-md-6">
                                    <p><strong>Bus Name:</strong> {selectedBus.busName}</p>
                                    <p><strong>Type:</strong> {selectedBus.type}</p>
                                    <p><strong>From:</strong> {selectedBus.from}</p>
                                    <p><strong>To:</strong> {selectedBus.to}</p>
                                    <p><strong>Departure Date:</strong> {new Date(selectedBus.dateOfDeparture).toLocaleDateString()}</p>
                                    <p><strong>Arrival Date:</strong> {new Date(selectedBus.dateOfArrival).toLocaleDateString()}</p>
                                    <p><strong>Departure Time:</strong> {selectedBus.departureTime}</p>
                                    <p><strong>Arrival Time:</strong> {selectedBus.arrivalTime}</p>
                                </div>

                                {/* Right Column */}
                                <div className="col-md-6">
                                    <p><strong>Starting Point:</strong> {selectedBus.sp}</p>
                                    <p><strong>Ending Point:</strong> {selectedBus.ep}</p>
                                    <p><strong>Duration:</strong> {selectedBus.duration}</p>
                                    <p><strong>Price:</strong> ₹{selectedBus.price}</p>
                                    <p><strong>Seats Available:</strong> {selectedBus.seatsAvailable}</p>
                                    <p><strong>Total Seats:</strong> {selectedBus.Totalseats}</p>
                                </div>
                            </div>

                            {/* Boarding and Dropping Points */}
                            <div className="row mt-4">
                                {/* Left Column for Boarding Points */}
                                <div className="col-md-6">
                                    <h6>Boarding Points:</h6>
                                    <ul>
                                        {selectedBus.boardingPoints.map((bp, i) => (
                                            <li key={i}>{bp.name} at {bp.time}</li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Right Column for Dropping Points */}
                                <div className="col-md-6">
                                    <h6>Dropping Points:</h6>
                                    <ul>
                                        {selectedBus.droppingPoints.map((dp, i) => (
                                            <li key={i}>{dp.name} at {dp.time}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowViewModal(false)}>Close</Button>
                </Modal.Footer>
            </Modal>

            {/* Table to Display Bus List */}
            <div className='tablediv'>
                <table>
                    <thead>
                        <tr>
                            <th>
                                <Form.Check type="checkbox" checked={selectedBuses.length === currentBuses.length} onChange={(e) => {
                                    if (e.target.checked) {
                                        setSelectedBuses(currentBuses.map(bus => bus._id));
                                    } else {
                                        setSelectedBuses([]);
                                    }
                                }}
                                />
                            </th>
                            <th className='tablewidth'>Bus Name</th>
                            <th className='tablewidth'>Type</th>
                            <th className='tablewidth'>From</th>
                            <th className='tablewidth'>To</th>
                            <th className='tablewidth'>Price</th>
                            <th className='tablewidth'>Seats</th>
                            <th className='tablewidth'>Status</th>
                            <th className='tablewidth'>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentBuses.map((bus, index) => (
                            <tr key={bus._id}>
                                <td>
                                    <Form.Check type="checkbox" checked={selectedBuses.includes(bus._id)} onChange={() => {
                                        if (selectedBuses.includes(bus._id)) {
                                            setSelectedBuses(selectedBuses.filter(id => id !== bus._id));
                                        } else {
                                            setSelectedBuses([...selectedBuses, bus._id]);
                                        }
                                    }}
                                    />
                                </td>
                                <td className='tablewidth'>{bus.busName}</td>
                                <td className='tablewidth'>{bus.type}</td>
                                <td className='tablewidth'>{bus.from}</td>
                                <td className='tablewidth'>{bus.to}</td>
                                <td className='tablewidth'>{bus.price}</td>
                                <td className='tablewidth'>{bus.seatsAvailable}</td>
                                <td className='tablewidth'>{bus.status}</td>
                                <td className='tablewidth'>
                                    <Button variant="info" size="sm" onClick={() => { setSelectedBus(bus); setShowViewModal(true); }} style={{ width: "60px" }}>View</Button>{' '}
                                    <Button variant="warning" size="sm" onClick={() => handleEdit(bus)} style={{ width: "60px" }}>Edit</Button>{' '}
                                    <Button variant="danger" size="sm" onClick={() => handleDelete(bus._id)} style={{ width: "60px" }}>Delete</Button>
                                </td>
                            </tr>

                        ))}
                    </tbody>
                </table>

                {/* Pagination */}
                <div className="pagination">
                    <span className='pagedetails'>{`Showing ${startBus} to ${endBus} of ${totalBuses} (${totalPages} Pages)`}</span>
                    <div>
                        {Array.from({ length: totalPages }, (_, index) => (
                            <Button key={index + 1} onClick={() => paginate(index + 1)} variant={currentPage === index + 1 ? 'primary' : 'secondary'} >
                                {index + 1}
                            </Button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Addbus;

// import React, { useReducer, useEffect, useState } from 'react';
// import axios from 'axios';
// import { Modal, Button } from 'react-bootstrap';
// import './Addbus.css';
// import './Table.css';
// import { exportCSV, exportExcel } from './export';
// import { busReducer, initialState } from './busReducer';

// const Addbus = () => {

//     const [state, dispatch] = useReducer(busReducer, initialState);
//     const [showViewModal, setShowViewModal] = useState(false);
//     const [selectedBus, setSelectedBus] = useState(null);

//     const openViewModal = (bus) => {
//         setSelectedBus(bus);
//         setShowViewModal(true);
//     };



//     const fetchBuses = async () => {
//         try {
//             const res = await axios.get('http://localhost:5001/api/bus');
//             dispatch({ type: 'SET_BUS_LIST', payload: res.data });
//         } catch (err) {
//             console.error(err);
//         }
//     };

//     useEffect(() => {
//         fetchBuses();
//     }, []);

//     const handleSearch = (e) => {
//         dispatch({ type: 'SET_SEARCH_QUERY', payload: e.target.value });
//     };

//     const resetForm = () => {
//         dispatch({ type: 'RESET_FORM' });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         const busData = {
//             busName: state.busName,
//             from: state.from,
//             to: state.to,
//             boardingPoints: state.boardingPoints,
//             droppingPoints: state.droppingPoints,
//             price: Number(state.price),
//             seatsAvailable: Number(state.seatsAvailable),
//             Totalseats: Number(state.Totalseats),
//             dateOfDeparture: state.dateOfDeparture,
//             dateOfArrival: state.dateOfArrival,
//             departureTime: state.departureTime,
//             arrivalTime: state.arrivalTime,
//             sp: state.sp,
//             ep: state.ep,
//             duration: state.duration,
//             type: state.type,
//             status: state.status,
//         };

//         try {
//             if (state.editingId) {
//                 await axios.post(`http://localhost:5001/api/bus/update/${state.editingId}`, busData);
//                 alert('Bus updated successfully!');
//             } else {
//                 await axios.post('http://localhost:5001/api/bus/add', busData);
//                 alert('Bus added successfully!');
//             }
//             resetForm();
//             dispatch({ type: 'TOGGLE_FORM' });
//             fetchBuses();
//         } catch (err) {
//             console.error('Error:', err.response || err.message || err);
//             alert('Failed to save data');
//         }
//     };

//     const handleEdit = (bus) => {
//         dispatch({ type: 'TOGGLE_FORM' });
//         dispatch({ type: 'SET_EDITING_ID', payload: bus._id });
//         dispatch({ type: 'SET_FIELD', field: 'busName', payload: bus.busName });
//         dispatch({ type: 'SET_FIELD', field: 'from', payload: bus.from });
//         dispatch({ type: 'SET_FIELD', field: 'to', payload: bus.to });
//         dispatch({ type: 'SET_FIELD', field: 'boardingPoints', payload: bus.boardingPoints });
//         dispatch({ type: 'SET_FIELD', field: 'droppingPoints', payload: bus.droppingPoints });
//         dispatch({ type: 'SET_FIELD', field: 'price', payload: bus.price });
//         dispatch({ type: 'SET_FIELD', field: 'seatsAvailable', payload: bus.seatsAvailable });
//         dispatch({ type: 'SET_FIELD', field: 'Totalseats', payload: bus.Totalseats });
//         dispatch({ type: 'SET_FIELD', field: 'dateOfDeparture', payload: bus.dateOfDeparture.slice(0, 10) });
//         dispatch({ type: 'SET_FIELD', field: 'dateOfArrival', payload: bus.dateOfArrival.slice(0, 10) });
//         dispatch({ type: 'SET_FIELD', field: 'departureTime', payload: bus.departureTime });
//         dispatch({ type: 'SET_FIELD', field: 'arrivalTime', payload: bus.arrivalTime });
//         dispatch({ type: 'SET_FIELD', field: 'sp', payload: bus.sp });
//         dispatch({ type: 'SET_FIELD', field: 'ep', payload: bus.ep });
//         dispatch({ type: 'SET_FIELD', field: 'duration', payload: bus.duration });
//         dispatch({ type: 'SET_FIELD', field: 'type', payload: bus.type });
//     };

//     const handleDelete = async (id) => {
//         if (window.confirm('Are you sure you want to delete this bus?')) {
//             try {
//                 await axios.delete(`http://localhost:5001/api/bus/${id}`);
//                 fetchBuses();
//             } catch (err) {
//                 console.error(err);
//                 alert('Failed to delete bus');
//             }
//         }
//     };

//     const handleStatusChange = (e) => {
//         dispatch({ type: 'SET_STATUS', payload: e.target.value });
//     };

//     const filteredBuses = state.busList.filter(bus => {
//         const lowerSearchQuery = state.searchQuery.toLowerCase();
//         return (
//             (bus.busName.toLowerCase().includes(lowerSearchQuery) ||
//                 bus.from.toLowerCase().includes(lowerSearchQuery) ||
//                 bus.to.toLowerCase().includes(lowerSearchQuery)) &&
//             (state.status === 'all' || (state.status === 'enabled' && bus.status) || (state.status === 'disabled' && !bus.status))
//         );
//     });

//     const indexOfLastBus = state.currentPage * state.busesPerPage;
//     const indexOfFirstBus = indexOfLastBus - state.busesPerPage;
//     const currentBuses = filteredBuses
//         .sort((a, b) => new Date(b.dateOfDeparture) - new Date(a.dateOfDeparture))
//         .slice(indexOfFirstBus, indexOfLastBus);

//     const paginate = (pageNumber) => dispatch({ type: 'SET_CURRENT_PAGE', payload: pageNumber });

//     const totalBuses = state.busList.length;
//     const totalPages = Math.ceil(totalBuses / state.busesPerPage);
//     const startBus = indexOfFirstBus + 1;
//     const endBus = indexOfLastBus > totalBuses ? totalBuses : indexOfLastBus;


//     // Function to handle CSV export
//     const handleExportCSV = () => {
//         exportCSV(filteredBuses);  // Pass filtered buses to the exportCSV function
//     };

//     // Function to handle Excel export
//     const handleExportExcel = () => {
//         exportExcel(filteredBuses);  // Pass filtered buses to the exportExcel function
//     };

//     return (
//         <div>
//             <div className="d-flex justify-content-between mb-3">
//                 <Button variant="success" onClick={() => { resetForm(); dispatch({ type: 'TOGGLE_FORM' }); }}>
//                     + Add Bus
//                 </Button>
//                 <input type="text" placeholder="Search by bus name, from, or to" value={state.searchQuery} onChange={handleSearch} className="form-control w-25" />
//                 <select value={state.status} onChange={handleStatusChange} className="form-select w-25" >
//                     <option value="all">All</option>
//                     <option value="enabled">Enabled</option>
//                     <option value="disabled">Disabled</option>
//                 </select>
//                 <Button variant="outline-secondary" onClick={handleExportCSV}>
//                     Export CSV
//                 </Button>
//                 <Button variant="outline-primary" onClick={handleExportExcel}>
//                     Export Excel
//                 </Button>
//             </div>
//             {/* Form Modal */}
//             <Modal show={state.isFormVisible} onHide={() => dispatch({ type: 'TOGGLE_FORM' })} size="lg" centered >
//                 <Modal.Header closeButton>
//                     <Modal.Title>{state.editingId ? 'Update Bus' : 'Add Bus'}</Modal.Title>
//                 </Modal.Header>
//                 <Modal.Body>
//                     <form onSubmit={handleSubmit} className="bus-form">
//                         <div className="row">
//                             <div className="col-md-6">
//                                 <label>Bus Name</label>
//                                 <input type="text" value={state.busName} onChange={(e) => dispatch({ type: 'SET_FIELD', field: 'busName', value: e.target.value })} required />

//                                 <label>From</label>
//                                 <input type="text" value={state.from} onChange={(e) => dispatch({ type: 'SET_FIELD', field: 'from', value: e.target.value })} required />

//                                 <label>To</label>
//                                 <input type="text" value={state.to} onChange={(e) => dispatch({ type: 'SET_FIELD', field: 'to', value: e.target.value })} required />

//                                 <label>Departure Date</label>
//                                 <input type="date" value={state.dateOfDeparture} onChange={(e) => dispatch({ type: 'SET_FIELD', field: 'dateOfDeparture', value: e.target.value })} required />

//                                 <label>Arrival Date</label>
//                                 <input type="date" value={state.dateOfArrival} onChange={(e) => dispatch({ type: 'SET_FIELD', field: 'dateOfArrival', value: e.target.value })} required />

//                                 <label>Departure Time</label>
//                                 <input type="time" value={state.departureTime} onChange={(e) => dispatch({ type: 'SET_FIELD', field: 'departureTime', value: e.target.value })} required />

//                                 <label>Arrival Time</label>
//                                 <input type="time" value={state.arrivalTime} onChange={(e) => dispatch({ type: 'SET_FIELD', field: 'arrivalTime', value: e.target.value })} required />

//                                 <label>Type</label>
//                                 <input type="text" value={state.type} onChange={(e) => dispatch({ type: 'SET_FIELD', field: 'type', value: e.target.value })} />

//                                 <label>Bus Status</label>
//                                 <select name="status" value={state.status} onChange={(e) => dispatch({ type: 'SET_STATUS', payload: e.target.value })}>
//                                     <option value="">Select Status</option>
//                                     <option value="enabled">Enabled</option>
//                                     <option value="disabled">Disabled</option>
//                                 </select>

//                             </div>

//                             <div className="col-md-6">
//                                 <label>Price</label>
//                                 <input type="number" value={state.price} onChange={(e) => dispatch({ type: 'SET_FIELD', field: 'price', value: e.target.value })} required />

//                                 <label>Seats Available</label>
//                                 <input type="number" value={state.seatsAvailable} onChange={(e) => dispatch({ type: 'SET_FIELD', field: 'seatsAvailable', value: e.target.value })} required />

//                                 <label>Total Seats</label>
//                                 <input type="number" value={state.Totalseats} onChange={(e) => dispatch({ type: 'SET_FIELD', field: 'Totalseats', value: e.target.value })} required />

//                                 <label>Starting Point</label>
//                                 <input type="text" value={state.sp} onChange={(e) => dispatch({ type: 'SET_FIELD', field: 'sp', value: e.target.value })} required />

//                                 <label>Ending Point</label>
//                                 <input type="text" value={state.ep} onChange={(e) => dispatch({ type: 'SET_FIELD', field: 'ep', value: e.target.value })} required />

//                                 <label>Duration</label>
//                                 <input type="text" value={state.duration} onChange={(e) => dispatch({ type: 'SET_FIELD', field: 'duration', value: e.target.value })} />

//                                 <h5 className="mt-3">Boarding Points</h5>
//                                 {state.boardingPoints.map((bp, i) => (
//                                     <div key={bp.id} className="d-flex gap-2 mb-1 align-items-center">
//                                         <input
//                                             type="text"
//                                             placeholder="Boarding Point"
//                                             value={bp.name}
//                                             onChange={(e) => dispatch({
//                                                 type: 'SET_BOARDING_POINT',
//                                                 index: i,
//                                                 name: e.target.value
//                                             })}
//                                         />
//                                         <input
//                                             type="time"
//                                             value={bp.time}
//                                             onChange={(e) => dispatch({
//                                                 type: 'SET_BOARDING_POINT_TIME',
//                                                 index: i,
//                                                 time: e.target.value
//                                             })}
//                                             required
//                                         />
//                                         {state.boardingPoints.length > 1 && (
//                                             <Button variant="danger" size="sm" onClick={() => dispatch({ type: 'REMOVE_BOARDING_POINT', payload: i })}>Remove</Button>
//                                         )}
//                                     </div>
//                                 ))}
//                                 <Button variant="outline-primary" size="sm" onClick={() => dispatch({ type: 'ADD_BOARDING_POINT' })}>
//                                     + Add Boarding Point
//                                 </Button>
//                                 <h5 className="mt-3">Dropping Points</h5>
//                                 {state.droppingPoints.map((dp, i) => (
//                                     <div key={i} className="d-flex gap-2 mb-1 align-items-center">
//                                         <input
//                                             type="text"
//                                             placeholder="Name"
//                                             value={dp.name}
//                                             onChange={(e) => dispatch({
//                                                 type: 'SET_DROPPING_POINT',
//                                                 index: i,
//                                                 name: e.target.value
//                                             })}
//                                             required
//                                         />

//                                         <input
//                                             type="time"
//                                             value={dp.time}
//                                             onChange={(e) => dispatch({
//                                                 type: 'SET_DROPPING_POINT_TIME',
//                                                 index: i,
//                                                 time: e.target.value
//                                             })}
//                                             required
//                                         />
//                                         {state.droppingPoints.length > 1 && (
//                                             <Button variant="danger" size="sm" onClick={() => dispatch({ type: 'REMOVE_DROPPING_POINT', payload: i })}>
//                                                 Remove
//                                             </Button>
//                                         )}
//                                     </div>
//                                 ))}
//                                 <Button variant="outline-primary" size="sm" onClick={() => dispatch({ type: 'ADD_DROPPING_POINT' })}>
//                                     + Add Dropping Point
//                                 </Button>

//                             </div>
//                         </div>
//                     </form>
//                 </Modal.Body>
//                 <Modal.Footer>
//                     <Button variant="secondary" onClick={() => dispatch({ type: 'TOGGLE_FORM' })}> Cancel</Button>
//                     <Button variant="primary" onClick={handleSubmit}>{state.editingId ? 'Update Bus' : 'Add Bus'}</Button>
//                 </Modal.Footer>
//             </Modal>

//             {/* View Modal */}
//             <Modal show={showViewModal} onHide={() => setShowViewModal(false)} size="lg" centered>
//                 <Modal.Header closeButton>
//                     <Modal.Title>Bus Details</Modal.Title>
//                 </Modal.Header>
//                 <Modal.Body>
//                     {/* Check if selectedBus is defined and display data */}
//                     {selectedBus && (
//                         <div className="bus-details">
//                             <div className="row">
//                                 {/* Left Column */}
//                                 <div className="col-md-6">
//                                     <p><strong>Bus Name:</strong> {selectedBus.busName}</p>
//                                     <p><strong>Type:</strong> {selectedBus.type}</p>
//                                     <p><strong>From:</strong> {selectedBus.from}</p>
//                                     <p><strong>To:</strong> {selectedBus.to}</p>
//                                     <p><strong>Departure Date:</strong> {new Date(selectedBus.dateOfDeparture).toLocaleDateString()}</p>
//                                     <p><strong>Arrival Date:</strong> {new Date(selectedBus.dateOfArrival).toLocaleDateString()}</p>
//                                     <p><strong>Departure Time:</strong> {selectedBus.departureTime}</p>
//                                     <p><strong>Arrival Time:</strong> {selectedBus.arrivalTime}</p>
//                                 </div>

//                                 {/* Right Column */}
//                                 <div className="col-md-6">
//                                     <p><strong>Starting Point:</strong> {selectedBus.sp}</p>
//                                     <p><strong>Ending Point:</strong> {selectedBus.ep}</p>
//                                     <p><strong>Duration:</strong> {selectedBus.duration}</p>
//                                     <p><strong>Price:</strong> Rs{selectedBus.price}</p>
//                                     <p><strong>Seats Available:</strong> {selectedBus.seatsAvailable}</p>
//                                     <p><strong>Total Seats:</strong> {selectedBus.Totalseats}</p>
//                                 </div>
//                             </div>

//                             {/* Boarding and Dropping Points */}
//                             <div className="row mt-4">
//                                 {/* Left Column for Boarding Points */}
//                                 <div className="col-md-6">
//                                     <h6>Boarding Points:</h6>
//                                     <ul>
//                                         {selectedBus.boardingPoints.map((bp, i) => (
//                                             <li key={i}>{bp.name} at {bp.time}</li>
//                                         ))}
//                                     </ul>
//                                 </div>

//                                 {/* Right Column for Dropping Points */}
//                                 <div className="col-md-6">
//                                     <h6>Dropping Points:</h6>
//                                     <ul>
//                                         {selectedBus.droppingPoints.map((dp, i) => (
//                                             <li key={i}>{dp.name} at {dp.time}</li>
//                                         ))}
//                                     </ul>
//                                 </div>
//                             </div>
//                         </div>
//                     )}
//                 </Modal.Body>
//                 <Modal.Footer>
//                     <Button variant="secondary" onClick={() => setShowViewModal(false)}>Close</Button>
//                 </Modal.Footer>
//             </Modal>

//             {/* Table to Display Bus List */}
//             <div className='tablediv'>
//                 <table>
//                     <thead>
//                         <tr>
//                             <th>S.No</th>
//                             <th>Bus Name</th>
//                             <th>Type</th>
//                             <th>From</th>
//                             <th>To</th>
//                             <th>Departure Date</th>
//                             <th>Arrival Date</th>
//                             <th>Duration</th>
//                             <th>Price</th>
//                             <th>Seats</th>
//                             <th>Status</th>
//                             <th>Actions</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {currentBuses.map((bus, index) => (
//                             <tr key={bus._id}>
//                                 <td>{index + 1}</td>
//                                 <td>{bus.busName}</td>
//                                 <td>{bus.type}</td>
//                                 <td>{bus.from}</td>
//                                 <td>{bus.to}</td>
//                                 <td>{new Date(bus.dateOfDeparture).toLocaleDateString()}</td>
//                                 <td>{new Date(bus.dateOfArrival).toLocaleDateString()}</td>
//                                 <td>{bus.duration}</td>
//                                 <td>{bus.price}</td>
//                                 <td>{bus.seatsAvailable}</td>
//                                 <td>
//                                     <Button>
//                                         {bus.status}
//                                     </Button>
//                                 </td>
//                                 <td>
//                                     <Button variant="info" size="sm" onClick={() => openViewModal(bus)}>View</Button>
//                                     <Button variant="warning" size="sm" onClick={() => handleEdit(bus)}>Update</Button>
//                                     <Button variant="danger" size="sm" onClick={() => handleDelete(bus._id)}>Delete</Button>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>

//                 {/* Pagination */}
//                 <div className="pagination">
//                     <span className='pagedetails'>{`Showing ${startBus} to ${endBus} of ${totalBuses} (${totalPages} Pages)`}</span>
//                     <div>
//                         {Array.from({ length: totalPages }, (_, index) => (
//                             <Button key={index + 1} onClick={() => paginate(index + 1)} variant={state.currentPage === index + 1 ? 'primary' : 'secondary'}
//                             >
//                                 {index + 1}
//                             </Button>
//                         ))}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Addbus;
