const express = require("express");
const userController = require("../controllers/user-controller");
const { uploadImageSingle } = require("../middlewares/upload-middleware");

const userRouter = express.Router();
// admin
userRouter.get("/admin/", userController.getList);
userRouter.get("/admin/info", userController.getInfo);
userRouter.put("/admin/", userController.ChangeInfoUserAdmin);
userRouter.delete("/admin/", userController.delUser);
// client
userRouter.post("/", userController.createUser);
userRouter.put("/", userController.changeInfoUser);
userRouter.put("/image", uploadImageSingle(), userController.uploadImage);
userRouter.get("/checkUsername", userController.checkUser);
userRouter.put("/changePassword", userController.changePassword);
// export
module.exports = userRouter;
