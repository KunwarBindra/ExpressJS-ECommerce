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
const mongoConnect = require("./util/database");

const app = express();

// .set allows us to set any value globally across application, this way data can be shared using .get() across app
// we are telling express that we wanna compile dynamic templates using pug / ejs / handlebars
app.set("view engine", "ejs");
// and where these templates can be found
app.set("views", path.join(__dirname, "views", "ejsTemplates"));

app.use(bodyParser.urlencoded({ extended: false })); // will parse bodies sent through forms, other type of parsers will be used for other bodies
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  // using sequelize
  // User.findByPk(1)
  //   .then((res) => {
  //     req.user = res;
  //     next();
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });

  // using mongodb
  User.getUser("66cc7a97603f3d817930c83c")
    .then((result) => {
      if (result) {
        req.user = new User(
          result._id,
          result.firstname,
          result.firstname,
          result.email,
          result.cart,
          result.orders
        );
      } else {
        const user = new User(
          null,
          "Kunwar",
          "Bindra",
          "kunwarjeetbindra@gmail.com",
          { products: [], totalPrice: 0 },
          []
        );
        user
          .save()
          .then((response) => {
            console.log(response, "saved!");
          })
          .catch((err) => {
            console.log(err);
          });
      }
      next();
    })
    .catch((err) => {
      console.log(err);
    });
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

app.use("/admin", admin.adminRoutes);
app.use(shop);

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

mongoConnect.mongoConnect((client) => {
  // console.log(client);
  app.listen(3000);
});
