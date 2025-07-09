
let express = require("express");
let app = express();
require("dotenv").config();
let bodyparser=require("body-parser");
let db = require("./config/db.js");
//et session=require("express-session");
let cookieparser=require("cookie-parser");
let routes = require("./routes/regroutes.js");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.use(bodyparser.json());
app.use(cookieparser());
// app.use(session({
//      secret:"121212121df",
//      resave:true,
//      saveUninitialized:false
     
// }))
app.use("/", routes);

app.set("view engine", "ejs");

module.exports = app;

