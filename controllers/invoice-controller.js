const {
  invoice,
  user,
  product,
  invoicedetail,
  cartdetail,
} = require("../models");

const invoiceController = {};

const makeid = (length) => {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

invoiceController.getList = async (req, res) => {
  try {
    const list = await invoice.findAll();
    res.status(200).send(list);
  } catch (error) {
    res.status(500).send({ message: "error", content: error });
  }
};

invoiceController.getDetail = async (req, res) => {
  try {
    const { invoiceId } = req.body;
    const list = await invoicedetail.findAll({
      where: { invoiceId },
      include: {
        model: product,
        as: "product",
      },
    });
    res.status(200).send(list);
  } catch (error) {
    res.status(500).send({ message: "error", content: error });
  }
};

invoiceController.findByUser = async (req, res) => {
  try {
    const { username } = req.body;
    const list = await invoice.findAll({ where: { username } });
    res.status(200).send(list);
  } catch (error) {
    res.status(500).send({ message: "error", content: error });
  }
};

invoiceController.create = async (req, res) => {
  try {
    const { totalMoney, username, arr } = req.body;
    // arr = [[productId, number, price],[productId, number, price]]
    const invoiceId = "IV_" + makeid(10);
    const ProductList = await product.findAll();
    //kiểm tra số lương trong kho
    let errorProduct = [];
    console.log(arr);
    arr.forEach(async (element) => {
      let temp = ProductList.find((e) => e.productId === element.productId);
      console.log(temp.productNumber, element.number);
      if (temp.productNumber < element.number) {
        errorProduct.push(temp);
      }
    });
    console.log("errorProduct: ", errorProduct.length);
    //check các sp quá số lượng trong kho
    if (errorProduct.length > 0) {
      return res.status(400).send(errorProduct);
    }
    //tạo hóa đơn mới
    await invoice.create({
      invoiceId,
      totalMoney,
      username,
    });

    arr.forEach(async (element) => {
      element.invoiceId = invoiceId;
      //xóa ds sản phẩm mua trong giỏ hàng
      await cartdetail.destroy({
        where: {
          username,
          productId: element.productId,
        },
      });
      //trừ so luong sp trong data
      let temp = await product.findOne({
        where: { productId: element.productId },
      });
      await product.update(
        {
          productNumber: temp.productNumber - element.number,
        },
        {
          where: {
            productId: element.productId,
          },
        }
      );
    });
    //thêm ds sản phẩm mua vào chi tiết hóa đơn
    // console.log(arr)
    // for (let index = 0; index < arr.length; index++) {
    //   arr[index] = {
    //     invoiceId: arr[index][0],
    //     productId: arr[index][1],
    //     number: arr[index][2],
    //     price: arr[index][3],
    //   };
    // }

    await invoicedetail.bulkCreate(arr);
    const rs = await invoice.findOne({ where: { invoiceId } });
    res.status(200).send(rs);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "error", content: error });
  }
};

// invoiceController.createWhenLive = async (req, res) => {
//   const { createDate, totalMoney, username, arr } = req.body;
//   const invoiceId = "IV_" + makeid(10);
//   const list = await invoiceModel.create(
//     invoiceId,
//     createDate,
//     totalMoney,
//     username,
//     arr
//   );
//   if (list === "error") res.status(500).send({ Message: "Error" });
//   else res.status(200).send(list);
// };

module.exports = invoiceController;
