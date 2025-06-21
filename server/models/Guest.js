module.exports = (sequelize, DataTypes) => {
  const Guest = sequelize.define('Guest', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    id_proof: {
      type: DataTypes.STRING,
    },
    address: {
      type: DataTypes.STRING,
    }
  });

  return Guest;
};
