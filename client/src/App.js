// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/Homepage';
import HotelPage from './pages/Hotelpage'; // create this later
import Thanku from './pages/Thanku'; // create this later

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/hotel/:id" element={<HotelPage />} />
        <Route path="/thank-you" element={<Thanku />} />
      </Routes>
    </Router>
  );
};

export default App;
