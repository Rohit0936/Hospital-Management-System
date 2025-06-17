const e = require("express");
let model = require("../model/regmodel.js");
 let Doctor = require("../services/reg_doc_services.js");
 let reception=require("../services/reg_reception.js");
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

exports.regDoctor = async (req, res) => {
    const u = new Doctor();
    let image = req.file.path;
    image = "./upload/" + image.substring(14);

    let { name, email, Specialization, contact, experience, role, password } = req.body;

    try {
        await u.regDoctor(name, email, Specialization, contact, experience, image, role, password);
        res.render("reg_doc.ejs", { msg: "Doctor registration Successfully" });
    } catch (err) {
        console.log(err);
        res.render("reg_doc.ejs", { msg: "This user name already present" });
    }
};


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
    res.render("reg_rec.ejs",{msg:""});
}

exports.regrecep= async (req,res)=>{

    let rec=new reception();

    let {name,email,contact,password}=req.body;
    let image=req.file.path;
    image=image.substring(14,image.length);
    image="./upload/"+image;
     
    
    try
        {
        await rec.regReception(name,email,contact,password,image);
         res.render("reg_rec.ejs",{msg:"Receptionists registration Successfully"});
        }
        catch(err){
            
         res.render("reg_rec.ejs",{msg:"This user name already present"});
        }
}
exports.show_rec=(req,res)=>{

    let flag=model.showrec();
    flag.then((r)=>{
        res.render("show_rec.ejs",{result:r});
    }).catch((err)=>{
        res.send("<h1>Something went wrong</h1>")
    })
}

let rid;
exports.recepudate=(req,res)=>{

    let id=req.query.rid.trim();
    rid=id;

    let flag=model.showrec();
    flag.then((r)=>{
        r.forEach((item,index)=>{

            if(parseInt(item.rid)==id)
            {
               
                res.render("recepupdate.ejs",{data:item,msg:""});
            }
        })
       
    }).catch((err)=>{
        res.send("<h1>Something went wrong</h1>")
    })

  
}

exports.recefinalpudate=(req,res)=>{

   let {name,email,contact}=req.body;

 let flag=model.recepudate(name,email,contact,rid);
 flag.then((f)=>{
     res.render("recepupdate.ejs",{data:"",msg:"Update Successfully"});
 }).catch((err)=>{
     res.send("<h1>Something went wrong</h1>")
 })
}

exports.recepdelete=(req,res)=>{

    let id=req.query.rid.trim();

    let flag=model.recepdelete(id);
    flag.then((r)=>{
        res.redirect("/show_rec");
    }).catch((err)=>{
        res.send("<h1>Something went wrong</h1>")
    })
}

exports.searchrecep=(req,res)=>{

    let na=req.query.na.trim();

    let flag=model.searchrecep(na);
    flag.then((r)=>{
      res.json(r);  
    }).catch((err)=>{

        res.send("<h1>Something went wrong</h1>")
    });
}
 