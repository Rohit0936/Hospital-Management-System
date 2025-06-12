<<<<<<< HEAD
let express = require("express");
let app = express();
let db = require("./config/db.js");
let routes = require("./routes/regroutes.js");

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use("/", routes);

app.set("view engine", "ejs");

module.exports = app;
=======
console.log("heloo");
console.log("hello Rohit");
console.log("hello sumit");


>>>>>>> 3dc9c55986af5991a0c63dee0ee83e54411ed05e
