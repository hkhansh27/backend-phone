const user = require("./user");

module.exports = (sequelize, DataTypes) => {
  const invoice = sequelize.define("invoice", {
    invoiceId: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    totalMoney: {
      type: DataTypes.INTEGER,
    },
    username: {
      type: DataTypes.STRING,
      references: {
        parameters: user,
        name: "username",
      },
    },
  });

  invoice.associate = (models) => {
    invoice.belongsTo(models.user, {
      foreignKey: "username",
      as: "user",
    });
    invoice.hasMany(models.invoicedetail, {
      foreignKey: "invoiceId",
      as: "invoicedetail",
    });
  };

  return invoice;
};
