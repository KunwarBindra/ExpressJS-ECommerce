// const products = []
// const path = require("path");
const Product = require('../models/products')

const handleAddProductReq = (req, res, next) => {
    const title = req.body.title
    const description = req.body.description
    const price = req.body.price
    const imageURL = req.body.imageURL
    const product = new Product(null, title, description, price, imageURL)
    // products.push(req.body);
    // product.saveProduct((message) => {
    //     if (message == 'success') {
    //         res.redirect("/admin/products");
    //     }
    // })
    product.saveProduct().then(result => {
        res.redirect("/admin/products");
    }).catch(err => console.log(err))
}

const getEditProductPage = (req, res, next) => {
    const id = req.body.id
    // Product.fetchProduct(id, (data) => {
    //     if (data.message != 'PRODUCT_NOT_FOUND') {
    //         res.render("admin/add-product", { prod: data, edit: true, pageTitle: "Edit Product", active: "admin-products" });
    //     }
    // })
    Product.fetchProduct(id).then(result => {
        res.render("admin/add-product", { prod: result[0][0], edit: true, pageTitle: "Edit Product", active: "admin-products" });
    })
}

const handleEditProductReq = (req, res, next) => {
    const id = req.body.id
    const updatedTitle = req.body.title
    const updatedDescription = req.body.description
    const updatedPrice = req.body.price
    const updatedImageURL = req.body.imageURL
    // const product = new Product(id, updatedTitle, updatedDescription, updatedPrice, updatedImageURL)
    // product.saveProduct((message) => {
    //     if (message == 'success') {
    //         res.redirect("/admin/products");
    //     }
    // })
    Product.editProduct(id, updatedTitle, updatedDescription, updatedPrice, updatedImageURL).then(() => {
        res.redirect("/admin/products");
    })
} 

const handleDeleteProductReq = (req, res, next) => {
    const id = req.body.id
    // Product.deleteProduct(id, (message) => {
    //     if (message == 'success') {
    //         res.redirect("/admin/products");
    //     }
    // })
    Product.deleteProduct(id).then(() => {
        res.redirect("/admin/products");
    })
}

const getAddProductPage = (req, res, next) => {
    // res.sendFile(path.join(__dirname, '..', 'views', 'add-product.html'));
    res.render("admin/add-product", { prod: {}, edit: false, pageTitle: "Add Product", active: "add-product" });
}

const getAdminProductList = (req, res, next) => {
    // res.sendFile(path.join(__dirname, '..', 'views', 'shop.html'));
    // Product.fetchAllProducts((data) => {
    //     res.render("admin/admin-products", { prods: data, pageTitle: "Admin Products", active: "admin-products" });
    // })
    Product.fetchAllProducts().then(result => {
        res.render("admin/admin-products", { prods: result[0], pageTitle: "Admin Products", active: "admin-products" });
    }) 
}

// exports.handleAddProductReq = handleAddProductReq
// exports.getAddProductPage = getAddProductPage
// exports.getProductList = getProductList

module.exports = {
    handleAddProductReq,
    getEditProductPage,
    handleEditProductReq,
    handleDeleteProductReq,
    getAddProductPage,
    getAdminProductList
}