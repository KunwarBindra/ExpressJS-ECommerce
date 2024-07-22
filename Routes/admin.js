const express = require("express"); // can be imported into multiple files
const admin = express.Router(); // admin will act like a mini express app that can be tied or plugged into other express apps
const addProductHandlers = require("../controllers/admin")

admin.post("/edit-product/:productId", addProductHandlers.getEditProductPage);

admin.post("/edit-product", addProductHandlers.handleEditProductReq);

admin.post("/add-product", addProductHandlers.handleAddProductReq);

admin.post("/delete-product", addProductHandlers.handleDeleteProductReq);

admin.get("/add-product", addProductHandlers.getAddProductPage);

admin.get("/products", addProductHandlers.getAdminProductList);

module.exports = {
  adminRoutes: admin,
};
