const Product = require("../models/products");
const Cart = require("../models/cart");

const getProductsHome = (req, res, next) => {
  // res.sendFile(path.join(__dirname, '..', 'views', 'shop.html'));

  // using simple class models
  // Product.fetchAllProducts((data) => {
  //     res.render("user/home", { prods: data, pageTitle: "Home", active: "home" });
  // })

  // using sql queries
  // Product.fetchAllProducts().then(result => {
  //     res.render("user/home", { prods: result[0], pageTitle: "Home", active: "home" });
  // })

  // using sequelize
  Product.findAll()
    .then((products) => {
      res.render("user/home", {
        prods: products,
        pageTitle: "Home",
        active: "home",
      });
    })
    .catch((err) => {
      console.log(err);
      res.render("user/home", { prods: [], pageTitle: "Home", active: "home" });
    });
};

const getProductDetails = (req, res, next) => {
  const productId = req.params.productId;

  // Product.fetchProduct(productId, (data) => {
  //     if (data.message !== 'PRODUCT_NOT_FOUND') {
  //         res.render("user/product-detail", { prod: data, pageTitle: data.title, active: "products" });
  //     } else {
  //         res.status(404).render("404", { pageTitle: "404", active: "404" });
  //     }
  // })

  // Product.fetchProduct(productId).then(result => {
  //     res.render("user/product-detail", { prod: result[0][0], pageTitle: result[0][0].title, active: "products" });
  // })

  Product.findByPk(productId)
    .then((product) => {
      res.render("user/product-detail", {
        prod: product ? product : {},
        pageTitle: product ? product.title : "Product",
        active: "products",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

const getProducts = (req, res, next) => {
  // res.sendFile(path.join(__dirname, '..', 'views', 'shop.html'));

  // using simple class models
  // Product.fetchAllProducts((data) => {
  //     res.render("user/products", { prods: data, pageTitle: "Products", active: "products" });
  // })

  // using sql queries
  // Product.fetchAllProducts().then(result => {
  //     res.render("user/products", { prods: result[0], pageTitle: "Products", active: "products" });
  // })

  // using sequelize
  Product.findAll()
    .then((products) => {
      res.render("user/products", {
        prods: products,
        pageTitle: "Products",
        active: "products",
      });
    })
    .catch((err) => {
      console.log(err);
      res.render("user/products", {
        prods: [],
        pageTitle: "Products",
        active: "products",
      });
    });
};

const getCart = (req, res, next) => {
  Cart.fetchCartData((data) => {
    res.render("user/cart", { data: data, pageTitle: "Cart", active: "cart" });
  });
};

const addToCart = (req, res, next) => {
  const productId = req.body.id;
  Product.fetchProduct(productId, (data) => {
    Cart.addToCart(productId, data, (message) => {
      if (message === "success") {
        res.redirect("/cart");
      }
    });
  });
};

const deleteCartProduct = (req, res, next) => {
  const productId = req.body.id;
  Cart.deleteProduct(productId, (message) => {
    if (message === "success") {
      res.redirect("/cart");
    }
  });
};

const getOrders = (req, res, next) => {
  res.render("user/orders", { pageTitle: "Orders", active: "orders" });
};

module.exports = {
  getProductsHome,
  getProductDetails,
  addToCart,
  deleteCartProduct,
  getProducts,
  getCart,
  getOrders,
};
