const express = require("express");
const shop = express.Router();
const addProductHandlers = require("../controllers/shop");

shop.get("/", addProductHandlers.getProductsHome);

shop.get("/products/:productId", addProductHandlers.getProductDetails);

shop.get("/products", addProductHandlers.getProducts);

// shop.get("/orders", addProductHandlers.getOrders);

shop.get("/cart", addProductHandlers.getCart);

shop.post("/product/add-to-cart", addProductHandlers.addToCart);

shop.post("/product/delete-cart-product", addProductHandlers.deleteCartProduct);

shop.post("/create-order", addProductHandlers.createOrder);

module.exports = shop;
