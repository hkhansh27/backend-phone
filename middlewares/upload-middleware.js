const multer = require("multer");
const uploadImageSingle = () => {
  const storage = multer.diskStorage({
    destination: (req, file, callback) => {
      callback(null, `./public/images`);
    },
    filename: (req, file, callback) => {
      console.log(file.originalname);
      callback(null, `${Date.now()}_${file.originalname}`);
    },
  });
  const upload = multer({
    storage,
    fileFilter: (req, file, callback) => {
      console.log(file);
      const extensionImageList = ["png", "jpg", "jpeg"];
      const extension = file.originalname.split(".");
      const isCheck = extensionImageList.includes(
        extension[extension.length - 1]
      );
      if (isCheck) {
        callback(null, true);
      } else {
        callback(new Error("Invalid file"));
      }
    },
  });
  return upload.single("img");
};

module.exports = {
  uploadImageSingle,
};
