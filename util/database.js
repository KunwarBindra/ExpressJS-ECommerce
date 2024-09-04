// const db = require("mysql2");

// const pool = db.createPool({
//   host: "localhost",
//   user: "root",
//   password: "ROOT@123",
//   database: "express_ecommerce_db",
// });

// module.exports = pool.promise()

// sequelize runs all the sql queries in the background for each db operation done in JS
// const Sequelize = require('sequelize')

// const sequelize = new Sequelize('express_ecommerce_db', 'root', 'ROOT@123', {
//   host: 'localhost',
//   dialect: 'mysql'
// })

// module.exports = sequelize

// using mongoDB
// const mongoDB = require("mongodb");

// const MongoClient = mongoDB.MongoClient;

// let _db;

// const mongoConnect = (cb) => {
//   MongoClient.connect(
//     "mongodb+srv://kunwarjeetbindra:78Percent@cluster0.rxlpdkz.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=Cluster0"
//   )
//     .then((client) => {
//       console.log("connected!");
//       _db = client.db(); // gives access to the db in mongodb
//       cb();
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// }

// const getDB = () => {
//   if (_db) {
//     return _db
//   }
//   throw 'No DB Found!'
// }

// module.exports = {
//   mongoConnect,
//   getDB
// };
