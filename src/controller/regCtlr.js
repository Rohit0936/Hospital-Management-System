let model=require("../model/regmodel.js")

exports.admindashbord=(req,res)=>{
    res.render("admindashbord.ejs");
}

exports.home=(req,res)=>{
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

exports.reg_rec=(req,res)=>{
    res.render("reg_rec.ejs");
}

exports.show_rec=(req,res)=>{
    res.render("show_rec.ejs");
}



exports.loginuser=(req,res)=>{

    let {username,password,department}=req.body;
    let flag=model.loginuser(username,password,department);
    console.log(flag);
    if(flag)
    {
        res.render("admindashbord.ejs",{msg:""});
    }
    else{
        res.render("login.ejs",{msg:"Invalid Username and Password"})
    }
}