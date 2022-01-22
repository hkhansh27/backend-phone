const express = require("express");
const { authLogin } = require("../controllers/auth-controller");

const authRouter = express.Router();

authRouter.post("/login", authLogin);

module.exports = authRouter;
