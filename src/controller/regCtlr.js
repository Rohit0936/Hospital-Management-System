 let model = require("../model/regmodel.js");
 let Doctor = require("../services/reg_doc_services.js");
exports.home = (req, res) => {
     res.render("home.ejs");
 };

exports.login=(req,res)=>{
    res.render("login.ejs",{msg:""});
}

exports.reg_doc=(req,res)=>{
    res.render("reg_doc.ejs");
}

exports.show_doc=(req,res)=>{
    res.render("show_doc.ejs");
}

 exports.loginuser = (req, res) => {

     let { username, password, department } = req.body;
     let flag = model.loginuser(username, password, department);
     //console.log(flag);
     if (flag) {
         res.render("admindashbord.ejs", { msg: "" });
     }
     else {
         res.render("login.ejs", { msg: "Invalid Username and Password" })
     }
 }

 exports.reguser = (req, res) => {

     const u = new Doctor();
     let { name, email, specialzation, contact, experience, docImg,role, password } = req.body;
     //console.log(name, email, specialzation, contact, experience, docImg,role, password);
    u.regDoctor(name, email, specialzation, contact, experience, docImg,role, password);
 }