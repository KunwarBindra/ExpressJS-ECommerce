// const Sequelize = require('sequelize')

// const sequelize = require('../util/database')

// const User = sequelize.define('user', {
//     id: {
//         type: Sequelize.INTEGER,
//         autoIncrement: true,
//         primaryKey: true,
//         allowNull: false
//     },
//     firstName: {
//         type: Sequelize.STRING,
//         allowNull: false
//     },
//     lastName: {
//         type: Sequelize.STRING,
//         allowNull: false
//     },
//     email: {
//         type: Sequelize.STRING,
//         allowNull: false
//     }
// });

// module.exports = User

const mongodb = require("mongodb");
const getDb = require("../util/database");

module.exports = class User {
  constructor(_id, firstname, lastname, email) {
    this._id = _id ? new mongodb.ObjectId(_id) : null;
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
  }

  save() {
    const db = getDb.getDB();
    if (this._id) {
      return db
        .collection("users")
        .updateOne({ _id: this._id }, { $set: this });
    }
    return db.collection("users").insertOne(this);
  }

  static getUser(id) {
    const db = getDb.getDB();
    return db
      .collection("users")
      .find({ _id: new mongodb.ObjectId(id) })
      .next();
  }
};
