const express = require('express');
const router = express.Router();
const db = require('../models');

// Book a hotel (create guest and booking)
router.post('/', async (req, res) => {
  const { hotel_id, name, phone, email, check_in, check_out } = req.body;

  try {
    const guest = await db.Guest.create({ name, phone, email, hotel_id });
    const booking = await db.Booking.create({ guest_id: guest.id, hotel_id, check_in, check_out });
    res.json({ guest, booking });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Booking failed' });
  }
});

module.exports = router;
