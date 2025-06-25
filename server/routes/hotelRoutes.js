const express = require('express');
const router = express.Router();
const db = require('../models');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const QRCode = require('qrcode');

const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

const storage = multer.diskStorage({
  destination: (_, __, cb) => cb(null, uploadDir),
  filename: (_, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});

const upload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 } });

// Create hotel
router.post('/', upload.single('logo'), async (req, res) => {
  try {
    const { name, address } = req.body;
    const logoFileName = req.file ? req.file.filename : null;
    const qrContent = `Hotel: ${name}\nAddress: ${address}`;
    const qrFileName = `${Date.now()}-qr.png`;
    const qrFilePath = path.join(__dirname, '..', 'uploads', qrFileName);

    await QRCode.toFile(qrFilePath, qrContent);

    const hotel = await db.Hotel.create({
      name,
      address,
      logo: logoFileName,
      qr_code_url: qrFileName,
    });

    res.status(201).json(hotel);
  } catch (error) {
    console.error('Hotel creation error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get all hotels
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const { count, rows } = await db.Hotel.findAndCountAll({
      offset,
      limit,
      order: [['createdAt', 'DESC']],
    });

    res.json({
      hotels: rows,
      currentPage: page,
      totalPages: Math.ceil(count / limit),
    });
  } catch (err) {
    console.error('Fetch hotels error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// Update hotel
router.put('/:id', upload.single('logo'), async (req, res) => {
  try {
    const hotel = await db.Hotel.findByPk(req.params.id);
    if (!hotel) return res.status(404).json({ message: 'Hotel not found' });

    const { name, address } = req.body;
    const logo = req.file ? req.file.filename : hotel.logo;

    await hotel.update({ name, address, logo });
    res.json({ message: 'Hotel updated', hotel });
  } catch (err) {
    console.error('Update error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Delete hotel
router.delete('/:id', async (req, res) => {
  try {
    const hotel = await db.Hotel.findByPk(req.params.id);
    if (!hotel) return res.status(404).json({ message: 'Hotel not found' });

    await hotel.destroy();
    res.json({ message: 'Hotel deleted' });
  } catch (err) {
    console.error('Delete error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get hotel by ID
router.get('/:id', async (req, res) => {
  try {
    const hotel = await db.Hotel.findByPk(req.params.id);
    if (!hotel) return res.status(404).json({ error: 'Hotel not found' });
    res.json(hotel);
  } catch (err) {
    console.error('Hotel fetch error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
