const User = require("../models/users");
const bcrypt = require("bcrypt");

const getLogin = (req, res, next) => {
  res.render("auth/login", { pageTitle: "Login", active: "login", isAuthenticated: req.session.isLoggedIn, csrfToken: req.csrfToken() });
};

const postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        return res.redirect("/sign-up");
      }
      bcrypt
        .compare(password, user.password)
        .then((doPasswordsMatch) => {
          if (doPasswordsMatch) {
            req.session.isLoggedIn = true;
            req.session.user = user;
            req.session.save((err) => {
              console.log(err);
              res.redirect("/");
            });
          } else {
            res.redirect("/login");
          }
        })
        .catch((err) => {
          console.log(err);
          res.redirect("/login");
        });
    })
    .catch((err) => {
      console.log(err);
    });
};

const getSignup = (req, res, next) => {
  res.render("auth/sign-up", { pageTitle: "Sign-up", active: "sign-up", isAuthenticated: req.session.isLoggedIn, csrfToken: req.csrfToken() });
};

const postSignup = (req, res, next) => {
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;

  User.findOne({ email: email })
    .then((user) => {
      if (user) {
        return res.redirect("/login");
      }
      return bcrypt
        .hash(password, 12)
        .then((hashedPassword) => {
          const newUser = new User({
            firstname: firstname,
            lastname: lastname,
            email: email,
            password: hashedPassword,
            cart: {
              products: [],
              totalPrice: 0,
            },
          });
          return newUser.save();
        })
        .then((result) => {
          res.redirect("/login");
        });
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = {
  getLogin,
  postLogin,
  getSignup,
  postSignup,
};
