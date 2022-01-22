const express = require("express");
const cartController = require("../controllers/cart-controller");

const cartRouter = express.Router();

cartRouter.get("/", cartController.list);

cartRouter.get("/", cartController.list);

cartRouter.put("/", cartController.update);

cartRouter.post("/", cartController.create);

cartRouter.delete("/", cartController.delete);

cartRouter.delete("/multi", cartController.multiDelete);


cartRouter.put("/checkexits", cartController.checkExits);

module.exports = cartRouter;
