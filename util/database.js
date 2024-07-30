// const db = require("mysql2");

// const pool = db.createPool({
//   host: "localhost",
//   user: "root",
//   password: "ROOT@123",
//   database: "express_ecommerce_db",
// });

// module.exports = pool.promise()

// sequelize runs all the sql queries in the background for each db operation done in JS
const Sequelize = require('sequelize')

const sequelize = new Sequelize('express_ecommerce_db', 'root', 'ROOT@123', {
  host: 'localhost',
  dialect: 'mysql'
})

module.exports = sequelize
