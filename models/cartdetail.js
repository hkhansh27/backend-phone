const product = require("./product");
const user = require("./user");

module.exports = (sequelize, DataTypes) => {
  const cartdetail = sequelize.define("cartdetail", {
    username: {
      type: DataTypes.STRING,
      primaryKey: true,
      references: {
        parameters: user,
        name: "username",
      },
    },
    productId: {
      type: DataTypes.STRING,
      primaryKey: true,
      references: {
        parameters: product,
        name: "productId",
      },
    },
    number: {
      type: DataTypes.INTEGER,
    },
  });

  cartdetail.associate = (models) => {
    cartdetail.belongsTo(models.product, {
      foreignKey: "productId",
      as: "product",
    });
    cartdetail.belongsTo(models.user, {
      foreignKey: "username",
      as: "user",
    });
  };

  return cartdetail;
};
