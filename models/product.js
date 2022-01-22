const brand = require("./brand");

module.exports = (sequelize, DataTypes) => {
  const product = sequelize.define("product", {
    productId: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    productName: {
      type: DataTypes.STRING,
    },
    productNumber: {
      type: DataTypes.INTEGER,
    },
    RAM: {
      type: DataTypes.STRING,
    },
    CPU: {
      type: DataTypes.STRING,
    },
    brandId: {
      type: DataTypes.STRING,
      references: {
        parameters: brand,
        name: "brandId",
      },
    },
    outPrice: {
      type: DataTypes.INTEGER,
    },
    inPrice: {
      type: DataTypes.INTEGER,
    },
    img: {
      type: DataTypes.STRING,
    },
  });

  product.associate = (models) => {
    product.belongsTo(models.brand, {
      foreignKey: "brandId",
      as: "brand",
    });
  };

  return product;
};
