let model=require("../model/regmodel.js")

exports.home=(req,res)=>{
    res.render("home.ejs");
};

exports.login=(req,res)=>{
    res.render("login.ejs",{msg:""});
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