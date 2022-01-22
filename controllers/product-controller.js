const { product } = require("../models");
const { Op } = require("sequelize");
const productController = {};

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

productController.getList = async (req, res) => {
  try {
    const list = await product.findAll();
    res.status(200).send(list);
  } catch (error) {
    res.status(500).send({ message: "error", content: error });
  }
};

productController.findByName = async (req, res) => {
  try {
    const { productName } = req.body;
    const list = await product.findAll({
      where: {
        productName: {
          [Op.substring]: productName,
        },
      },
    });
    res.status(200).send(list);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "error", content: error });
  }
};

productController.findByBrand = async (req, res) => {
  try {
    const { brandId } = req.body;
    const list = await product.findOne({ where: { brandId } });
    res.status(200).send(list);
  } catch (error) {
    res.status(500).send({ message: "error", content: error });
  }
};

productController.create = async (req, res) => {
  try {
    const { file } = req;
    const { productName, productNumber, RAM, CPU, brandId, outPrice, inPrice } =
      req.body;
    const productId = "PD_" + makeid(10);
    let url = `http://localhost:2222/${file.path}`;
    url = url.replace(/\\/g, "/");
    await product.create({
      productId,
      productName,
      productNumber,
      RAM,
      CPU,
      brandId,
      img: url,
      outPrice,
      inPrice,
    });
    res.status(200).send({ Message: "success" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "error", content: error });
  }
};

productController.update = async (req, res) => {
  try {
    const {
      productId,
      productName,
      productNumber,
      RAM,
      CPU,
      brandId,
      outPrice,
      inPrice,
    } = req.body;
    await product.update(
      {
        productName,
        productNumber,
        RAM,
        CPU,
        brandId,
        outPrice,
        inPrice,
      },
      { where: { productId } }
    );
    res.status(200).send({ Message: "success" });
  } catch (error) {
    res.status(500).send({ message: "error", content: error });
  }
};

productController.delete = async (req, res) => {
  try {
    const { productId } = req.body;
    await product.destroy({ where: { productId } });
    res.status(200).send({ Message: "success" });
  } catch (error) {
    res.status(500).send({ message: "error", content: error });
  }
};

productController.uploadImg = async (req, res) => {
  try {
    const { productId } = req.body;
    const { file } = req;
    let url = `http://localhost:2222/${file.path}`;
    url = url.replace(/\\/g, "/");
    await product.update({ img: url }, { where: { productId } });
    res.status(200).send({ Message: "Product updated" });
  } catch (error) {
    res.status(500).send({ message: "error", content: error });
  }
};

module.exports = productController;
