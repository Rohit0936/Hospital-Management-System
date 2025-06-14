
let express = require("express");
let app = express();
let bodyparser=require("body-parser");
let db = require("./config/db.js");
let routes = require("./routes/regroutes.js");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.use(bodyparser.json());

app.use("/", routes);

app.set("view engine", "ejs");

module.exports = app;

