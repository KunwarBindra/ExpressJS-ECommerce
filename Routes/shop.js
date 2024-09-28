const express = require("express");
const shop = express.Router();
const addProductHandlers = require("../controllers/shop");
const isAuth = require("../middleware/is-auth");

shop.get("/", addProductHandlers.getProductsHome);

shop.get("/products/:productId", addProductHandlers.getProductDetails);

shop.get("/products", addProductHandlers.getProducts);

shop.get("/orders", isAuth, addProductHandlers.getOrders);

shop.get("/cart", isAuth, addProductHandlers.getCart);

shop.post("/product/add-to-cart", isAuth, addProductHandlers.addToCart);

shop.post("/product/delete-cart-product", isAuth, addProductHandlers.deleteCartProduct);

shop.post("/create-order", isAuth, addProductHandlers.createOrder);

module.exports = shop;
