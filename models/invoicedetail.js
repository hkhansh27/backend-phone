const invoice = require("./invoice");
const product = require("./product");

module.exports = (sequelize, DataTypes) => {
  const invoicedetail = sequelize.define("invoicedetail", {
    invoiceId: {
      type: DataTypes.STRING,
      primaryKey: true,
      references: {
        parameters: invoice,
        name: "invoiceId",
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
    price: {
      type: DataTypes.INTEGER,
    }
  });

  invoicedetail.associate = (models) => {
    invoicedetail.belongsTo(models.product, {
      foreignKey: "productId",
      as: "product",
    });
    invoicedetail.belongsTo(models.invoice, {
      foreignKey: "invoiceId",
      as: "invoice",
    });
  };

  return invoicedetail;
};
