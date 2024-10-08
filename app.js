const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const getPage = require("./controllers/404");
// const sequelize = require("./util/database");
const User = require("./models/users");
// const Product = require("./models/products");
// const Cart = require("./models/cart");
// const CartItem = require("./models/cartItem");
// const Order = require("./models/order");
// const OrderItem = require("./models/orderItem");
// const mongoConnect = require("./util/database");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoDbStore = require("connect-mongodb-session")(session); // this will yield a constructor function
const csrf = require("csurf");

const mongoDbUri =
  "mongodb+srv://kunwarjeetbindra:78Percent@cluster0.rxlpdkz.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=Cluster0";

const app = express();
const store = new MongoDbStore({
  uri: mongoDbUri,
  collection: "sessions", // here my sessions will be stored in mongodb
  // expires: // when the session should expire and it will be automatically be cleaned by mongodb
});
const csrfProtection = csrf();

// .set allows us to set any value globally across application, this way data can be shared using .get() across app
// we are telling express that we wanna compile dynamic templates using pug / ejs / handlebars
app.set("view engine", "ejs");
// and where these templates can be found
app.set("views", path.join(__dirname, "views", "ejsTemplates"));

app.use(bodyParser.urlencoded({ extended: false })); // will parse bodies sent through forms, other type of parsers will be used for other bodies
app.use(express.static(path.join(__dirname, "public")));
// session will store a cookie in the browser which is sent with every request to the server, that cookie is validated by the server, if there's any existing session with that cookie in the db, the user will be authenticated
// different browsers will be treated as seperate users
app.use(
  session({
    secret: "jbfvkVigfVHGLVVBVbKHGLGHSLHGSLBG69QQ93GFQ9GFQ",
    resave: false,
    saveUninitialized: false,
    store: store, // for every request session is fetched from mongodb with the help of mongodb store
  })
); // passing js object within session function to configure session setup
// resave means that session will not be saved on every request that is served, but only if something was changed in the session
// saveUninitialized means no session gets saved for a request where it doesn't need to be saved because nothing was changed about it

app.use(csrfProtection);

app.use((req, res, next) => {
  //   // using sequelize
  //   // User.findByPk(1)
  //   //   .then((res) => {
  //   //     req.user = res;
  //   //     next();
  //   //   })
  //   //   .catch((err) => {
  //   //     console.log(err);
  //   //   });

  //   // using mongodb
  //   User.getUser("66cc7a97603f3d817930c83c")
  //     .then((result) => {
  //       if (result) {
  //         req.user = new User(
  //           result._id,
  //           result.firstname,
  //           result.firstname,
  //           result.email,
  //           result.cart,
  //           result.orders
  //         );
  //       } else {
  //         const user = new User(
  //           null,
  //           "Kunwar",
  //           "Bindra",
  //           "kunwarjeetbindra@gmail.com",
  //           { products: [], totalPrice: 0 },
  //           []
  //         );
  //         user
  //           .save()
  //           .then((response) => {
  //             console.log(response, "saved!");
  //           })
  //           .catch((err) => {
  //             console.log(err);
  //           });
  //       }
  //       next();
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // using mongoose
  if (!req?.session?.user) {
    next();
  } else {
    User.findById(req?.session?.user?._id)
      .then((result) => {
        console.log(result, "user fetched");
        req.user = result;
        next();
      })
      .catch((err) => {
        console.log(err);
      });
  }
});

// Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
// User.hasMany(Product);
// Cart.belongsTo(User);
// User.hasOne(Cart);
// Cart.belongsToMany(Product, { through: CartItem });
// Product.belongsToMany(Cart, { through: CartItem });
// Order.belongsTo(User);
// User.hasMany(Order);
// Order.belongsToMany(Product, { through: OrderItem });

// middlewares are functions through which request passes until a response is sent
// In .use -> exact path won't be matched, even if partial path is matched, registered middleware will execute
// app.use("/name", (req, res, next) => {
//     console.log(req.body);
//     next();
// })

// app.use("/add-name", (req, res, next) => {
//     res.send('<form action="/name" method="POST"><input name="name" type="text" /><button type="submit">Submit</button></form>');
// });

// app.use("/", (req, res, next) => {
//     res.send('<h1>Hello from Express.js</h1>')
// })

const admin = require("./Routes/admin");
const shop = require("./Routes/shop");
const auth = require("./Routes/auth");

app.use("/admin", admin.adminRoutes);
app.use(shop);
app.use(auth);

app.use(getPage.get404);

// sequelize
//   .sync()
//   // .sync({ force: true }) // will drop all tables in the db and reinitialize them each time the sever restarts
//   .then((res) => {
//     User.findByPk(1)
//       .then((res) => {
//         if (res) return res;
//         return User.create({
//           firstName: "Kunwar",
//           lastName: "Bindra",
//           email: "kunwarjeetbindra@gmail.com",
//         });
//       })
//       .then((res) => {
//         res.getCart({ where: { id: 1 } }).then((cart) => {
//           if (cart) {
//             return cart;
//           }
//           return res.createCart();
//         });
//       })
//       .then((res) => {
//         app.listen(3000);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   })
//   .catch((err) => {
//     console.log(err);
//   });

mongoose
  .connect(mongoDbUri)
  .then((client) => {
    console.log(client, "connected!");
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
