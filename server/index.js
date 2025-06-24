const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const dotenv = require('dotenv');
const db = require('./models');
dotenv.config();

app.use(cors());
app.use(express.json());

const hotelRoutes = require('./routes/hotelRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const guestRoutes = require('./routes/guestRoutes');
const authRoutes = require('./routes/authRoutes');

app.use('/api/admin/auth', authRoutes);
app.use('/api/admin/hotels', hotelRoutes);
app.use('/api/guest/bookings', bookingRoutes);
app.use('/api/admin/guests', guestRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));





// Basic test route
app.get('/', (req, res) => {
  res.send('Guest Onboarding API is running!');
});

// Sync DB and start server
const PORT = process.env.PORT || 9090;
db.sequelize.sync().then(() => {
  console.log('Database synced successfully!');

  app.listen(PORT,'0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch((err) => {
  console.error('Error syncing database:', err);
});
