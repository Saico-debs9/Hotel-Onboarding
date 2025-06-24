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

router.get('/', async (_, res) => {
  const hotels = await db.Hotel.findAll();
  res.json(hotels);
});

router.put('/:id', async (req, res) => {
  try {
    const hotel = await db.Hotel.findByPk(req.params.id);
    if (!hotel) return res.status(404).json({ message: 'Hotel not found' });

    const { name, logo, address, qr_code_url } = req.body;
    await hotel.update({ name, logo, address, qr_code_url });

    res.json({ message: 'Hotel updated', hotel });
  } catch (err) {
    console.error('Update error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

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
