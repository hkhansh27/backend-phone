const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { user } = require("../models");

const authLogin = async (req, res) => {
  try {
    const { username, password } = req.body;
    const userLogin = await user.findOne({
      where: { username },
    });
    if (userLogin === null) {
      res.status(404).send({ Message: "Not found user" });
    } else {
      const isAuth = bcryptjs.compareSync(password, userLogin.password);
      if (isAuth) {
        const userInfo = {
          username: userLogin.username,
          fullname: userLogin.fullname,
          role: userLogin.role,
          phone: userLogin.phone,
          img: userLogin.img,
        };
        const secretKey = "phone";
        const token = jwt.sign(userInfo, secretKey);
        res.status(200).send({
          Message: "Login successful",
          token: token,
          userInfo: userInfo,
        });
      } else res.status(400).send({ message: "wrong password" });
    }
  } catch (error) {
    res.status(500).send({ message: "error", content: error });
  }
};

module.exports = {
  authLogin,
};
