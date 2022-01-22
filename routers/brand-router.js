const express = require("express");
const brandController = require("../controllers/brand-controller");
const { uploadImageSingle } = require("../middlewares/upload-middleware");
const brandRouter = express.Router();

brandRouter.get("/", brandController.getList);
brandRouter.get("/find", brandController.findBrand);
brandRouter.post("/", uploadImageSingle(), brandController.create);
brandRouter.put("/", brandController.update);
brandRouter.put("/img", uploadImageSingle(), brandController.updateImg);
brandRouter.delete("/", brandController.delete);

module.exports = brandRouter;
