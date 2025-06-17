const e = require("express");
let model = require("../model/regmodel.js");
let Doctor = require("../services/reg_doc_services.js");
const { render } = require("../app.js");
exports.home = (req, res) => {
     res.render("home.ejs");
 };

exports.admindashbord=(req,res)=>{
    res.render("admindashbord.ejs");
}

exports.home=(req,res)=>{
    res.render("home.ejs");
};



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

 exports.login=(req,res)=>{
    res.render("login.ejs",{msg:""});
}

exports.reg_doc=(req,res)=>{
    res.render("reg_doc.ejs",{msg:""});
}

exports.show_doc=(req,res)=>{
    let result=model.showDoctor()
    result.then((r)=>{
       res.render("show_doc.ejs",{data:r});
    }).catch((err)=>{
       res.send("Something wrong");
    });
}

 exports.regDoctor = (req, res) => {

     const u = new Doctor();
     let image=req.file.path;
      image=image.substring(14,image.length);
      image="./upload/"+image;
    //  console.log(image);
    // console.log("image: "+image);
     let { name, email, Specialization, contact, experience,role, password } = req.body;
     //console.log(name, email, specialzation, contact, experience, docImg,role, password);
   let flag=u.regDoctor(name, email, Specialization, contact, experience, image,role, password);
   if(flag)
   {
    res.render("reg_doc.ejs",{msg:"Doctor registration Successfully"});
   }
   else{
    res.render("reg_doc.ejs",{msg:"Doctor registration Successfully"});
   }
 }

 exports.showDoctor=(req,res)=>{
   
    let show=req.query.status.trim();
    //console.log(show);
    let flag=model.showDoctor(show);
    flag.then((r)=>{
       // console.log(r);
        res.render("show_doc.ejs",{result:r});
    }).catch((err)=>{
        res.send("Something went wrong");
    })
 };

 let uid;
 exports.updateDocotr=(req,res)=>{

    let id=req.query.did;
    uid=id;
    let flag=model.updatdoc(id)
    flag.then((u)=>{

        res.render("updatedoctor.ejs",{data:u,msg:""});
    });
    
 };

 exports.finalupdatedoc=(req,res)=>{
    let {name,email,specialization,contact,experience}=req.body;
   // console.log(name);
   let image=req.file.path;
   image=image.substring(14,image.length);
   image="./upload/"+image;

    let flag=model.finalupdatedoc(name,email,specialization,contact,experience,image,uid);
    flag.then((r)=>{
        if(r)
            {
                res.render("updatedoctor.ejs",{data:"",msg:"Update successfully"});
            }
            else{
                res.render("updatedoctor.ejs",{data:"",msg:"Update failed"});
            }

    }).catch((err)=>{
        res.send("Something Error");
    })
 }
 
 exports.deletedoc=(req,res)=>{

    let id=req.query.uid;
    let flag=model.deletedoc(id);
    flag.then((r)=>{
        res.render("show_doc.ejs",{result:r});
    }).catch((err)=>{
        res.send("Something Wrong")
    })
    
 };

 exports.searchdoc=(req,res)=>{

     let na=req.query.na.trim();
    
     let data=model.searchdoc(na);
    data.then((r)=>{
        res.json(r);
    }).catch((err)=>{
        res.send("Something went wrong");
    })
 }


 exports.reg_rec=(req,res)=>{
    res.render("reg_rec.ejs");
 }

 exports.show_rec=(req,res)=>{
    res.render("show_rec.ejs");
 }

 exports.rec_dashbord=(req,res)=>{
    res.render("rec_dashbord.ejs");
 }

 exports.reg_nurse=(req,res)=>{
    res.render("reg_nurse.ejs");
 }

 exports.show_nurse=(req,res)=>{
    res.render("show_nurse.ejs");
 }

 exports.add_room=(req,res)=>{
    res.render("add_room.ejs");
 }

 exports.show_room=(req,res)=>{
    res.render("show_room.ejs");
 }

 exports.reg_patient=(req,res)=>{
    res.render("reg_patient.ejs");
 }

 exports.show_patient=(req,res)=>{
    res.render("show_patient");
 }

