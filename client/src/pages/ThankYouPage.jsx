
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import BackButton from '../components/BackButton';

const ThankYouPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const booking = location.state?.booking;
  const [count, setCount] = useState(10);

  useEffect(() => {
  const interval = setInterval(() => {
    setCount(prev => {
      if (prev <= 1) {
        clearInterval(interval);
        navigate('/');
        return 0;
      }
      return prev - 1;
    });
  }, 1000); // every 1 second

  return () => clearInterval(interval);
}, []);
// 10 seconds


  if (!booking) {
    return (
      <div className="wrapper">
        <div className="container">
          <h2>Invalid Access</h2>
          <BackButton />
        </div>
      </div>
    );
  }

  return (
    <div className="wrapper">
      <div className="container">
        <h2 className="headHome">Thank You for Booking!</h2>
        <div className="bookingDetails">
          <p><strong>Name:</strong> {booking.name}</p>
          <p><strong>Email:</strong> {booking.email}</p>
          <p><strong>Phone:</strong> {booking.phone}</p>
          <p><strong>Check-in:</strong> {booking.checkin_date}</p>
          <p><strong>Check-out:</strong> {booking.checkout_date}</p>
          <p><strong>Hotel:</strong> {booking.hotel_name}</p>
          <p className="text-sm text-gray-600">You will be redirected to the homepage in {count} second{count>1?'s':''}.</p>
        </div>
        <div style={{ marginTop: '20px' }}>
          <BackButton label="Go to Home Now" target="/" />
        </div>
      </div>
    </div>
  );
};

export default ThankYouPage;
