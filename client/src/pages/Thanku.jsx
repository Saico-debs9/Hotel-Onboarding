// src/pages/ThankYouPage.jsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Thanku = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => navigate('/'), 3000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="h-screen flex items-center justify-center bg-green-50">
      <h1 className="text-2xl font-bold text-green-800">Thank you! Your booking was successful.</h1>
    </div>
  );
};

export default Thanku;
