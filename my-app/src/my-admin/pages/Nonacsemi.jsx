// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import "./Table.css"

// const Nonacsemi = () => {
//   const [buses, setBuses] = useState([]);

//   useEffect(() => {
//     const fetchBuses = async () => {
//       try {
//         const res = await axios.get('http://localhost:5001/api/nonac/semi'); // New route for 2+2 Non-AC Semi Sleeper
//         setBuses(res.data);
//       } catch (error) {
//         console.error('Error fetching buses:', error);
//       }
//     };

//     fetchBuses();
//   }, []);

//   return (
//     <div style={{ padding: '20px' }}>
//       <h2>2+2 Non-AC Semi Sleeper Buses</h2>
//       {buses.length === 0 ? (
//         <p>No buses found.</p>
//       ) : (
//         <table >
//           <thead>
//             <tr>
//               <th>Bus Name</th>
//               <th>Type</th>
//               <th>From</th>
//               <th>To</th>
//               <th>Departure Date</th>
//               <th>Arrival Date</th>
//               <th>Starting Point</th>
//               <th>Ending Point</th>
//               <th>Price</th>
//               <th>Seats Available</th>
//             </tr>
//           </thead>
//           <tbody>
//             {buses.map((bus, index) => (
//               <tr key={index}>
//                 <td>{bus.busName}</td>
//                 <td>{bus.type}</td>
//                 <td>{bus.from}</td>
//                 <td>{bus.to}</td>
//                 <td>{new Date(bus.dateOfDeparture).toLocaleDateString()}</td>
//                 <td>{new Date(bus.dateOfArrival).toLocaleDateString()}</td>
//                 <td>{bus.sp}</td>
//                 <td>{bus.ep}</td>
//                 <td>{bus.price}</td>
//                 <td>{bus.seatsAvailable}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default Nonacsemi;

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Nonacsemi = () => {
  const [buses, setBuses] = useState([]);
  const [editingBus, setEditingBus] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);

  const [busName, setBusName] = useState('');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [price, setPrice] = useState('');
  const [seatsAvailable, setSeatsAvailable] = useState('');
  const [Totalseats, setTotalSeats] = useState('');
  const [dateOfDeparture, setDateOfDeparture] = useState('');
  const [dateOfArrival, setDateOfArrival] = useState('');
  const [sp, setSp] = useState('');
  const [ep, setEp] = useState('');
  const [boardingPoints, setBoardingPoints] = useState([{ name: '', time: '' }]);
  const [droppingPoints, setDroppingPoints] = useState([{ name: '', time: '' }]);
  const [type, setType] = useState('2+2 Non-AC semi sleeper');
  const [duration, setDuration] = useState('');  // New state for duration
  const [departureTime, setDepartureTime] = useState('');
  const [arrivalTime, setArrivalTime] = useState('');

  // Fetch buses from the backend
  const fetchBuses = async () => {
    try {
      const res = await axios.get('http://localhost:5001/api/nonac/semi');
      setBuses(res.data);
    } catch (error) {
      console.error('Error fetching buses:', error);
    }
  };

  useEffect(() => {
    fetchBuses();
  }, []);

  // Handle form submission for adding or updating bus
  const handleSubmit = async (e) => {
    e.preventDefault();
    const busData = {
      busName,
      from,
      to,
      price: Number(price),
      seatsAvailable: Number(seatsAvailable),
      Totalseats: Number(Totalseats),
      dateOfDeparture,
      dateOfArrival,
      departureTime,
      arrivalTime,
      sp,
      ep,
      boardingPoints,
      droppingPoints,
      type,
      duration,  // Include duration when submitting
    };

    try {
      if (editingBus) {
        // Update existing bus
        await axios.post(`http://localhost:5001/api/nonac/semi/update/${editingBus._id}`, busData);
        alert('Bus updated successfully!');
      } else {
        // Add new bus
        await axios.post('http://localhost:5001/api/bus/add', busData);
        alert('Bus added successfully!');
      }

      resetForm();
      fetchBuses();
    } catch (error) {
      console.error('Error saving bus:', error);
      alert('Failed to save bus');
    }
  };

  // Handle edit button click
  const handleEdit = (bus) => {
    setEditingBus(bus);
    setIsFormVisible(true);
    setBusName(bus.busName);
    setFrom(bus.from);
    setTo(bus.to);
    setPrice(bus.price);
    setSeatsAvailable(bus.seatsAvailable);
    setTotalSeats(bus.Totalseats);
    setDateOfDeparture(bus.dateOfDeparture.slice(0, 10));
    setDateOfArrival(bus.dateOfArrival.slice(0, 10));
    setDepartureTime(bus.departureTime);
    setArrivalTime(bus.arrivalTime);
    setSp(bus.sp);
    setEp(bus.ep);
    setBoardingPoints(bus.boardingPoints);
    setDroppingPoints(bus.droppingPoints);
    setType(bus.type);
    setDuration(bus.duration);  // Pre-fill duration when editing
  };

  // Handle delete button click
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this bus?')) {
      try {
        await axios.delete(`http://localhost:5001/api/nonac/semi/${id}`);
        fetchBuses();
        alert('Bus deleted successfully!');
      } catch (error) {
        console.error('Error deleting bus:', error);
        alert('Failed to delete bus');
      }
    }
  };

  // Reset form to default values
  const resetForm = () => {
    setEditingBus(null);
    setIsFormVisible(false);
    setBusName('');
    setFrom('');
    setTo('');
    setPrice('');
    setSeatsAvailable('');
    setTotalSeats('');
    setDateOfDeparture('');
    setDateOfArrival('');
    setDepartureTime('');
    setArrivalTime('');
    setSp('');
    setEp('');
    setBoardingPoints([{ name: '', time: '' }]);
    setDroppingPoints([{ name: '', time: '' }]);
    setType('2+2 Non-AC semi sleeper');
    setDuration('');  // Reset duration field
  };

  // Handle change for adding/removing boarding points
  const handleBoardingPointChange = (index, field, value) => {
    const newBoardingPoints = [...boardingPoints];
    newBoardingPoints[index][field] = value;
    setBoardingPoints(newBoardingPoints);
  };

  const handleAddBoardingPoint = () => {
    setBoardingPoints([...boardingPoints, { name: '', time: '' }]);
  };

  const handleRemoveBoardingPoint = (index) => {
    const newBoardingPoints = boardingPoints.filter((_, i) => i !== index);
    setBoardingPoints(newBoardingPoints);
  };

  // Handle change for adding/removing dropping points
  const handleDroppingPointChange = (index, field, value) => {
    const newDroppingPoints = [...droppingPoints];
    newDroppingPoints[index][field] = value;
    setDroppingPoints(newDroppingPoints);
  };

  const handleAddDroppingPoint = () => {
    setDroppingPoints([...droppingPoints, { name: '', time: '' }]);
  };

  const handleRemoveDroppingPoint = (index) => {
    const newDroppingPoints = droppingPoints.filter((_, i) => i !== index);
    setDroppingPoints(newDroppingPoints);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>2+2 Non-AC semi sleeper</h2>

      <button onClick={() => { resetForm(); setIsFormVisible(true); }}>+ Add Bus</button>

      {isFormVisible && (
        <form onSubmit={handleSubmit} className="bus-form">
          <h3>{editingBus ? 'Update Bus' : 'Add Bus'}</h3>
          <label>Bus Name</label>
          <input type="text" placeholder="Bus Name" value={busName} onChange={(e) => setBusName(e.target.value)} required />
          <label>From</label>
          <input type="text" placeholder="From" value={from} onChange={(e) => setFrom(e.target.value)} required />
          <label>To</label>
          <input type="text" placeholder="To" value={to} onChange={(e) => setTo(e.target.value)} required />
          <label>Price</label>
          <input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} required />
          <label>Seats Available</label>
          <input type="number" placeholder="Seats Available" value={seatsAvailable} onChange={(e) => setSeatsAvailable(e.target.value)} required />
          <label>Total Seats</label>  
          <input type="number" placeholder="Total Seats" value={Totalseats} onChange={(e) => setTotalSeats(e.target.value)} required />
          <label>Departure Date</label>
          <input type="date" value={dateOfDeparture} onChange={(e) => setDateOfDeparture(e.target.value)} required />
          <label>Arrival Date</label>
          <input type="date" value={dateOfArrival} onChange={(e) => setDateOfArrival(e.target.value)} required />
          <label>Departure Time</label>
          <input type="time" placeholder="Departure Time" value={departureTime} onChange={e => setDepartureTime(e.target.value)} required />
          <label > Arrival Time</label>
          <input type="time" placeholder="Arrival Time" value={arrivalTime} onChange={e => setArrivalTime(e.target.value)} required />
          <label>Starting Point</label>
          <input type="text" placeholder="Starting Point (SP)" value={sp} onChange={(e) => setSp(e.target.value)} required />
          <label>Ending Point</label>
          <input type="text" placeholder="Ending Point (EP)" value={ep} onChange={(e) => setEp(e.target.value)} required />

          {/* Boarding Points Form */}
          <h4>Boarding Points</h4>
          {boardingPoints.map((bp, index) => (
            <div key={index}>
              <input
                type="text"
                placeholder="Boarding Point Name"
                value={bp.name}
                onChange={(e) => handleBoardingPointChange(index, 'name', e.target.value)}
              />
              <input
                type="time"
                value={bp.time}
                onChange={(e) => handleBoardingPointChange(index, 'time', e.target.value)}
              />
              <button type="button" onClick={() => handleRemoveBoardingPoint(index)}>Remove</button>
            </div>
          ))}
          <button type="button" onClick={handleAddBoardingPoint}>+ Add Boarding Point</button>

          {/* Dropping Points Form */}
          <h4>Dropping Points</h4>
          {droppingPoints.map((dp, index) => (
            <div key={index}>
              <input
                type="text"
                placeholder="Dropping Point Name"
                value={dp.name}
                onChange={(e) => handleDroppingPointChange(index, 'name', e.target.value)}
              />
              <input
                type="time"
                value={dp.time}
                onChange={(e) => handleDroppingPointChange(index, 'time', e.target.value)}
              />
              <button type="button" onClick={() => handleRemoveDroppingPoint(index)}>Remove</button>
            </div>
          ))}
          <button type="button" onClick={handleAddDroppingPoint}>+ Add Dropping Point</button>

          {/* Duration Field */}
          <label>Duration </label>
          <input
            type="text"
            placeholder="Duration (e.g., 5 hrs 30 mins)"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}  // Update duration state
            required
          />

          <button type="submit">{editingBus ? 'Update Bus' : 'Add Bus'}</button>
        </form>
      )}

      {buses.length === 0 ? (
        <p>No buses found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Bus Name</th>
              <th>Type</th>
              <th>From</th>
              <th>To</th>
              <th>Departure Date</th>
              <th>Arrival Date</th>
              <th>Departure Time</th>
              <th>Arrival Time</th>
              <th>Duration</th>
              <th>Price</th>
              <th>Seats Available</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {buses.map((bus) => (
              <tr key={bus._id}>
                <td>{bus.busName}</td>
                <td>{bus.type}</td>
                <td>{bus.from}</td>
                <td>{bus.to}</td>
                <td>{new Date(bus.dateOfDeparture).toLocaleDateString()}</td>
                <td>{new Date(bus.dateOfArrival).toLocaleDateString()}</td>
                <td>{bus.departureTime}</td>
                <td>{bus.arrivalTime}</td>
                <td>{bus.duration}</td>
                <td>{bus.price}</td>
                <td>{bus.seatsAvailable}</td>
                <td>
                  <button onClick={() => handleEdit(bus)}>Edit</button>
                  <button onClick={() => handleDelete(bus._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Nonacsemi;
