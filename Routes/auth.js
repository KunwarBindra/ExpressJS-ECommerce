const express = require("express"); // can be imported into multiple files
const auth = express.Router(); // admin will act like a mini express app that can be tied or plugged into other express apps
const authHandlers = require("../controllers/auth")

auth.get("/login", authHandlers.getLogin);

auth.post("/login", authHandlers.postLogin);

auth.get("/sign-up", authHandlers.getSignup);

auth.post("/sign-up", authHandlers.postSignup);

// auth.get("/logout", authHandlers.handleAddProductReq);

module.exports = auth