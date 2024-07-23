const db = require("mysql2");

const pool = db.createPool({
  host: "localhost",
  user: "root",
  password: "ROOT@123",
  database: "express_ecommerce_db",
});

module.exports = pool.promise()
