module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define("user", {
    username: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    password: {
      type: DataTypes.STRING,
    },
    fullname: {
      type: DataTypes.STRING,
    },
    role: {
      type: DataTypes.BOOLEAN,
    },
    phone: {
      type: DataTypes.STRING,
    },
    img: {
      type: DataTypes.STRING,
    },
  });

  user.associate = (models) => {
    user.hasMany(models.cartdetail, {
      foreignKey: "username",
      as: "cartdetail",
    });
    user.hasMany(models.invoice, {
      foreignKey: "username",
      as: "invoice",
    });
  };

  return user;
};
