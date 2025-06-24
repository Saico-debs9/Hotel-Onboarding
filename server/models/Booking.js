module.exports = (sequelize, DataTypes) => {
  const Booking = sequelize.define('Booking', {
    check_in: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    check_out: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    guest_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    hotel_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }

  });

  return Booking;
};
