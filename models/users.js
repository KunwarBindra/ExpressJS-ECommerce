// const Sequelize = require('sequelize')

// const sequelize = require('../util/database')
const mongoose = require("mongoose");
const products = require("./products");

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

// const mongodb = require("mongodb");
// const getDb = require("../util/database");
// const Product = require("./products");

// module.exports = class User {
//   constructor(_id, firstname, lastname, email, cart, orders) {
//     this._id = _id ? new mongodb.ObjectId(_id) : null;
//     this.firstname = firstname;
//     this.lastname = lastname;
//     this.email = email;
//     this.cart = cart;
//     this.orders = orders;
//   }

//   save() {
//     const db = getDb.getDB();
//     if (this._id) {
//       return db
//         .collection("users")
//         .updateOne({ _id: this._id }, { $set: this });
//     }
//     return db.collection("users").insertOne(this);
//   }

//   static getUser(id) {
//     const db = getDb.getDB();
//     return db
//       .collection("users")
//       .find({ _id: new mongodb.ObjectId(id) })
//       .next();
//   }

//   getCart() {
//     const db = getDb.getDB();
//     const productIds = this.cart.products.map((info) => {
//       return info.productId;
//     });
//     return db
//       .collection("products")
//       .find({ _id: { $in: productIds } })
//       .toArray()
//       .then((products) => {
//         let cart = {};
//         cart.products = products.map((p) => {
//           return {
//             ...p,
//             quantity: this.cart.products.find(
//               (item) => item.productId.toString() == p._id.toString()
//             ).quantity,
//           };
//         });
//         cart.totalPrice = this.cart.totalPrice;
//         return cart;
//       });
//   }

//   addToCart(id) {
//     const db = getDb.getDB();
//     let cart = { products: [], totalPrice: 0 };
//     cart.products = [...this.cart.products];
//     cart.totalPrice = parseFloat(this.cart.totalPrice);
//     return Product.getSingleProduct(id)
//       .then((product) => {
//         let searchProductIndex = cart.products.findIndex(
//           (item) => item.productId.toString() == id.toString()
//         );
//         if (searchProductIndex != -1) {
//           let existingProduct = { ...cart.products[searchProductIndex] };
//           cart.products[searchProductIndex].quantity =
//             existingProduct.quantity + 1;
//         } else {
//           let insertedProduct = {
//             productId: new mongodb.ObjectId(id),
//             quantity: 1,
//           };
//           cart.products.push(insertedProduct);
//         }
//         cart.totalPrice = Math.floor(
//           parseFloat(cart.totalPrice) + parseFloat(product.price)
//         );
//         return db
//           .collection("users")
//           .updateOne({ _id: this._id }, { $set: { cart: cart } });
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }

//   removeFromCart(id) {
//     const db = getDb.getDB();
//     let cart = { products: [], totalPrice: 0 };
//     cart.products = [...this.cart.products];
//     cart.totalPrice = parseFloat(this.cart.totalPrice);
//     return Product.getSingleProduct(id)
//       .then((product) => {
//         let searchProductIndex = cart.products.findIndex(
//           (item) => item.productId.toString() == id.toString()
//         );
//         let existingProduct = { ...cart.products[searchProductIndex] };
//         cart.products[searchProductIndex].quantity =
//           existingProduct.quantity - 1;
//         if (cart.products[searchProductIndex].quantity == 0) {
//           let updatedCartProducts = cart.products.filter(
//             (item) => item.productId.toString() != id.toString()
//           );
//           cart.products = updatedCartProducts;
//         }
//         cart.totalPrice = Math.floor(
//           parseFloat(cart.totalPrice) - parseFloat(product.price)
//         );
//         return db
//           .collection("users")
//           .updateOne({ _id: this._id }, { $set: { cart: cart } });
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }

//   createOrder() {
//     const db = getDb.getDB();
//     const productIds = this.cart.products.map((info) => {
//       return info.productId;
//     });
//     return db
//       .collection("products")
//       .find({ _id: { $in: productIds } })
//       .toArray()
//       .then((products) => {
//         let cart = {};
//         cart.products = products.map((p) => {
//           return {
//             ...p,
//             quantity: this.cart.products.find(
//               (item) => item.productId.toString() == p._id.toString()
//             ).quantity,
//           };
//         });
//         cart.totalPrice = this.cart.totalPrice;
//         let orders = [...this.orders];
//         orders.push(cart);
//         return db
//           .collection("users")
//           .updateOne({ _id: this._id }, { $set: { orders: orders } });
//       })
//       .then(result => {
//         return db
//           .collection('users')
//           .updateOne(
//             { _id: new mongodb.ObjectId(this._id) },
//             { $set: { cart: { products: [], totalPrice: 0 } } }
//           );
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }
// };

const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  cart: {
    products: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
    totalPrice: {
      type: Number,
      required: true,
    },
  },
});

userSchema.methods.addToCart = function (product) {
  let cart = { products: [], totalPrice: 0 };
  cart.products = [...this.cart.products];
  cart.totalPrice = parseFloat(this.cart.totalPrice);
  let searchProductIndex = cart.products.findIndex(
    (item) => item.productId.toString() == product._id.toString()
  );
  if (searchProductIndex != -1) {
    cart.products[searchProductIndex].quantity =
      cart.products[searchProductIndex].quantity + 1;
  } else {
    let insertedProduct = {
      productId: product._id,
      quantity: 1,
    };
    cart.products.push(insertedProduct);
  }
  cart.totalPrice = Math.floor(
    parseFloat(cart.totalPrice) + parseFloat(product.price)
  );
  this.cart = cart;
  return this.save();
};

userSchema.methods.removeFromCart = function (product) {
  let cart = { products: [], totalPrice: 0 };
  cart.products = [...this.cart.products];
  cart.totalPrice = parseFloat(this.cart.totalPrice);
  let searchProductIndex = cart.products.findIndex(
    (item) => item.productId.toString() == product._id.toString()
  );
  cart.products[searchProductIndex].quantity =
    cart.products[searchProductIndex].quantity - 1;
  if (cart.products[searchProductIndex].quantity == 0) {
    let updatedCartProducts = cart.products.filter(
      (item) => item.productId.toString() != product._id.toString()
    );
    cart.products = updatedCartProducts;
  }
  cart.totalPrice = Math.floor(
    parseFloat(cart.totalPrice) - parseFloat(product.price)
  );
  if (cart.totalPrice < 0) {
    cart.totalPrice = 0;
  }
  this.cart = cart;
  return this.save();
};

userSchema.methods.clearCart = function () {
  this.cart = { products: [], totalPrice: 0 };
  return this.save();
};

module.exports = mongoose.model("User", userSchema);
