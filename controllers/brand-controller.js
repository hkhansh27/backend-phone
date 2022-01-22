const { Op } = require("sequelize");
// const brand = require("../mongo-models/brand");
const {brand} = require("../models");
const brandController = {};

const makeid = (length) => {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

brandController.findBrand = async (req, res) => {
  try {
    const { brandName } = req.body;
    const brandinfo = await brand.findAll({
      where: {
        brandName: {
          [Op.substring]: brandName,
        },
      },
    });
    if (brandinfo === null) {
      res.status(404).send({ Message: "Not found brand" });
    } else {
      res.status(200).send(brandinfo);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "error", content: error });
  }
};

brandController.getList = async (req, res) => {
  // brand
  //   .findById("br-123")
  //   .then((result) => {
  //     res.send(result);
  //   })
  //   .catch((error) => {
  //     res.send("fail");
  //   });
  try {
    const list = await brand.findAll();
    res.status(200).send(list);
  } catch (error) {
    res.status(500).send({ message: "error", content: error });
  }
};

brandController.create = async (req, res) => {
  try {
    const { brandName } = req.body;
    const { file } = req;
    console.log(object)
    let url = `http://localhost:2222/${file.path}`;
    url = url.replace(/\\/g, "/");
    const brandInfo = await brand.findOne({ where: { brandName } });
    if (brandInfo !== null) {
      res.status(400).send({ Message: "brand have this name already exist" });
    } else {
      const brandId = "brand_" + makeid(10);
      await brand.create({ brandName, brandId, brandImg: url });
      res.status(200).send({ Message: "create brand success" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "error", content: error });
  }
};

brandController.updateImg = async (req, res) => {
  try {
    const { brandId } = req.body;
    const { file } = req;
    let url = `http://localhost:2222/${file.path}`;
    url = url.replace(/\\/g, "/");
    await brand.update({ brandImg: url }, { where: { brandId } });
    res.status(200).send({ Message: "update brand success" });
  } catch (error) {
    res.status(500).send({ message: "error", content: error });
  }
};

brandController.update = async (req, res) => {
  try {
    const { brandId, brandName } = req.body;
    await brand.update({ brandName }, { where: { brandId } });
    res.status(200).send({ Message: "update brand success" });
  } catch (error) {
    res.status(500).send({ message: "error", content: error });
  }
};

brandController.delete = async (req, res) => {
  try {
    const { brandId } = req.body;
    await brand.destroy({
      where: { brandId },
    });
    res.status(200).send({ Message: "update brand success" });
  } catch (error) {
    res.status(500).send({ message: "error", content: error });
  }
};

module.exports = brandController;
