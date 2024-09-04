// const fs = require('fs')
// const path = require('path')
// const Cart = require('./cart')
// const db = require('../util/database')
// const mongodb = require("mongodb");
// const getDb = require("../util/database");
const mongoose = require("mongoose");

// const p = path.join(__dirname, '..', 'data', 'products.json')

// function getFileData (cb) {
//     let products = []
//     fs.readFile(p, (err, data) => {
//         if (err) {
//             cb([])
//         } else {
//             products = JSON.parse(data)
//             cb(products)
//         }
//     })
// }

// module.exports = class Product {
//   constructor(_id, title, description, price, imageURL, userId) {
//     this._id = _id ? new mongodb.ObjectId(_id) : null;
//     this.title = title;
//     this.description = description;
//     this.price = price;
//     this.imageURL = imageURL;
//     this.userId = userId;
//   }

// using mongoDb
// save() {
//   const db = getDb.getDB();
//   if (this._id) {
//     return db
//       .collection("products")
//       .updateOne({ _id: this._id }, { $set: this });
//   }
//   return db.collection("products").insertOne(this);
// }

// static getProducts(userId) {
//   const db = getDb.getDB();
//   // return db.collection("products").find({ userId: userId }).toArray();
//   return db.collection("products").find().toArray();
// }

// static getSingleProduct(id) {
//   const db = getDb.getDB();
//   return db
//     .collection("products")
//     .find({ _id: new mongodb.ObjectId(id) })
//     .next();
// }

// static deleteProduct(id) {
//   const db = getDb.getDB();
//   return db
//     .collection("products")
//     .deleteOne({ _id: new mongodb.ObjectId(id) });
// }

// using nodejs file methods
// static fetchAllProducts(cb) {
//     getFileData(cb)
// }

// static fetchProduct(id, cb) {
//     getFileData((data) => {
//         const productById = data.find(item => item.id == id)
//         if (productById) {
//             cb(productById)
//         } else {
//             cb({message: 'PRODUCT_NOT_FOUND'})
//         }
//     })
// }

// saveProduct(cb) {
//     const ref = this
//     let products = []
//     getFileData((data) => {
//         products = [...data]
//         let searchExistingProduct = products.findIndex(item => item.id == ref.id)
//         if (searchExistingProduct !== -1) {
//             products[searchExistingProduct] = ref
//         } else {
//             products.push(ref)
//         }
//         fs.writeFile(p, JSON.stringify(products), (err) => {
//             if (err){
//                 console.log(err)
//             } else {
//                 cb('success')
//             }
//         })
//     })
// }

// static deleteProduct(id, cb) {
//     getFileData((data) => {
//         const filteredProducts = data.filter(item => item.id != id)
//         fs.writeFile(p, JSON.stringify(filteredProducts), (err) => {
//             if (err) {
//                 console.log(err)
//             } else {
//                 Cart.deleteProduct(id, (message) => {
//                     if (message == 'success' || message == 'product_not_added') {
//                         cb('success')
//                     }
//                 })
//             }
//         })
//     })
// }

// using SQL queries
//     saveProduct() {
//         return db.execute("INSERT INTO products (title, description, price, imageURL) VALUES (?, ?, ?, ?)", [this.title, this.description, this.price, this.imageURL], (err) => {
//             console.log(err)
//         })
//     }

//     static fetchAllProducts() {
//         return db.execute("SELECT * FROM products")
//     }

//     static fetchProduct(id) {
//         return db.execute("SELECT * FROM products WHERE id = ?", [id], (err) => {
//             console.log(err)
//         })
//     }

//     static deleteProduct(id) {
//         return db.execute("DELETE FROM products WHERE id = ?", [id], (err) => {
//             console.log(err)
//         })
//     }

//     static editProduct(id, updatedTitle, updatedDescription, updatedPrice, updatedImageURL) {
//         return db.execute("UPDATE products SET title = ?, description = ?, price = ?, imageURL = ? WHERE id = ?", [updatedTitle, updatedDescription, updatedPrice, updatedImageURL, id], (err) => {
//             console.log(err)
//         })
//     }
// };

// using sequelize model
// const Sequelize = require('sequelize')

// const sequelize = require('../util/database')

// const Product = sequelize.define('product', {
//     id: {
//         type: Sequelize.INTEGER,
//         autoIncrement: true,
//         primaryKey: true,
//         allowNull: false
//     },
//     title: {
//         type: Sequelize.STRING,
//         allowNull: false
//     },
//     description: {
//         type: Sequelize.STRING,
//         allowNull: false
//     },
//     price: {
//         type: Sequelize.DOUBLE,
//         allowNull: false
//     },
//     imageURL: {
//         type: Sequelize.STRING,
//         allowNull: false
//     }
// });

// module.exports = Product

// using mongoose
const Schema = mongoose.Schema;

const productSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  price: {
    type: Number,
    required: true,
  },
  imageURL: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Product', productSchema);
