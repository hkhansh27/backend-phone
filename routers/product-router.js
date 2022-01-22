const express = require("express");
const productController = require("../controllers/product-controller");
const { uploadImageSingle } = require("../middlewares/upload-middleware");

const productRouter = express.Router();

productRouter.get("/", productController.getList);

productRouter.get("/findByBrand", productController.findByBrand);

productRouter.get("/findByName", productController.findByName);

productRouter.post("/", uploadImageSingle(), productController.create);

productRouter.put("/", productController.update);

productRouter.delete("/", productController.delete);

productRouter.put("/image", uploadImageSingle(), productController.uploadImg);

module.exports = productRouter;