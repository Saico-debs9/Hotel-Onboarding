const express = require('express');
const router = express.Router();
const db = require('../models');

// GET all hotels
router.get('/', async (req, res) => {
  const hotels = await db.Hotel.findAll();
  res.json(hotels);
});

// GET single hotel
router.get('/:id', async (req, res) => {
  const hotel = await db.Hotel.findByPk(req.params.id);
  if (!hotel) return res.status(404).json({ error: 'Hotel not found' });
  res.json(hotel);
});

// POST new hotel (main admin)
router.post('/', async (req, res) => {
  try {
    const { name, logo, address, qr_code_url } = req.body;
    const hotel = await db.Hotel.create({ name, logo, address, qr_code_url });
    res.json(hotel);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create hotel' });
  }
});

// DELETE a hotel
router.delete('/:id', async (req, res) => {
  try {
    const hotel = await db.Hotel.findByPk(req.params.id);
    if (!hotel) return res.status(404).json({ message: 'Hotel not found' });

    await hotel.destroy();
    res.status(200).json({ message: 'Hotel deleted successfully' });
  } catch (err) {
    console.error('Error deleting hotel:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// UPDATE a hotel
router.put('/:id', async (req, res) => {
  try {
    const hotel = await db.Hotel.findByPk(req.params.id);
    if (!hotel) return res.status(404).json({ message: 'Hotel not found' });

    const { name, logo, address, qr_code_url } = req.body;
    await hotel.update({ name, logo, address, qr_code_url });

    res.status(200).json({ message: 'Hotel updated successfully', hotel });
  } catch (err) {
    console.error('Error updating hotel:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// POST /api/hotels/:id/book
router.post('/:id/book', async (req, res) => {
  try {
    const { name, email, phone, checkin_date, checkout_date } = req.body;
    const hotelId = req.params.id;

    // Save guest info
    const guest = await db.Guest.create({ name, email, phone, hotel_id: hotelId });

    // Save booking info
    const booking = await db.Booking.create({
      guest_id: guest.id,
      hotel_id: hotelId,
      check_in: checkin_date,
      check_out: checkout_date,
    });

    res.status(201).json({ message: 'Booking successful', booking });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Booking failed' });
  }
});



module.exports = router;
