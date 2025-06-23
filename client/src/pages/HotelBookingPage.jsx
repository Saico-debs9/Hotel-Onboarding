import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

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

  if (!hotel) return <div>Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Book {hotel.name}</h2>
      <p className="mb-4 text-gray-600">{hotel.address}</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="name" placeholder="Your Name" required className="w-full p-2 border rounded" value={formData.name} onChange={handleChange} />
        <input type="email" name="email" placeholder="Email" required className="w-full p-2 border rounded" value={formData.email} onChange={handleChange} />
        <input type="text" name="phone" placeholder="Phone" required className="w-full p-2 border rounded" value={formData.phone} onChange={handleChange} />
        <input type="date" name="checkin_date" required className="w-full p-2 border rounded" value={formData.checkin_date} onChange={handleChange} />
        <input type="date" name="checkout_date" required className="w-full p-2 border rounded" value={formData.checkout_date} onChange={handleChange} />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Book Now</button>
      </form>
    </div>
  );
};

export default HotelBookingPage;
