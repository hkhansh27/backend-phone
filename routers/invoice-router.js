const express = require("express");
const invoiceController = require("../controllers/invoice-controller");

const invoiceRouter = express.Router();

invoiceRouter.get("/", invoiceController.getList);
invoiceRouter.get("/findByUser", invoiceController.findByUser);
invoiceRouter.get("/detail", invoiceController.getDetail);
invoiceRouter.post("/", invoiceController.create);
invoiceRouter.post("/live", invoiceController.create);


module.exports = invoiceRouter;