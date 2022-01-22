const io = require("socket.io")(2224);
const { invoice, product, invoicedetail } = require("../models");
// call api (username, role, truyền mã sp, url)

let urlServer = null;
let productItem = null;
let buyAvailable = false;
let viewer = 0;
let liver = null;
let closed = false;

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
io.on("connection", (socket) => {
  console.log("client connected");
  // cho phép mua
  socket.on("enable-buy", (avai) => {
    buyAvailable = avai;
    // trả biến cho phép mua
    socket.emit("enable-buy-client", buyAvailable);
    socket.broadcast.emit("enable-buy-client", buyAvailable);
  });
  // disconnected
  socket.on("disconnect", () => {
    --viewer;
    console.log("disconnect");
    // trả số lượng viewer
    socket.emit("get-viewer", viewer);
    socket.broadcast.emit("get-viewer", viewer);
  });
  // out live
  socket.on("out-live", () => {
    --viewer;
    // trả số lượng viewer
    socket.emit("get-viewer", viewer);
    socket.broadcast.emit("get-viewer", viewer);
  });

  socket.emit("check-live", closed);
  socket.broadcast.emit("check-live", closed);

  // tham gia live
  socket.on("get-live", async (username, role, url, productId) => {
    ++viewer;
    //admin
    if (role === true) {
      liver = username;
      urlServer = url;
      closed = !closed;
      productItem = await product.findOne({ where: { productId } });
    }
    // client
    else {
      console.log(productItem);
      socket.emit("receive-live", {
        urlServer,
        productItem,
        liver,
      });

      socket.broadcast.emit("receive-live", {
        urlServer,
        productItem,
        liver,
      });
    }

    // trả số lượng sản phẩm
    socket.emit("product-number", productItem ? productItem.productNumber : -1);
    socket.broadcast.emit(
      "product-number",
      productItem ? productItem.productNumber : -1
    );
    // trả số lượng viewer
    socket.emit("get-viewer", viewer);
    socket.broadcast.emit("get-viewer", viewer);
    // trả biến cho phép mua
    socket.emit("enable-buy-client", buyAvailable);
    socket.broadcast.emit("enable-buy-client", buyAvailable);
  });
  // thay đổi sp
  socket.on("change-product", async (productId) => {
    console.log(productId);
    productItem = await product.findOne({ where: { productId } });
    // trả số lượng sản phẩm
    socket.emit("product-number", productItem ? productItem.productNumber : -1);
    socket.broadcast.emit(
      "product-number",
      productItem ? productItem.productNumber : -1
    );
    console.log(productItem);
    //gửi sản phẩm mới
    socket.emit("send-new-product", productItem);
    socket.broadcast.emit("send-new-product", productItem);
  });

  // đóng live
  socket.on("close-live", () => {
    urlServer = null;
    productItem = null;
    buyAvailable = false;
    viewer = 0;
    liver = null;
    closed = false;
    // client bắt admin đóng stream
    socket.emit("admin-close-live", closed);
    socket.broadcast.emit("admin-close-live", closed);
  });

  // khi client mua
  socket.on("client-buy", async (username, totalMoney, arr) => {
    try {
      // invoice
      const pId = arr[0][0];
      const invoiceId = "IV_" + makeid(10);
      await invoice.create({
        invoiceId,
        totalMoney,
        username,
      });
      //   product
      arr.forEach(async (element) => {
        element.unshift(invoiceId);
        console.log(element);
        //trừ so luong sp trong data
        let temp = await product.findOne({
          where: { productId: element[1] },
        });
        console.log("temp: ", temp);
        await product.update(
          {
            productNumber: temp.productNumber - element[2],
          },
          {
            where: {
              productId: element[1],
            },
          }
        );
        let test = await product.findOne({
          where: { productId: element[1] },
        });
        productItem = test;
        socket.emit(
          "product-number",
          productItem ? productItem.productNumber : -1
        );
        socket.broadcast.emit(
          "product-number",
          productItem ? productItem.productNumber : -1
        );
      });
      // productItem = await product.findOne({ where: { productId: pId } });
      // console.log("productItem: ", productItem)
      //invoice detail
      for (let index = 0; index < arr.length; index++) {
        arr[index] = {
          invoiceId: arr[index][0],
          productId: arr[index][1],
          number: arr[index][2],
          price: arr[index][3],
        };
      }
      await invoicedetail.bulkCreate(arr);
      console.log("create invoice success");
    } catch (error) {
      console.log(error);
    }
  });
});
