const { Sequelize, DataTypes } = require('sequelize');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const DB_NAME = process.env.DB_NAME;
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;
const DB_HOST = process.env.DB_HOST;

// Create DB if not exists
const mysql = require('mysql2/promise');
(async () => {
  const connection = await mysql.createConnection({ host: DB_HOST, user: DB_USER, password: DB_PASS });
  await connection.query(`CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\`;`);
  console.log(`Database '${DB_NAME}' checked/created.`);
})();

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: DB_HOST,
  dialect: 'mysql',
  logging: false, 
  
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Import models
db.Admin = require('./Admin')(sequelize, DataTypes);
db.Hotel = require('./Hotel')(sequelize, DataTypes);
db.Guest = require('./Guest')(sequelize, DataTypes);
db.Booking = require('./Booking')(sequelize, DataTypes);

// Relationships
db.Hotel.hasMany(db.Guest, { foreignKey: 'hotel_id' });
db.Guest.belongsTo(db.Hotel, { foreignKey: 'hotel_id' });

db.Hotel.hasMany(db.Booking, { foreignKey: 'hotel_id' });
db.Booking.belongsTo(db.Hotel, { foreignKey: 'hotel_id' });

db.Guest.hasMany(db.Booking, { foreignKey: 'guest_id' });
db.Booking.belongsTo(db.Guest, { foreignKey: 'guest_id' });

db.Hotel.hasMany(db.Admin, { foreignKey: 'hotel_id' });
db.Admin.belongsTo(db.Hotel, { foreignKey: 'hotel_id' });

module.exports = db;
