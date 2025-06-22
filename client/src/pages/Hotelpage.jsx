// src/pages/HotelPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const HotelPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [hotel, setHotel] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    check_in: '',
    check_out: '',
  });

  useEffect(() => {
    axios.get(`http://localhost:9876/api/hotels/${id}`)
      .then(res => setHotel(res.data))
      .catch(err => console.error(err));
  }, [id]);

  const handleChange = e => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:9876/api/bookings', {
        hotel_id: parseInt(id),
        ...formData,
      });

      navigate('/thank-you');
    } catch (error) {
      console.error('Booking error:', error);
    }
  };

  if (!hotel) return <p className="p-4">Loading hotel...</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="text-2xl font-bold mb-4">{hotel.name}</h2>
      <p className="mb-2">{hotel.address}</p>
      <img src={hotel.logo} alt="Hotel Logo" className="w-40 mb-6" />

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md max-w-lg">
        <h3 className="text-xl font-semibold mb-4">Book Your Stay</h3>

        {['name', 'phone', 'email', 'check_in', 'check_out'].map(field => (
          <div className="mb-4" key={field}>
            <label className="block text-sm mb-1 capitalize">{field.replace('_', ' ')}:</label>
            <input
              type={field.includes('date') ? 'date' : 'text'}
              name={field}
              value={formData[field]}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded"
              required
            />
          </div>
        ))}

        <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
          Submit Booking
        </button>
      </form>
    </div>
  );
};

export default HotelPage;
