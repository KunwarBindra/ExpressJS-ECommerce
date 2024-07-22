const fs = require('fs')
const path = require('path')
const Cart = require('./cart')

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
        this.title = title
        this.description = description
        this.price = price
        this.imageURL = imageURL
        this.id = id ? parseInt(id) : Date.now()
    }
    static fetchAllProducts(cb) {
        getFileData(cb)
    }
    static fetchProduct(id, cb) {
        getFileData((data) => {
            const productById = data.find(item => item.id == id)
            if (productById) {
                cb(productById)
            } else {
                cb({message: 'PRODUCT_NOT_FOUND'})
            }
        })
    }
    saveProduct(cb) {
        const ref = this
        let products = []
        getFileData((data) => {
            products = [...data]
            let searchExistingProduct = products.findIndex(item => item.id == ref.id)
            if (searchExistingProduct !== -1) {
                products[searchExistingProduct] = ref
            } else {
                products.push(ref)
            }
            fs.writeFile(p, JSON.stringify(products), (err) => {
                if (err){ 
                    console.log(err)
                } else {
                    cb('success')
                }
            })
        })
    }
    static deleteProduct(id, cb) {
        getFileData((data) => {
            const filteredProducts = data.filter(item => item.id != id)
            fs.writeFile(p, JSON.stringify(filteredProducts), (err) => {
                if (err) {
                    console.log(err)
                } else {
                    Cart.deleteProduct(id, (message) => {
                        if (message == 'success' || message == 'product_not_added') {
                            cb('success')
                        }
                    })
                }
            })
        })
    }
}