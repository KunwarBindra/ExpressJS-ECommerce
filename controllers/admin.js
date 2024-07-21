// const products = []
// const path = require("path");
const Product = require('../models/products')

const handleAddProductReq = (req, res, next) => {
    const title = req.body.title
    const description = req.body.description
    const price = req.body.price
    const imageURL = req.body.imageURL
    const product = new Product(title, description, price, imageURL)
    product.saveProduct()
    // products.push(req.body);
    res.status(302).redirect("/admin/products");
}

const getAddProductPage = (req, res, next) => {
    // res.sendFile(path.join(__dirname, '..', 'views', 'add-product.html'));
    res.render("admin/add-product", { pageTitle: "Add Product", active: "add-product" });
}

const getAdminProductList = (req, res, next) => {
    // res.sendFile(path.join(__dirname, '..', 'views', 'shop.html'));
    Product.fetchAllProducts((data) => {
        res.render("admin/admin-products", { prods: data, pageTitle: "Admin Products", active: "admin-products" });
    })
}

// exports.handleAddProductReq = handleAddProductReq
// exports.getAddProductPage = getAddProductPage
// exports.getProductList = getProductList

module.exports = {
    handleAddProductReq,
    getAddProductPage,
    getAdminProductList
}