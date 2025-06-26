
const express = require('express');
const router = express.Router();
const db = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  const admin = await db.Admin.findOne({ where: { username } });
  if (!admin) return res.status(401).json({ message: 'Invalid username or password' });

  const valid = await bcrypt.compare(password, admin.password);
  if (!valid) return res.status(401).json({ message: 'Invalid username or password' });

  const token = jwt.sign(
    { id: admin.id, username: admin.username, role: admin.role },
    process.env.JWT_SECRET || 'secret',
    { expiresIn: '1h' }
  );

  res.json({ token, role: admin.role });
});


router.post('/register', async (req, res) => {
  const { username, password, role } = req.body;
  const hashed = await bcrypt.hash(password, 10);

  try {
    const admin = await db.Admin.create({ username, password: hashed, role });
    res.status(201).json({ message: 'Admin created successfully', admin });
  } catch (err) {
    res.status(400).json({ message: 'User already exists or error occurred' });
  }
});


module.exports = router;
