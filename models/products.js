const fs = require('fs')
const path = require('path')
const Cart = require('./cart')
const db = require('../util/database')

const p = path.join(__dirname, '..', 'data', 'products.json')

function getFileData (cb) {
    let products = []
    fs.readFile(p, (err, data) => {
        if (err) {
            cb([])
        } else {
            products = JSON.parse(data)
            cb(products)
        }
    })
}

module.exports = class Product {
    constructor (id, title, description, price, imageURL) {
        this.id = id ? parseInt(id) : Date.now()
        this.title = title
        this.description = description
        this.price = price
        this.imageURL = imageURL
    }

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

    saveProduct() {
        return db.execute("INSERT INTO products (title, description, price, imageURL) VALUES (?, ?, ?, ?)", [this.title, this.description, this.price, this.imageURL], (err) => {
            console.log(err)
        })
    }

    static fetchAllProducts() {
        return db.execute("SELECT * FROM products")
    }

    static fetchProduct(id) {
        return db.execute("SELECT * FROM products WHERE id = ?", [id], (err) => {
            console.log(err)
        })
    }

    static deleteProduct(id) {
        return db.execute("DELETE FROM products WHERE id = ?", [id], (err) => {
            console.log(err)
        })
    }

    static editProduct(id, updatedTitle, updatedDescription, updatedPrice, updatedImageURL) {
        return db.execute("UPDATE products SET title = ?, description = ?, price = ?, imageURL = ? WHERE id = ?", [updatedTitle, updatedDescription, updatedPrice, updatedImageURL, id], (err) => {
            console.log(err)
        })
    }
}