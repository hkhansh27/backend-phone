const express = require("express");
const authRouter = require("./auth-router");
const brandRouter = require("./brand-router");
const cartRouter = require("./cart-router");
const invoiceRouter = require("./invoice-router");
const productRouter = require("./product-router");
const userRouter = require("./user-router");

const rootRouter = express.Router();

rootRouter.use("/auth", authRouter);

rootRouter.use("/user", userRouter);

rootRouter.use("/product", productRouter);

rootRouter.use("/brand", brandRouter);

rootRouter.use("/cart", cartRouter);

rootRouter.use("/invoice", invoiceRouter);

// rootRouter.use("/live", )

module.exports = rootRouter;
