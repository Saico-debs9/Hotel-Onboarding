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

module.exports = router;
