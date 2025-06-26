
const express = require('express');
const router = express.Router();
const db = require('../models');

router.post('/:hotelId', async (req, res) => {
  try {
    const { name, email, phone, id_proof, address, checkin_date, checkout_date } = req.body;
    const hotelId = req.params.hotelId;

    const checkin = new Date(checkin_date);
    const checkout = new Date(checkout_date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const maxDate = new Date();
    maxDate.setDate(today.getDate() + 10);

    if (checkin < today || checkout <= checkin || checkin > maxDate || checkout > maxDate) {
      return res.status(400).json({ message: 'Invalid check-in or check-out dates.' });
    }

    const guest = await db.Guest.create({
      name,
      email,
      phone,
      id_proof,
      address,
      hotel_id: hotelId,
    });

    const booking = await db.Booking.create({
      guest_id: guest.id,
      hotel_id: hotelId,
      check_in: checkin_date,
      check_out: checkout_date,
    });

    res.status(201).json({ message: 'Booking successful', booking });
  } catch (err) {
    console.error('Booking error:', err);
    res.status(500).json({ message: 'Booking failed' });
  }
});

module.exports = router;
