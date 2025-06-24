// src/pages/HotelAdminDashboard.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BackButton from '../components/BackButton';
import '../styles/App.css';

const HotelAdminDashboard = () => {
  const [guests, setGuests] = useState([]);

  useEffect(() => {
    axios.get('/api/guests')
      .then(res => setGuests(res.data))
      .catch(err => console.error('Error fetching guests:', err));
  }, []);

  return (
    <div className="wrapper">
      <div className="container">
        <h2 className="headHome">Guest Details</h2>
        <table className="hotelTable">
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone</th>
              <th>Email</th>
              <th>ID Proof</th>
              <th>Address</th>
            </tr>
          </thead>
          <tbody>
            {guests.map(guest => (
              <tr key={guest.id}>
                <td>{guest.name}</td>
                <td>{guest.phone}</td>
                <td>{guest.email}</td>
                <td>{guest.id_proof}</td>
                <td>{guest.address}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <BackButton />
      </div>
    </div>
  );
};

export default HotelAdminDashboard;
