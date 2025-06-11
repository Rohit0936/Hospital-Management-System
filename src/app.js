let express=require("express");
let db=require("./config/db.js");
let app=express();
app.set("view engine","ejs");

module.exports=app;