// const products = []
// const path = require("path");
const Product = require("../models/products");

const handleAddProductReq = (req, res, next) => {
  const title = req.body.title;
  const description = req.body.description;
  const price = req.body.price;
  const imageURL = req.body.imageURL;
  const userId = req.user._id;

  // const product = new Product(
  //   null,
  //   title,
  //   description,
  //   price,
  //   imageURL,
  //   userId
  // );

  // products.push(req.body);

  // using nodejs file methods
  // product.saveProduct((message) => {
  //     if (message == 'success') {
  //         res.redirect("/admin/products");
  //     }
  // })

  // using SQL queries
  // product.saveProduct().then(result => {
  //     res.redirect("/admin/products");
  // }).catch(err => console.log(err))

  // using sequelize
  // req.user
  //   .createProduct({
  //     title: title,
  //     description: description,
  //     price: price,
  //     imageURL: imageURL,
  //   })
  //   .then((result) => {
  //     res.redirect("/admin/products");
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });

  // using mongoDb
  // product
  //   .save()
  //   .then((result) => {
  //     console.log(result, "saved!");
  //     res.redirect("/admin/products");
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });

  // using mongoose
  const product = new Product({
    title: title,
    description: description,
    price: price,
    imageURL: imageURL,
    userId: userId
  });

  product
    .save()
    .then((result) => {
      console.log(result, "saved!");
      res.redirect("/admin/products");
    })
    .catch((err) => {
      console.log(err);
    });
};

const getEditProductPage = (req, res, next) => {
  const id = req.body.id;

  // using nodejs file methods
  // Product.fetchProduct(id, (data) => {
  //     if (data.message != 'PRODUCT_NOT_FOUND') {
  //         res.render("admin/add-product", { prod: data, edit: true, pageTitle: "Edit Product", active: "admin-products" });
  //     }
  // })

  // using sequelize
  // req.user
  //   .getProducts({ where: { id: id } })
  //   .then((result) => {
  //     res.render("admin/add-product", {
  //       prod: result[0],
  //       edit: true,
  //       pageTitle: "Edit Product",
  //       active: "admin-products",
  //     });
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });

  Product.findById(id)
    .then((result) => {
      res.render("admin/add-product", {
        prod: result,
        edit: true,
        pageTitle: "Edit Product",
        active: "admin-products",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

const handleEditProductReq = (req, res, next) => {
  const id = req.body.id;
  const updatedTitle = req.body.title;
  const updatedDescription = req.body.description;
  const updatedPrice = req.body.price;
  const updatedImageURL = req.body.imageURL;
  const userId = req.user._id;

  // using nodejs methods
  // const product = new Product(id, updatedTitle, updatedDescription, updatedPrice, updatedImageURL)
  // product.saveProduct((message) => {
  //     if (message == 'success') {
  //         res.redirect("/admin/products");
  //     }
  // })

  // using SQL queries
  // Product.editProduct(
  //   id,
  //   updatedTitle,
  //   updatedDescription,
  //   updatedPrice,
  //   updatedImageURL
  // ).then(() => {
  //   res.redirect("/admin/products");
  // });

  // using sequelize
  // req.user
  //   .getProducts({ where: { id: id } }) // Fetch the specific product by its id
  //   .then((products) => {
  //     if (products.length > 0) {
  //       const product = products[0]; // Get the first (and only) product in the array
  //       return product.update({
  //         title: updatedTitle,
  //         description: updatedDescription,
  //         price: updatedPrice,
  //         imageURL: updatedImageURL,
  //       });
  //     } else {
  //       throw new Error("Product not found");
  //     }
  //   })
  //   .then((result) => {
  //     res.redirect("/admin/products");
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });

  // Product.update(
  //   {
  //     title: updatedTitle,
  //     description: updatedDescription,
  //     price: updatedPrice,
  //     imageURL: updatedImageURL,
  //   },
  //   {
  //     where: {
  //       id: id,
  //     },
  //   }
  // )
  //   .then((result) => {
  //     res.redirect("/admin/products");
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });

  // using mongoDb
  // const product = new Product(
  //   id,
  //   updatedTitle,
  //   updatedDescription,
  //   updatedPrice,
  //   updatedImageURL,
  //   userId
  // );
  // product
  //   .save()
  //   .then((result) => {
  //     console.log(result, "updated!");
  //     res.redirect("/admin/products");
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });

  // using mongoose
  Product.findByIdAndUpdate(id, {
    title: updatedTitle,
    description: updatedDescription,
    price: updatedPrice,
    imageURL: updatedImageURL,
    userId: userId
  })
    .then((result) => {
      console.log(result, "updated!");
      res.redirect("/admin/products");
    })
    .catch((err) => {
      console.log(err);
    });
};

const handleDeleteProductReq = (req, res, next) => {
  const id = req.body.id;

  // using nodejs methods
  // Product.deleteProduct(id, (message) => {
  //     if (message == 'success') {
  //         res.redirect("/admin/products");
  //     }
  // })

  // using SQL queries
  // Product.deleteProduct(id).then(() => {
  //   res.redirect("/admin/products");
  // });

  // using sequelize
  // req.user
  //   .getProducts({ where: { id: id } })
  //   .then((products) => {
  //     if (products.length > 0) {
  //       const product = products[0];
  //       return product.destroy();
  //     } else {
  //       throw new Error("Product not found");
  //     }
  //   })
  //   .then((result) => {
  //     res.redirect("/admin/products");
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });

  // using mongoDb
  // Product.find(id).then(() => {
  //   res.redirect("/admin/products");
  // });

  // using mongoose
  Product.findByIdAndDelete(id).then(() => {
    console.log("deleted!");
    res.redirect("/admin/products");
  });
};

const getAddProductPage = (req, res, next) => {
  // res.sendFile(path.join(__dirname, '..', 'views', 'add-product.html'));

  res.render("admin/add-product", {
    prod: {},
    edit: false,
    pageTitle: "Add Product",
    active: "add-product",
  });
};

const getAdminProductList = (req, res, next) => {
  // res.sendFile(path.join(__dirname, '..', 'views', 'shop.html'));

  // using nodejs methods
  // Product.fetchAllProducts((data) => {
  //     res.render("admin/admin-products", { prods: data, pageTitle: "Admin Products", active: "admin-products" });
  // })

  // using SQL queries
  // Product.fetchAllProducts().then(result => {
  //     res.render("admin/admin-products", { prods: result[0], pageTitle: "Admin Products", active: "admin-products" });
  // })

  // using sequelize
  // req.user
  //   .getProducts()
  //   .then((products) => {
  //     res.render("admin/admin-products", {
  //       prods: products,
  //       pageTitle: "Admin Products",
  //       active: "admin-products",
  //     });
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //     res.render("admin/admin-products", {
  //       prods: [],
  //       pageTitle: "Admin Products",
  //       active: "admin-products",
  //     });
  //   });

  // using mongoDb
  // Product.getProducts(req.user._id)
  //   .then((products) => {
  //     res.render("admin/admin-products", {
  //       prods: products,
  //       pageTitle: "Admin Products",
  //       active: "admin-products",
  //     });
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //     res.render("admin/admin-products", {
  //       prods: [],
  //       pageTitle: "Admin Products",
  //       active: "admin-products",
  //     });
  //   });

  // using mongoose
  Product.find()
    .then((products) => {
      res.render("admin/admin-products", {
        prods: products,
        pageTitle: "Admin Products",
        active: "admin-products",
      });
    })
    .catch((err) => {
      console.log(err);
      res.render("admin/admin-products", {
        prods: [],
        pageTitle: "Admin Products",
        active: "admin-products",
      });
    });
};

// exports.handleAddProductReq = handleAddProductReq
// exports.getAddProductPage = getAddProductPage
// exports.getProductList = getProductList

module.exports = {
  handleAddProductReq,
  getEditProductPage,
  handleEditProductReq,
  handleDeleteProductReq,
  getAddProductPage,
  getAdminProductList,
};
