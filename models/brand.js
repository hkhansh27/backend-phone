// const { getDB } = require("../database/database");

// class brand {
//   constructor(brandId, brandName, brandImg) {
//     this.brandId = brandId;
//     this.brandName = brandName;
//     this.brandImg = brandImg;
//   }

//   save() {
//     const db = getDB();
//     db.collection("brands")
//       .insertOne(this)
//       .then((res) => {
//         console.log(res);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }
// }

// module.exports = brand;

module.exports = (sequelize, DataTypes) => {
  const brand = sequelize.define("brand", {
    brandId: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    brandName: {
      type: DataTypes.STRING,
    },
    brandImg: {
      type: DataTypes.STRING,
    },
  });

  brand.associate = (models) => {
    brand.hasMany(models.product, {
      foreignKey: "brandId",
      as: "product",
    });
  };

  return brand;
};
