const express = require("express"); // can be imported into multiple files
const admin = express.Router(); // admin will act like a mini express app that can be tied or plugged into other express apps
const addProductHandlers = require("../controllers/admin")
const isAuth = require("../middleware/is-auth");

admin.post("/edit-product/:productId", isAuth, addProductHandlers.getEditProductPage);

admin.post("/edit-product", isAuth, addProductHandlers.handleEditProductReq);

admin.post("/add-product", isAuth, addProductHandlers.handleAddProductReq);

admin.post("/delete-product", isAuth, addProductHandlers.handleDeleteProductReq);

admin.get("/add-product", isAuth, addProductHandlers.getAddProductPage);

admin.get("/products", isAuth, addProductHandlers.getAdminProductList);

module.exports = {
  adminRoutes: admin,
};
