module.exports = (sequelize, DataTypes) => {
  const Hotel = sequelize.define('Hotel', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    logo: {
      type: DataTypes.STRING,
    },
    address: {
      type: DataTypes.STRING,
    },
    qr_code_url: {
      type: DataTypes.STRING,
    },
  });

  return Hotel;
};
