import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/App.css';

const HomePage = () => {
  const [hotels, setHotels] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

  const navigate = useNavigate();


  // Fetch hotels
  useEffect(() => {
    axios.get('/api/admin/hotels')
      .then(res => setHotels(res.data))
      .catch(err => console.error('Error fetching hotels:', err));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setIsLoggedIn(false);
    navigate('/');
  };

  // Handle clicking a hotel row
  const handleRowClick = (id) => {
    navigate(`/hotel/${id}/book`);
  };



  return (
    <div className="wrapper">
      <div className="container">
        <div className="header">
          <h2 className="headHome">Hotel Booking Portal</h2>
          <div className="inputBtn">
            {isLoggedIn ? (
              <button onClick={handleLogout} className="btnHome">
                Logout
              </button>
            ) : (
              <>
                <button onClick={() => navigate('/login')} className="btnHome">
                  Login
                </button>
                <button onClick={() => navigate('/register')} className="btnHome">
                  Signup
                </button>
              </>
            )}
          </div>
        </div>

        <table className="hotelTable">
          <thead>
            <tr>
              <th>Logo</th>
              <th>Name</th>
              <th>Address</th>
              <th>QR Code</th>
            </tr>
          </thead>
          <tbody>
            {hotels.map((hotel) => (
              <tr key={hotel.id} onClick={() => handleRowClick(hotel.id)} className="cursor-pointer hover:bg-gray-100">
                <td>
                  <img src={hotel.logo} alt="Logo" className="logoImg" />
                </td>
                <td>{hotel.name}</td>
                <td>{hotel.address}</td>
                <td>
                  {hotel.qr_code_url ? (
                    <img src={hotel.qr_code_url} alt="QR" className="qrImg" />
                  ) : (
                    <span className="text-muted">N/A</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HomePage;
