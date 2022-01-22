const { cartdetail, product } = require("../models");

const cartController = {};
cartController.create = async (req, res) => {
  try {
    const { username, productId, number } = req.body;
    await cartdetail.create({ username, productId, number });
    const cart = await cartdetail.findAll({ where: { username, productId } });
    res.status(200).send(cart);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "error", content: error });
  }
};

cartController.update = async (req, res) => {
  try {
    const { username, productId, number } = req.body;
    await cartdetail.update({ number }, { where: { username, productId } });
    res.status(200).send({ Message: "success" });
  } catch (error) {
    res.status(500).send({ message: "error", content: error });
  }
};

cartController.delete = async (req, res) => {
  try {
    const { username, productId } = req.body;
    await cartdetail.destroy({ where: { username, productId } });
    res.status(200).send({ Message: "success" });
  } catch (error) {
    res.status(500).send({ message: "error", content: error });
  }
};

cartController.list = async (req, res) => {
  try {
    const { username } = req.body;
    const rs = await cartdetail.findAll({
      where: { username },
      include: {
        model: product,
        as: "product",
      },
    });
    res.status(200).send(rs);
  } catch (error) {
    res.status(500).send({ message: "error", content: error });
  }
};

cartController.multiDelete = async (req, res) => {
  try {
    const { arr } = req.body;
    // arr = [[admin, PD_289561], [admin, PD_289562]]
    for (let index = 0; index < arr.length; index++) {
      await cartdetail.destroy({
        where: { username: arr[index][0], productId: arr[index][1] },
      });
    }
    res.status(200).send({ Message: "success" });
  } catch (error) {
    res.status(500).send({ message: "error", content: error });
  }
};

cartController.checkExits = async (req, res) => {
  try {
    const { username, productId, number } = req.body;
    const check = await cartdetail.findOne({ where: { username, productId } });
    if (check) {
      let temp = number === undefined ? 1 : number;
      temp = Number(check.number) + number;
      await cartdetail.update(
        { number: temp },
        { where: { username, productId } }
      );
      res.status(200).send({ Message: "success" });
    } else {
      await cartdetail.create({ username, productId, number: 1 });
      res.status(200).send({ Message: "success" });
    }
  } catch (error) {
    res.status(500).send({ message: "error", content: error });
  }
};

module.exports = cartController;
