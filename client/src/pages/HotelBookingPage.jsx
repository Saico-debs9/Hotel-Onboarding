import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../styles/App.css'
import BackButton from '../components/BackButton';

const HotelBookingPage = () => {
  const { id } = useParams();
  const [hotel, setHotel] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    checkin_date: '',
    checkout_date: '',
  });

  useEffect(() => {
    axios.get(`/api/hotels/${id}`)
      .then(res => setHotel(res.data))
      .catch(err => console.error('Error fetching hotel:', err));
  }, [id]);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post(`/api/hotels/${id}/book`, formData);
      alert('Booking successful!');
      setFormData({ name: '', email: '', phone: '', checkin_date: '', checkout_date: '' });
    } catch (err) {
      alert('Booking failed.');
    }
  };

  if (!hotel) return <div className="wrapper"><div className="container">Loading...</div></div>;

  return (
    <div className="wrapper">
      <div className="container">
        <h2 className="headHome">Book Hotel: {hotel.name}</h2>
        <p className="text-muted mb-4">{hotel.address}</p>
    <div className='inputBox'>
        <form onSubmit={handleSubmit} className="formBox">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            required
            className="inputHome"
            value={formData.name}
            onChange={handleChange}
          /><br />

          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            className="inputHome"
            value={formData.email}
            onChange={handleChange}
          /><br />

          <input
            type="text"
            name="phone"
            placeholder="Phone"
            required
            className="inputHome"
            value={formData.phone}
            onChange={handleChange}
          /><br />

          <input
            type="date"
            name="checkin_date"
            required
            className="inputHome"
            value={formData.checkin_date}
            onChange={handleChange}
          /><br />

          <input
            type="date"
            name="checkout_date"
            required
            className="inputHome"
            value={formData.checkout_date}
            onChange={handleChange}
          /><br />

          <div className="inputBtn">
            <button type="submit" className="btnHome">Book Now</button>
          </div>
        </form>
        </div>
      </div>
      <BackButton />
    </div>
  );
};

export default HotelBookingPage;
