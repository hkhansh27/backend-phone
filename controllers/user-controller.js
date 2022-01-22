const { user } = require("../models");
const bcryptjs = require("bcryptjs");

const userController = {};

userController.getList = async (req, res) => {
  try {
    const list = await user.findAll();
    res.status(200).send(list);
  } catch (error) {
    res.status(500).send({ message: "error", content: error });
  }
};

userController.getInfo = async (req, res) => {
  try {
    const { username } = req.body;
    const userInfo = await user.findOne({ where: { username } });
    if (userInfo === null) {
      res.status(404).send({ Message: "Not found user" });
    } else {
      res.status(200).send(userInfo);
    }
  } catch (error) {
    res.status(500).send({ message: "error", content: error });
  }
};

userController.createUser = async (req, res) => {
  try {
    const { username, password, fullname, phone } = req.body;
    const userInfo = await user.findOne({ where: { username } });
    if (userInfo !== null) {
      res
        .status(400)
        .send({ Message: "User with this username already exists" });
    } else {
      const pass = password === undefined ? username : password;
      const salt = bcryptjs.genSaltSync(10);
      const hashPass = bcryptjs.hashSync(pass, salt);
      await user.create({
        username,
        password: hashPass,
        fullname,
        role: false,
        phone,
      });
      res.status(200).send({ Message: "create user success" });
    }
  } catch (error) {
    console.log(error)
    res.status(500).send({ message: "error", content: error });
  }
};

userController.changeInfoUser = async (req, res) => {
  try {
    const { username, fullname, phone } = req.body;
    await user.update(
      { fullname, phone },
      {
        where: {
          username,
        },
      }
    );
    res.status(200).send({ Message: "update user success" });
  } catch (error) {
    res.status(500).send({ message: "error", content: error });
  }
};

userController.ChangeInfoUserAdmin = async (req, res) => {
  try {
    const { username, role } = req.body;
    await user.update(
      { role },
      {
        where: {
          username,
        },
      }
    );
    res.status(200).send({ Message: "update user success" });
  } catch (error) {
    res.status(500).send({ message: "error", content: error });
  }
};

userController.delUser = async (req, res) => {
  try {
    const { username } = req.body;
    await user.destroy({
      where: { username },
    });
    res.status(200).send({ Message: "delete user success" });
  } catch (error) {
    res.status(500).send({ message: "error", content: error });
  }
};

userController.uploadImage = async (req, res) => {
  try {
    const { file } = req;
    const { username } = req.body;
    // const url = `http://localhost:2222/${file.path}`;
    // console.log(url)
    // res.send(url);
    const userInfo = await user.findOne({ where: { username } });
    if (userInfo === null) {
      res.status(404).send({ Message: "Not found user" });
    } else {
      let url = `http://localhost:2222/${file.path}`;
      url = url.replace(/\\/g, "/");
      await user.update(
        { img: url },
        {
          where: {
            username,
          },
        }
      );
      res.status(200).send({ Message: "update user success" });
    }
  } catch (error) {
    console.log(error)
    res.status(500).send({ message: "error", content: error });
  }
};

userController.checkUser = async (req, res) => {
  try {
    const { username } = req.body;
    const userInfo = await user.findOne({ where: { username } });
    console.log(userInfo);
    if (userInfo === null) {
      res.status(404).send({ Message: "Not found user" });
    } else {
      res.status(200).send({ Message: "found user" });
    }
  } catch (error) {
    res.status(500).send({ message: "error", content: error });
  }
};

userController.changePassword = async (req, res) => {
  const { username, password, newPass } = req.body;
  const userInfo = await user.findOne({ where: { username } });
  console.log(userInfo);
  if (userInfo === null) {
    res.status(404).send({ Message: "Not found user" });
  } else {
    const salt = bcryptjs.genSaltSync(10);
    const newPassword = bcryptjs.hashSync(newPass, salt);
    const isAuth = bcryptjs.compareSync(password, userInfo[0].password);
    console.log(isAuth, userInfo[0].password);
    if (isAuth) {
      const rs = await user.update(
        { password: newPassword },
        {
          where: {
            username,
          },
        }
      );
      res.status(200).send({ Message: "update user success" });
    } else {
      res.status(400).send({ Message: "wrong password" });
    }
  }
};

module.exports = userController;
