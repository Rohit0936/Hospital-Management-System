
let express = require("express");
let app = express();
let db = require("./config/db.js");
let routes = require("./routes/regroutes.js");

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use("/", routes);

app.set("view engine", "ejs");

module.exports = app;



