const fs = require('fs')
const path = require('path')

const p = path.join(__dirname, '..', 'data', 'cart.json')

function getCartData (cb) {
    let cart = {products: [], totalPrice: 0}
    fs.readFile(p, (err, data) => {
        if (err) {
            cb(cart)
        } else {
            cart = JSON.parse(data)
            cb(cart)
        }
    })
}

module.exports = class Cart {
    static addToCart (id, product, cb) {
        getCartData((data) => {
            let cart = {products: [], totalPrice: 0}
            cart.products = [...data.products]
            cart.totalPrice = parseFloat(data.totalPrice)
            let searchProductIndex = cart.products.findIndex(item => item.id == id)
            if (searchProductIndex !== -1) {
                let existingProduct = {...cart.products[searchProductIndex]}
                cart.products[searchProductIndex] = {...product}
                cart.products[searchProductIndex].qty = existingProduct.qty + 1
            } else {
                let updatedProduct = {...product}
                updatedProduct.qty = 1
                cart.products.push(updatedProduct)
            }
            cart.totalPrice = parseFloat(cart.totalPrice) + parseFloat(product.price)
            fs.writeFile(p, JSON.stringify(cart), (err) => {
                if (err) {
                    console.log(err)
                } else {
                    cb('success')
                }
            })
        })
    }
    static deleteProduct (id, cb) {
        getCartData((data) => {
            let cart = {products: [], totalPrice: 0}
            cart.products = [...data.products]
            cart.totalPrice = parseFloat(data.totalPrice)
            let searchProductIndex = cart.products.findIndex(item => item.id == id)
            let product = {...cart.products[searchProductIndex]}
            let productPrice = product.price
            let productQty = product.qty
            cart.products = cart.products.filter(item => item.id != id)
            if (cart.products.length) {
                cart.totalPrice = parseFloat(cart.totalPrice) - (productQty * parseFloat(productPrice))
            } else {
                cart.totalPrice = 0
            }
            fs.writeFile(p, JSON.stringify(cart), (err) => {
                if (err) {
                    console.log(err)
                } else {
                    cb('success')
                }
            })
        })
    }
    static fetchCartData (cb) {
        getCartData(cb)
    }
}