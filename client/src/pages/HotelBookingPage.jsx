import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/App.css'
import BackButton from '../components/BackButton';
import ThankYouPage from './ThankYouPage';

const HotelBookingPage = () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const minDate = today.toISOString().split('T')[0];

  const maxDateObj = new Date();
  maxDateObj.setDate(today.getDate() + 10);
  const maxDate = maxDateObj.toISOString().split('T')[0];


  const { id } = useParams();
  const [hotel, setHotel] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    id_proof: '',
    address: '',
    checkin_date: '',
    checkout_date: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`/api/admin/hotels/${id}`)
      .then(res => setHotel(res.data))
      .catch(err => console.error('Error fetching hotel:', err));
  }, [id]);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const checkin = new Date(formData.checkin_date);
    const checkout = new Date(formData.checkout_date);

    const todayDate = new Date();
    todayDate.setHours(0, 0, 0, 0);

    const tenDaysLater = new Date();
    tenDaysLater.setDate(todayDate.getDate() + 10);
    tenDaysLater.setHours(0, 0, 0, 0);

    if (checkin < todayDate) {
      return alert("Check-in date cannot be in the past.");
    }

    if (checkout <= checkin) {
      return alert("Check-out must be after check-in.");
    }

    if (checkin > tenDaysLater || checkout > tenDaysLater) {
      return alert("Booking must be within 10 days from today.");
    }

    try {
      await axios.post(`/api/guest/bookings/${id}`, formData);
      navigate('/thank-you', {
        state: {
          booking: {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            checkin_date: formData.checkin_date,
            checkout_date: formData.checkout_date,
            hotel_name: hotel?.name,
          }
        }
      });
      alert("Booking successful!");

      setFormData({
        name: '',
        email: '',
        phone: '',
        id_proof: '',
        address: '',
        checkin_date: '',
        checkout_date: '',
      });


    } catch (err) {
      alert("Booking failed.");
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
              type="text"
              name="id_proof"
              placeholder="ID Proof (e.g., Aadhaar, Passport)"
              required
              className="inputHome"
              value={formData.id_proof}
              onChange={handleChange}
            /><br />

            <input
              type="text"
              name="address"
              placeholder="Full Address"
              required
              className="inputHome"
              value={formData.address}
              onChange={handleChange}
            /><br />


            <input
              type="date"
              name="checkin_date"
              min={minDate}
              max={maxDate}
              required
              className="inputHome"
              value={formData.checkin_date}
              onChange={handleChange}
            />

            <input
              type="date"
              name="checkout_date"
              min={formData.checkin_date || minDate}
              max={maxDate}
              required
              className="inputHome"
              value={formData.checkout_date}
              onChange={handleChange}
            />


            <div className="inputBtn">
              <button type="submit" className="btnHome">Book Now</button>
            </div>
            <BackButton />
          </form>

        </div>
      </div>
    </div>
  );
};

export default HotelBookingPage;
