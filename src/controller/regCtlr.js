const e = require("express");
let model = require("../model/regmodel.js");
let nurse=require("../services/regnurse_service.js");
 let Doctor = require("../services/reg_doc_services.js");
 let reception=require("../services/reg_reception.js");
 let login=require("../services/login_service.js");
 let room=require("../services/room.js");


exports.home = (req, res) => {
     res.render("home.ejs");
 };

exports.admindashbord=(req,res)=>{
    res.render("admindashbord.ejs");
}

exports.home=(req,res)=>{
    res.render("home.ejs");
};

 exports.loginuser = async (req, res) => {

     let { username, password, department } = req.body;
     const lo=new login();

      
     //console.log(flag);
     try{
       let result = await lo.loginuser(username, password, department);
       // console.log(result);
        if(typeof(result)!="undefined" &&  result.length!=0 && department=="admin")
        {
            res.render("admindashbord.ejs", { msg: "" });
        }
        else if(typeof(result)!="undefined" &&  result.length!=0 && department=="Reception")
        {
           // console.log(result);
          
            res.render("rec_dashbord.ejs",{msg:result});
        }
        else{
            res.render("login.ejs", { msg: "Invalid Username and Password" });
        }

     }
     catch(err)
     {
        console.log(err);
        res.render("login.ejs", { msg: "Invalid Username and Password" });
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
 
    let flag=model.finalupdatedoc(name,email,specialization,contact,experience,uid);
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
 

exports.reg_nurse=(req,res)=>{
    
  res.render("reg_nurse.ejs",{msg:""});
}

exports.insert_nurse= async (req,res)=>{

    let {name,email,contact,nursedata}=req.body;
    console.log(nursedata);
    let image=req.file.path;
    image=image.substring(14,image.length);
    image="./upload/"+image;
   
    let n=new nurse();
    //console.log(name+" "+email+" "+contact+" "+image);
    try{
        await n.regnurse(name,email,contact,nursedata,image);
        res.render("reg_nurse.ejs",{msg:"Registration Successfully"})
    }
    catch(err)
    {
        console.log(err);
        res.render("reg_nurse.ejs",{msg:"This email and contact already present"})
    }
}

exports.show_nurse=(req,res)=>{

    let no=req.query.s;
        let flag=model.show_nurse(no);
         flag.then((r)=>{
              res.render("show_nurse.ejs",{result:r});
         }).catch((err)=>{
            console.log(err);
         });
};

exports.searchnurse=(req,res)=>{

    let str=req.query.str;
    
   let flag=model.searchnurse(str);
   flag.then((r)=>{
    // console.log(r);
        res.json(r);
   }).catch((err)=>{
    res.send("<h1>Something went wrong</h1>");
   })
};

let nid;
exports.updatenurse=(req,res)=>{

    let id=req.query.nid;
    nid=id;
    let result=model.updatenurse(id);
    result.then((r)=>{
      
        res.render("nurse_update.ejs",{data:r,msg:""});
    }).catch((err)=>{
        res.send("<h1>Something went wrong</h1>")
    });
}

exports.finalnurseupdate=(req,res)=>{

   
    let {name,email,contact,nurse_shift}=req.body;
  //let name1=req.body.name;

  //  console.log(nurse_shift);
    
       let flag= model.finalnurseupdate(name,email,contact,nurse_shift,nid);
       flag.then((r)=>{
        res.render("nurse_update",{data:"",msg:"update Successfully"})
       }).catch((err)=>{
        res.render("nurse_update",{data:"",msg:"update failed"})
       })
}

exports.deleteNurse=(req,res)=>{

    let id=req.query.nid;

    let flag=model.deleteNurse(id)
    flag.then((r)=>{
        res.redirect("/show_nurse");
    }).catch((err)=>{
        res.send("<h1>Something went wrong</h1>")
    })
}

exports.add_room=(req,res)=>{
    res.render("add_room.ejs",{msg:""});
}

exports.addromm= async (req,res)=>{

    let {room_type,room_charges,id}=req.body;

    try{
        let ro=new room();
      await ro.addromm(room_type,room_charges,id);

        res.render("add_room",{msg:"Room Add Successfully"})
    }
    catch(err)
    {
        res.render("add_room",{msg:"Room Id already present"})
        //res.send("<h1>Something went wrong</h1>")
    }
}

exports.show_room=(req,res)=>{

    let s=req.query.s;

       let flag=model.show_room(s);
       flag.then((r)=>{
         res.render("show_room.ejs",{data:r});
       }).catch((err)=>{
        console.log(err);
        res.send("<h1>Something went wrong</h1>")
       })
             
}

exports.searchroom=(req,res)=>{

    let str=req.query.str;
   // console.log(str);
    let flag=model.searchroom(str);
    flag.then((r)=>{
       //console.log(r);
        res.json(r);
    }).catch((err)=>{
        res.send("<h1>Something went wrong</h1>")
    })
}


exports.updateroom=(req,res)=>{
    let rid=req.query.rid;
    uid=rid;
    let flag=model.updateroom(rid);
    
    flag.then((r)=>{
        //console.log(r);
        res.render("room_update.ejs",{data:r,msg:""});
    }).catch((err)=>{
        res.send("<h1>Something went wrong</h1>");
    })
    
}

exports.finalupdateroom=(req,res)=>{

   
    let {room_type,room_charges,id}=req.body;
    try{
        model.finalupdateroom(room_type,room_charges,id,uid);
        
        res.redirect("/show_room");
    }
    catch(err)
    {
        res.render("room_update.ejs",{data:"",msg:"Update Failed"});
    }
}

exports.deleteroom=(req,res)=>{

    let id=req.query.rid;
    try{
        model.deleteroom(id);
          res.redirect("/show_room");
    }
    catch(err)
    {
        res.send("<h1>Something went wrong</h1>");
    }
}