import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/App.css';

const HomePage = () => {
  const [hotels, setHotels] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
  const [role, setRole] = useState(localStorage.getItem('role'));
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const navigate = useNavigate();

  useEffect(() => {
    fetchHotels(currentPage);
  }, [currentPage]);

  const fetchHotels = async (page) => {
    try {
      const res = await axios.get(`/api/admin/hotels?page=${page}&limit=9`);
      setHotels(res.data.hotels || []);
      setTotalPages(res.data.totalPages || 1);
    } catch (err) {
      console.error('Error fetching hotels:', err);
      setHotels([]);
      setTotalPages(1);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setIsLoggedIn(false);
    setRole(null);
    navigate('/');
  };

  const handleCardClick = (id) => {
    navigate(`/hotel/${id}/book`);
  };

  const handleAddHotel = () => {
    navigate('/admin/dashboard');
  };
  const handleGuestList = () => {
    navigate('hoteladmin/dashboard');
  }

  return (
    <div className="wrapper">
      <div className="container">
        <div className="header">
          <h2 className="headHome">Hotel Booking Portal</h2>
          <div className="inputBtn">
            {isLoggedIn ? (
              <>
                {role === 'main' && (
                  <button onClick={handleAddHotel} className="btnHome">
                    Manage Hotels
                  </button>
                )}
                {role === 'hotel' && (
                  <button onClick={handleGuestList} className="btnHome">
                    Manage Guests
                  </button>
                )}
                <button onClick={handleLogout} className="btnHome">Logout</button>
              </>
            ) : (
              <>
                <button onClick={() => navigate('/login')} className="btnHome">Login</button>
                <button onClick={() => navigate('/register')} className="btnHome">Signup</button>
              </>
            )}
          </div>
        </div>

        <div className="gridContainer">
          {hotels.map(hotel => (
            <div key={hotel.id} className="hotelCard" onClick={() => handleCardClick(hotel.id)}>
              <img src={`/uploads/${hotel.logo}`} alt="Hotel Logo" className="logoImg" />
              <h3>{hotel.name}</h3>
              <p>{hotel.address}</p>
              {hotel.qr_code_url && (
                <img src={`/uploads/${hotel.qr_code_url}`} alt="QR" className="qrImg" />
              )}
            </div>
          ))}
        </div>

        <div className="pagination">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(prev => prev - 1)}
          >
            Prev
          </button>
          <span>Page {currentPage} of {totalPages}</span>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(prev => prev + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
