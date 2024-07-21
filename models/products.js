const fs = require('fs')
const path = require('path')

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
    constructor (title, description, price, imageURL) {
        this.title = title
        this.description = description
        this.price = price
        this.imageURL = imageURL
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
    saveProduct() {
        this.id = Date.now()
        const ref = this
        let products = []
        getFileData((data) => {
            products = data
            products.push(ref)
            fs.writeFile(p, JSON.stringify(products), (err) => {
                if (err) console.log(err)
            })
        })
    }
}