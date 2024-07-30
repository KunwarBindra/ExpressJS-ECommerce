// const products = []
// const path = require("path");
const { where } = require("sequelize");
const Product = require("../models/products");

const handleAddProductReq = (req, res, next) => {
  const title = req.body.title;
  const description = req.body.description;
  const price = req.body.price;
  const imageURL = req.body.imageURL;

  // const product = new Product(null, title, description, price, imageURL)

  // products.push(req.body);

  // product.saveProduct((message) => {
  //     if (message == 'success') {
  //         res.redirect("/admin/products");
  //     }
  // })

  // product.saveProduct().then(result => {
  //     res.redirect("/admin/products");
  // }).catch(err => console.log(err))

  req.user
    .createProduct({
      title: title,
      description: description,
      price: price,
      imageURL: imageURL,
    })
    .then((result) => {
      res.redirect("/admin/products");
    })
    .catch((err) => {
      console.log(err);
    });
};

const getEditProductPage = (req, res, next) => {
  const id = req.body.id;

  // Product.fetchProduct(id, (data) => {
  //     if (data.message != 'PRODUCT_NOT_FOUND') {
  //         res.render("admin/add-product", { prod: data, edit: true, pageTitle: "Edit Product", active: "admin-products" });
  //     }
  // })

  req.user
    .getProducts({ where: { id: id } })
    .then((result) => {
      res.render("admin/add-product", {
        prod: result[0],
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

  // const product = new Product(id, updatedTitle, updatedDescription, updatedPrice, updatedImageURL)
  // product.saveProduct((message) => {
  //     if (message == 'success') {
  //         res.redirect("/admin/products");
  //     }
  // })

  // Product.editProduct(
  //   id,
  //   updatedTitle,
  //   updatedDescription,
  //   updatedPrice,
  //   updatedImageURL
  // ).then(() => {
  //   res.redirect("/admin/products");
  // });

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

  Product.update(
    {
      title: updatedTitle,
      description: updatedDescription,
      price: updatedPrice,
      imageURL: updatedImageURL,
    },
    {
      where: {
        id: id,
      },
    }
  )
    .then((result) => {
      res.redirect("/admin/products");
    })
    .catch((err) => {
      console.log(err);
    });
};

const handleDeleteProductReq = (req, res, next) => {
  const id = req.body.id;

  // Product.deleteProduct(id, (message) => {
  //     if (message == 'success') {
  //         res.redirect("/admin/products");
  //     }
  // })

  // Product.deleteProduct(id).then(() => {
  //   res.redirect("/admin/products");
  // });

  req.user
    .getProducts({ where: { id: id } })
    .then((products) => {
      if (products.length > 0) {
        const product = products[0];
        return product.destroy();
      } else {
        throw new Error("Product not found");
      }
    })
    .then((result) => {
      res.redirect("/admin/products");
    })
    .catch((err) => {
      console.log(err);
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

  // using simple class models
  // Product.fetchAllProducts((data) => {
  //     res.render("admin/admin-products", { prods: data, pageTitle: "Admin Products", active: "admin-products" });
  // })

  // using sql queries
  // Product.fetchAllProducts().then(result => {
  //     res.render("admin/admin-products", { prods: result[0], pageTitle: "Admin Products", active: "admin-products" });
  // })

  // using sequelize
  req.user
    .getProducts()
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
