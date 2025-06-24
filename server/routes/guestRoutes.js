const express = require('express');
const router = express.Router();
const db = require('../models');


router.get('/', async (req, res) => {
  try {
    const guests = await db.Guest.findAll({
      include: {
        model: db.Hotel,
        attributes: ['id', 'name'],
      },
    });
    res.json(guests);
  } catch (err) {
    console.error('Error fetching guests:', err);
    res.status(500).json({ error: 'Failed to fetch guests' });
  }
});


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
