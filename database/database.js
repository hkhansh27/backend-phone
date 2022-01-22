const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callback) => {
  MongoClient.connect(
    "mongodb+srv://bomsaoax:(phacius)2712@learnmongo.6unzn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
  )
    .then((client) => {
      console.log("connect success");
      _db = client.db();
      callback();
    })
    .catch((err) => {
      console.log("loi")
      throw err;
    });
};

const getDB = () => {
  if (_db) {
    return _db;
  }
  throw "No DB Found";
};

module.exports = {
  mongoConnect,
  getDB,
};
