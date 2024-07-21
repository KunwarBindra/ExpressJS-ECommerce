const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const getPage = require("./controllers/404");

const app = express();

// .set allows us to set any value globally across application, this way data can be shared using .get() across app
// we are telling express that we wanna compile dynamic templates using pug/ejs/handlebars
app.set("view engine", "ejs");
// and where these templates can be found
app.set("views", path.join(__dirname, "views", "ejsTemplates"));

app.use(bodyParser.urlencoded({ extended: false })); // will parse bodies sent through forms, other type of parsers will be used for other bodies
app.use(express.static(path.join(__dirname, "public")));

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

app.listen(3000);
