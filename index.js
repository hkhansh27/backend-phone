const express = require("express");
const app = express();
const db = require("./models");
const path = require("path");
// const { mongoConnect } = require("./database/database");
// const http = require("http");
const rootRouter = require("./routers/root-router");
const port = process.env.PORT || 2222;

const publicPathDirectory = path.join(__dirname, "./");
app.use(express.static(publicPathDirectory));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/router", rootRouter);

app.use((req, res) => {
  if (req.body.test === undefined) {
    res.send("hello2");
  }
  res.send("hello");
});

// mongoConnect(() => {});

db.sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log("Server is running on port " + port);
  });
});
