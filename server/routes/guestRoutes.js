const express = require('express');
const router = express.Router();
const db = require('../models');

// Get guests for a hotel (for hotel admin)
router.get('/hotel/:hotelId', async (req, res) => {
  const guests = await db.Guest.findAll({
    where: { hotel_id: req.params.hotelId },
    include: db.Booking,
  });
  res.json(guests);
});

// Update guest
router.put('/:id', async (req, res) => {
  const guest = await db.Guest.findByPk(req.params.id);
  if (!guest) return res.status(404).json({ error: 'Guest not found' });

  await guest.update(req.body);
  res.json(guest);
});

module.exports = router;
