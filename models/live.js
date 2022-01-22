const product = require("./product");

module.exports = (sequelize, DataTypes) => {
  const live = sequelize.define("live", {
    url: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    productId: {
      type: DataTypes.STRING,
      references: {
        parameters: product,
        name: "productId",
      },
    },
    number: {
      type: DataTypes.INTEGER,
    },
  });

  live.associate = (models) => {
    live.belongsTo(models.product, {
      foreignKey: "productId",
      as: "product",
    });
  };

  return live;
};
