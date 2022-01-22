const { getDB } = require("../database/database");
const mongodb = require("mongodb");
class brand {
  constructor(brandId, brandName, brandImg) {
    this.brandId = brandId;
    this.brandName = brandName;
    this.brandImg = brandImg;
  }

  save() {
    const db = getDB();
    return db
      .collection("brands")
      .insertOne(this)
      .then((result) => {
        // console.log("result: ", result);
        console.log("success");
      })
      .catch((err) => {
        console.log("err");
      });
  }

  static getList() {
    const db = getDB();
    return db
      .collection("brands")
      .find()
      .toArray()
      .then((result) => {
        return result;
      })
      .catch((err) => {
        console.log("err");
      });
  }

  static findById(id) {
    const db = getDB();
    return db
      .collection("brands")
      .find({ brandId: id })
      .toArray()
      .then((result) => {
        return result;
      })
      .catch((err) => {
        console.log("err");
      });
  }
}

module.exports = brand;

// module.exports = (sequelize, DataTypes) => {
//   const brand = sequelize.define("brand", {
//     brandId: {
//       type: DataTypes.STRING,
//       primaryKey: true,
//     },
//     brandName: {
//       type: DataTypes.STRING,
//     },
//     brandImg: {
//       type: DataTypes.STRING,
//     },
//   });

//   brand.associate = (models) => {
//     brand.hasMany(models.product, {
//       foreignKey: "brandId",
//       as: "product",
//     });
//   };

//   return brand;
// };
