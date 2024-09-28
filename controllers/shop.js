// const products = require("../models/products");
const Product = require("../models/products");
const Order = require("../models/order");
// const Cart = require("../models/cart");

const getProductsHome = (req, res, next) => {
  // res.sendFile(path.join(__dirname, '..', 'views', 'shop.html'));

  // using nodejs methods
  // Product.fetchAllProducts((data) => {
  //     res.render("user/home", { prods: data, pageTitle: "Home", active: "home" });
  // })

  // using SQL queries
  // Product.fetchAllProducts().then(result => {
  //     res.render("user/home", { prods: result[0], pageTitle: "Home", active: "home" });
  // })

  // using sequelize
  // Product.findAll()
  //   .then((products) => {
  //     res.render("user/home", {
  //       prods: products,
  //       pageTitle: "Home",
  //       active: "home",
  //     });
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //     res.render("user/home", { prods: [], pageTitle: "Home", active: "home" });
  //   });

  // using mongoDb
  // Product.getProducts()
  //   .then((products) => {
  //     res.render("user/home", {
  //       prods: products,
  //       pageTitle: "Home",
  //       active: "home",
  //     });
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //     res.render("user/home", { prods: [], pageTitle: "Home", active: "home" });
  //   });

  // using mongoose
  Product.find()
    .then((products) => {
      res.render("user/home", {
        prods: products,
        pageTitle: "Home",
        active: "home",
        isAuthenticated: req.session.isLoggedIn,
        csrfToken: req.csrfToken()
      });
    })
    .catch((err) => {
      console.log(err);
      res.render("user/home", { prods: [], pageTitle: "Home", active: "home", isAuthenticated: req.session.isLoggedIn, csrfToken: req.csrfToken() });
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

  // Product.findByPk(productId)
  //   .then((product) => {
  //     res.render("user/product-detail", {
  //       prod: product ? product : {},
  //       pageTitle: product ? product.title : "Product",
  //       active: "products",
  //     });
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });

  // using mongodb
  // Product.getSingleProduct(productId)
  //   .then((result) => {
  //     res.render("user/product-detail", {
  //       prod: result ? result : {},
  //       pageTitle: result ? result.title : "Product",
  //       active: "products",
  //     });
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });

  // using mongoose
  Product.findById(productId)
    .then((result) => {
      res.render("user/product-detail", {
        prod: result ? result : {},
        pageTitle: result ? result.title : "Product",
        active: "products",
        isAuthenticated: req.session.isLoggedIn,
        csrfToken: req.csrfToken()
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
  // Product.findAll()
  //   .then((products) => {
  //     res.render("user/products", {
  //       prods: products,
  //       pageTitle: "Products",
  //       active: "products",
  //     });
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //     res.render("user/products", {
  //       prods: [],
  //       pageTitle: "Products",
  //       active: "products",
  //     });
  //   });

  // using mongoDb
  // Product.getProducts()
  //   .then((products) => {
  //     res.render("user/products", {
  //       prods: products,
  //       pageTitle: "Products",
  //       active: "products",
  //     });
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //     res.render("user/products", {
  //       prods: [],
  //       pageTitle: "Products",
  //       active: "products",
  //     });
  //   });

  // using mongoose
  Product.find()
    .then((products) => {
      res.render("user/products", {
        prods: products,
        pageTitle: "Products",
        active: "products",
        isAuthenticated: req.session.isLoggedIn,
        csrfToken: req.csrfToken()
      });
    })
    .catch((err) => {
      console.log(err);
      res.render("user/products", {
        prods: [],
        pageTitle: "Products",
        active: "products",
        isAuthenticated: req.session.isLoggedIn,
        csrfToken: req.csrfToken()
      });
    });
};

const getCart = (req, res, next) => {
  // Cart.fetchCartData((data) => {
  //   res.render("user/cart", { data: data, pageTitle: "Cart", active: "cart" });
  // });

  // using sequelize
  // req.user
  //   .getCart()
  //   .then((cart) => {
  //     return cart.getProducts();
  //   })
  //   .then((products) => {
  //     res.render("user/cart", {
  //       data: products,
  //       pageTitle: "Cart",
  //       active: "cart",
  //     });
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });

  // using mongodb
  // req.user
  //   .getCart()
  //   .then((result) => {
  //     res.render("user/cart", {
  //       data: result,
  //       pageTitle: "Cart",
  //       active: "cart",
  //     });
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });

  // using mongoose
  req.user
    .populate("cart.products.productId")
    .then((result) => {
      let cart = {
        products: result.cart.products,
        totalPrice: req.user.cart.totalPrice,
      };
      res.render("user/cart", {
        data: cart,
        pageTitle: "Cart",
        active: "cart",
        isAuthenticated: req.session.isLoggedIn,
        csrfToken: req.csrfToken()
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

const addToCart = (req, res, next) => {
  const productId = req.body.id;

  // Product.fetchProduct(productId, (data) => {
  //   Cart.addToCart(productId, data, (message) => {
  //     if (message === "success") {
  //       res.redirect("/cart");
  //     }
  //   });
  // });

  // using sequelize
  // let fetchedCart;
  // let newQty = 1;
  // req.user
  //   .getCart()
  //   .then((cart) => {
  //     fetchedCart = cart;
  //     return cart.getProducts({ where: { id: productId } });
  //   })
  //   .then((products) => {
  //     let product;
  //     if (products.length > 0) {
  //       product = products[0];
  //     }
  //     if (product) {
  //       const oldQty = product.cartItem.quantity;
  //       newQty = oldQty + 1;
  //       return product;
  //     }
  //     return Product.findByPk(productId);
  //   })
  //   .then((product) => {
  //     fetchedCart.addProduct(product, {
  //       through: { quantity: newQty, totalPrice: newQty * product.price },
  //     });
  //   })
  //   .then(() => {
  //     res.redirect("/cart");
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });

  // using mongodb
  Product.findById(productId).then((product) => {
    req.user
      .addToCart(product)
      .then((result) => {
        console.log(result, "added to cart!");
        res.redirect("/cart");
      })
      .catch((err) => {
        console.log(err);
      });
  });
};

const deleteCartProduct = (req, res, next) => {
  const productId = req.body.id;

  // Cart.deleteProduct(productId, (message) => {
  //   if (message === "success") {
  //     res.redirect("/cart");
  //   }
  // });

  // using sequelize
  // let fetchedCart;
  // req.user
  //   .getCart()
  //   .then((cart) => {
  //     fetchedCart = cart;
  //     return cart.getProducts({ where: { id: productId } });
  //   })
  //   .then((products) => {
  //     let product = products[0];
  //     const oldQty = product.cartItem.quantity;
  //     const newQty = oldQty - 1;
  //     if (newQty == 0) {
  //       product.cartItem.destroy();
  //     } else {
  //       fetchedCart.addProduct(product, {
  //         through: { quantity: newQty, totalPrice: newQty * product.price },
  //       });
  //     }
  //   })
  //   .then(() => {
  //     res.redirect("/cart");
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });

  // using mongodb
  Product.findById(productId).then((product) => {
    req.user
      .removeFromCart(product)
      .then((result) => {
        console.log(result, "removed from cart!");
        res.redirect("/cart");
      })
      .catch((err) => {
        console.log(err);
      });
  });
};

const getOrders = (req, res, next) => {
  // req.user
  //   .getOrders({ include: ["products"] })
  //   .then((orders) => {
  //     console.log(orders);
  //     res.render("user/orders", { pageTitle: "Orders", active: "orders" });
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });

  // using mongoose
  Order.find({ "user.userId": req.user._id })
    .then((orders) => {
      console.log(orders, 'orders fetched')
      res.render("user/orders", {
        pageTitle: "Orders",
        active: "orders",
        isAuthenticated: req.session.isLoggedIn,
        csrfToken: req.csrfToken()
      });
    })
    .catch((err) => console.log(err));
};

const createOrder = (req, res, next) => {
  // let fetchedCart;
  // req.user
  //   .createOrder()
  //   .then((order) => {
  //     req.user
  //       .getCart()
  //       .then((cart) => {
  //         fetchedCart = cart;
  //         return cart.getProducts();
  //       })
  //       .then((products) => {
  //         return order.addProducts(
  //           products.map((product) => {
  //             product.orderItem = { quantity: product.cartItem.quantity };
  //             return product;
  //           })
  //         );
  //       })
  //       .then((order) => {
  //         fetchedCart.setProducts(null);
  //       })
  //       .then(() => {
  //         res.render("user/orders", { pageTitle: "Orders", active: "orders" });
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });

  // using mongodb
  // req.user
  //   .createOrder()
  //   .then((result) => {
  //     console.log(result);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });

  // using mongoose
  req.user
    .populate("cart.products.productId")
    .then((user) => {
      const products = user.cart.products.map((i) => {
        return { quantity: i.quantity, product: { ...i.productId._doc } };
      });
      const order = new Order({
        user: {
          firstname: req.user.firstname,
          lastname: req.user.lastname,
          userId: req.user._id,
        },
        products: products,
      });
      return order.save();
    })
    .then((result) => {
      console.log(result, "order created");
      return req.user.clearCart();
    })
    .then(() => {
      res.redirect("/orders");
    })
    .catch((err) => console.log(err));
};

module.exports = {
  getProductsHome,
  getProductDetails,
  addToCart,
  deleteCartProduct,
  getProducts,
  getCart,
  getOrders,
  createOrder,
};
