module.exports = (sequelize, DataTypes) => {
  const Admin = sequelize.define('Admin', {
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM('main', 'hotel'),
      allowNull: false,
    },
    hotel_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  });

  return Admin;
};
